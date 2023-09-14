from flask import jsonify
import os
from bs4 import BeautifulSoup
import requests
import openai
import sys
import json

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
    cleaned_text = result.replace(",", "").replace("'", "").replace("`", "").replace('"', "")
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
    key_word = request.args.get('key_word')
    session = requests.Session()
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'Keep-Alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
    url = f"https://news.google.com/search?q={key_word}&hl=en-US&gl=US&ceid=US%3Aen"

    url_obj = session.get(url, headers=headers)
    bs = BeautifulSoup(url_obj.text, 'html.parser')

    news = []
    newsId = 1
    for i in bs.find_all('a', class_="VDXfz"):
        try:
            this_news = {}
            url = "https://news.google.com/" + i['href']  # url at google
            url_obj = session.get(url, headers=headers)
            bs = BeautifulSoup(url_obj.text, "html.parser")
            url = bs.find('a', href=True, rel="nofollow")[
                "href"]  # real news url
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
            newsId += 1
            if len(news) >= 5:
                break
        except:
            pass

    return jsonify(news)

