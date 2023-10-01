import ast
from flask import jsonify
import os
from bs4 import BeautifulSoup
import requests
import openai
import sys
import json
from database.db import user_id_for_email, add_ideas_withId, delete_Ideas_byId, get_all_Ideas, update_Ideas_byId
from database.db import get_detail_by_userID, get_detail_by_userID_three_four
import re

openai.api_key = "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"


def gpt(text):
    reply = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": text}
        ]
    )
    # print('reply', reply)
    return reply["choices"][0]["message"]["content"]

def generateIdeas(text):
    prompt = f'''
    Your task is to come up with 5 innovative and engaging ideas for an email newsletter based on the questions and answers we asked our users below to generate.
    you should only response the ideas data without any other text or description.
    information:

    ```
    {text}
    ```
    '''
    # print(prompt)
    # print("title reply", reply)
    return prompt

def generatePrompt_summary(text):
    prompt = f'''
    your task is to generate a brief summary of the recent news of the recent website text, delimited with triple backticks.
    you should only response the summary when finished to get all the data related to the query without jumping to others articles.

    ```
    {text}
    ```
    '''
    return prompt


def generatePrompt_date(text):
    prompt = f'''
    your task is to find the published date of the following website text, delimited with triple backticks.
    if there is no information about the published date, use today's date.
    you should return date in this format "mm/dd/yyyy".
    you should only response the date without any other text.

    ```
    {text}
    ```
    '''
    return prompt


def generate_title(summary):
    prompt = f'''
    your task is to generate a title for the following article summary,
    delimited with triple backticks.

    ```
    {summary}
    ```
    '''

    reply = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=15,
        n=1,
        temperature=0.5,
    )
    # print("title reply", reply)
    result = reply.choices[0].text.strip()
    cleaned_text = result.replace(",", "").replace(
        "'", "").replace("`", "").replace('"', "")
    return cleaned_text


# def run(key_word):
#     session = requests.Session()
#     headers = {
#         'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
#         'Content-Type': 'application/x-www-form-urlencoded',
#         'Connection': 'Keep-Alive',
#         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
#     }
#     url = f"https://news.google.com/search?q={key_word}&hl=en-US&gl=US&ceid=US%3Aen"

#     url_obj = session.get(url, headers=headers)
#     bs = BeautifulSoup(url_obj.text, 'html.parser')

#     news = []

#     for i in bs.find_all('a', class_="VDXfz"):
#         try:
#             this_news = {}
#             url = "https://news.google.com/" + i['href']  # url at google
#             url_obj = session.get(url, headers=headers)
#             bs = BeautifulSoup(url_obj.text, "html.parser")
#             url = bs.find('a', href=True, rel="nofollow")[
#                 "href"]  # real news url
#             url_obj = session.get(url, headers=headers)
#             bs = BeautifulSoup(url_obj.text, "html.parser")
#             prompt_summary = generatePrompt_summary(bs.text)
#             prompt_date = generatePrompt_date(bs.text)
#             this_news['title'] = generate_title(bs.text)
#             this_news['url'] = url
#             this_news['summary'] = gpt(prompt_summary)
#             this_news['date'] = gpt(prompt_date)
#             news.append(this_news)
#             if len(news) >= 5:
#                 break
#         except:
#             pass

#     return news


# # Execute!!!
# args = sys.argv[1:]

# key_word = args[0]

# final_result = run(key_word)
# print(json.dumps(final_result))

# sys.stdout.flush()

def getGPTData(request):
    key_word = request.json.get('topic')
    searchUrlArr = request.json.get('urlList', [])
    newsId = request.json.get('newsId', 'article1')
    print(searchUrlArr)
    session = requests.Session()
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'Keep-Alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }

    # print(key_word)
    processed_data = ['%20'.join(item.split('&')).replace(
        ' ', '%20') for item in key_word]
    searchWord = '%20'.join(processed_data)
    # https://news.google.com/search?q=trend%20style&hl=en-US&gl=US&ceid=US%3Aen
    url = f"https://news.google.com/search?q={searchWord}&hl=en-US&gl=US&ceid=US%3Aen"
    # print(url)

    url_obj = session.get(url, headers=headers)
    bs = BeautifulSoup(url_obj.text, 'html.parser')

    news = []
    for i in bs.find_all('a', class_="VDXfz"):
        try:
            this_news = {}
            url = "https://news.google.com/" + i['href']  # url at google
            print("first", url)
            url_obj = session.get(url, headers=headers)
            bs = BeautifulSoup(url_obj.text, "html.parser")
            url = bs.find('a', href=True, rel="nofollow")[
                "href"]  # real news url
            if(url in searchUrlArr):
                continue
            # print("seconed", url)
            # print("real url", url)
            url_obj = session.get(url, headers=headers)
            # print("url_obj", url_obj)
            bs = BeautifulSoup(url_obj.text, "html.parser")
            # print("bs", bs.text)
            prompt_summary = generatePrompt_summary(bs.text)
            prompt_date = generatePrompt_date(bs.text)
            this_news['id'] = newsId
            this_news['title'] = generate_title(bs.text)
            this_news['url'] = url
            this_news['summary'] = gpt(prompt_summary)
            this_news['date'] = gpt(prompt_date)
            news.append(this_news)
            break
        except:
            pass

    return jsonify(news)

# def getGPTDataFirstFive(request):
#     key_word = request.json.get('topic')
#     session = requests.Session()
#     headers = {
#         'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
#         'Content-Type': 'application/x-www-form-urlencoded',
#         'Connection': 'Keep-Alive',
#         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
#     }

#     # print(key_word)
#     processed_data = ['%20'.join(item.split('&')).replace(
#         ' ', '%20') for item in key_word]
#     searchWord = '%20'.join(processed_data)
#     # https://news.google.com/search?q=trend%20style&hl=en-US&gl=US&ceid=US%3Aen
#     url = f"https://news.google.com/search?q={searchWord}&hl=en-US&gl=US&ceid=US%3Aen"
#     print(url)

#     url_obj = session.get(url, headers=headers)
#     bs = BeautifulSoup(url_obj.text, 'html.parser')

#     news = []
#     newsId = 1
#     for i in bs.find_all('a', class_="VDXfz"):
#         try:
#             this_news = {}
#             url = "https://news.google.com/" + i['href']  # url at google
#             url_obj = session.get(url, headers=headers)
#             bs = BeautifulSoup(url_obj.text, "html.parser")
#             url = bs.find('a', href=True, rel="nofollow")[
#                 "href"]  # real news url
#             # print("real url", url)
#             url_obj = session.get(url, headers=headers)
#             # print("url_obj", url_obj)
#             bs = BeautifulSoup(url_obj.text, "html.parser")
#             # print("bs", bs.text)
#             prompt_summary = generatePrompt_summary(bs.text)
#             prompt_date = generatePrompt_date(bs.text)
#             this_news['id'] = newsId
#             this_news['title'] = generate_title(bs.text)
#             this_news['url'] = url
#             this_news['summary'] = gpt(prompt_summary)
#             this_news['date'] = gpt(prompt_date)
#             news.append(this_news)
#             newsId += 1
#             if len(news) >= 5:
#                 break
#         except:
#             pass

#     return jsonify(news)

def getIdeasFromGPT(request, userEmail):
    user_id = user_id_for_email(userEmail)
    try:
        resultPageOne = get_detail_by_userID(user_id, "userDetailPageOne")
        # print('pageOne')
        resultPageTwo = get_detail_by_userID(user_id, "userDetailPageTwo")
        # print('pageTwo')
        resultPageThree = get_detail_by_userID_three_four(
            user_id, "userDetailPageThree")
        # print('pageThree')
        resultPageFour = get_detail_by_userID_three_four(
            user_id, "userDetailPageFour")
        # print('pageFour')
        if (resultPageOne == False or resultPageTwo == False):
            return 'false'
        # print("step 1")
        page_three_data = {}
        page_four_data = {}
        # print("resultPageThree", resultPageThree)
        if (resultPageThree != False):
            for row in resultPageThree:
                # print(row)
                page_three_data[row.get('question_name')] = row.get('data')
        # print(resultPageFour)
        if (resultPageFour != False):
            for row in resultPageFour:
                page_four_data[row.get('question_name')] = row.get('data')
        # print("step 2")
        # print("resultPageTwo", resultPageTwo.get('Does your brand writing style use emojis?'))
        emoji = False
        if (resultPageTwo.get('Does your brand writing style use emojis?') == 1):
            emoji = True
        # print(emoji)
        data = {
            'Brand or Company Name': resultPageOne.get('Brand or Company Name'),
            'Name of Publication or Newsletter': resultPageOne.get('Name of Publication or Newsletter'),
            'Description of Newsletter': resultPageOne.get('Description of Newsletter'),
            'Business Category': resultPageOne.get('Business Category'),
            'Publication Language': resultPageTwo.get('Publication Language'),
            'Audience Demographics': resultPageTwo.get('Audience Demographics'),
            'Audience Age Range': resultPageTwo.get('Audience Age Range'),
            'Audience Income Level': resultPageTwo.get('Audience Income Level'),
            'Do you adhere to a stylistic choice?': resultPageTwo.get('Do you adhere to a stylistic choice?'),
        }
        for key, value in data.items():
            try:
                parsed_value = ast.literal_eval(value)
                if isinstance(parsed_value, list):
                    data[key] = parsed_value
            except (SyntaxError, ValueError):
                pass
        data.update(page_three_data)
        data.update(page_four_data)
        formatted_text = ""

        for key, value in data.items():
            if isinstance(value, list):
                value_str = ", ".join(value)
            else:
                value_str = value

            formatted_text += f"{key}: {value_str}\n"
        # print(formatted_text)
        prompt = generateIdeas(formatted_text)
        ideas = gpt(prompt)
        # print(ideas)
        cleaned_data = [re.sub(r'^\d+\.\s*', '', item.strip()) for item in ideas.split('\n') if item.strip()]
        # print(cleaned_data)
        res = []
        for each in cleaned_data:
            id = add_ideas_withId(user_id, each)
            obj = {'id':id,
                   'title': each,
                   'used': False}
            print(obj)
            res.append(obj)
        # cleaned_data = [re.sub(r'^\d+\.\s*\"(.*?)\"$', r'\1', item.strip()) for item in ideas.split('\n') if item.strip()]
        # print(cleaned_data)
        return res

    except:
        return 'error'
    
def getAllIdeas(userEmail):
    user_id = user_id_for_email(userEmail)
    # print(data)
    try:
        # print(business_category)
        result = get_all_Ideas(user_id)
        print(result)
        for obj in result:
            flag = False
            if obj.get('used') == 1:
                flag = True
            obj['used'] = flag
        # print(result)
        return result
    except Exception as e:
        print("Error get Idea", str(e))
        return "error"

def updateIdeas(request, userEmail):
    user_id = user_id_for_email(userEmail)
    id = request.json.get("id", 'null')
    title = request.json.get("title", "null")
    used = request.json.get("used", False)
    if(id == 'null' or id ==""):
        return "not Id provide"
    # print("id", id)
    # print("title", title)
    
    try:
        # print(business_category)
        update_Ideas_byId (user_id, id, title, used)
        return {'message': 'Idea update successfully'}
    except Exception as e:
        print("Error update ideas:", str(e))
        return "error"

def deleteIdeas(request, userEmail):
    user_id = user_id_for_email(userEmail)
    id = request.json.get("data", '[]')
    if(id == 'null' or id ==""):
        return "not Id provide"
    print(id)
    try:
        # print(business_category)
        for eachData in id:
            delete_Ideas_byId (user_id, eachData.get("id"))
        return {'message': 'Idea deleted successfully'}
    except Exception as e:
        print("Error delete Ideas:", str(e))
        return "error"
