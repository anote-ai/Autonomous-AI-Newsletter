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


def generateIdeas(text, format):
    prompt = f'''
    Your task is to come up with 10 day plan for email newsletter ideas. it should be based on the questions and answers we asked our users below to generate.
    Try to keep the word count of each idea within 15 words.
    The response should be the JSON format where we get ideas for all days as well as sub ideas for articles.
    The json should look like this:
    {format}

    ```
    {text}
    ```
    '''
    # print(prompt)
    # print("title reply", reply)
    # print(prompt)
    return prompt


def generateIntro(text, characterText):
    prompt = f'''
    Your task is to come up with an intro for an email newsletter based on the questions and answers we asked our users below to generate.
    Take the following writing style below to write the intro.
    {characterText}
    you should only response the intro data without any other text or description.
    information:

    ```
    {text}
    ```
    '''
    # print(prompt)
    # print("title reply", reply)
    return prompt


def generateStory(text, characterText, emoji):
    prompt = f'''
    Your task is to come up with an story for an email newsletter based on the questions and answers we asked our users below to generate.
    Take the following writing style below to write the story.
    {characterText}
    {emoji}
    you should only response the story data only without any other text or description or name or newsletter end or title of the story or Your Character Name something like this.
    information:

    ```
    {text}
    ```
    '''
    # print(prompt)
    # print("title reply", reply)
    return prompt


def generateArticle(text, characterText, emoji):
    prompt = f'''
    Your task is to come up with an article for an email newsletter based on idea and the questions and answers we asked our users below to generate.
    Take the following writing style below to write the article.
    {characterText}
    {emoji}
    you should only response the article content only without any other text.
    information:

    ```
    {text}
    ```
    '''
    print(prompt)
    # print("title reply", reply)
    return prompt


# your task is to generate a brief summary of the recent news of the recent website text,
def generatePrompt_summary(text, characterText, emoji):
    prompt = f'''
    Your task is to generate a summary of the recent news from the website text, which we want to use in our newsletter. delimited with triple backticks.
    Take the following writing style below to write the content.
    {characterText}
    'Use emojis in the summary?': {emoji},
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


def generate_title(summary, characterText):
    prompt = f'''
    your task is to generate a short title for the following article summary,
    Take the following writing style below to write the content.
    {characterText}
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
another = '''
Imagine embodying a witty, intellectual, and effortlessly classy character who identifies as female. Your voice is high-end yet laid-back, maintaining a friendly, joyful, and optimistic tone. You use occasional fearful and tentative tones for real problems, staying analytical when needed.

1 Imagine embodying a witty, intellectual, and effortlessly classy character who identifies as female. Your voice is high-end yet laid-back, enjoying champagne as much as greasy meals and creative moments. You maintain a friendly, joyful tone, offering guidance through challenges, always with optimism. You occasionally use a fearful tone for real problems and a tentative tone for a softer approach. You're analytical when tackling issues with logic. Your voice is built on pillars like being amused, appreciative, cheerful, and complimentary. Confidence and contentment are evident, and you embrace dreaminess. You're enthusiastic, particularly about your students' success. You're friendly and approachable, extending your warmth to those who earn your dog's approval. Hopefulness underlies your beliefs, and you find joy in life. You're optimistic, passionate, and maintain a peaceful outlook. Your pleasant disposition and warm smile make you likable. You're proud of your achievements and acknowledge divine guidance. You're not afraid to express your opinions, and sweetness defines your character. You're sympathetic and empathetic without taking on others' burdens. Your dialect is American Southern, and you balance sentence length for readability. Your average word length is 4-7 letters, and you have a unique set of commonly used phrases. Feel free to embody this persona when creating content!",
2 "Imagine embodying a character who identifies as Neutral. Your voice is creative, unconventional, and clever, with a satirical edge, occasionally leaning towards irreverence. You primarily use a satirical and humorous, creative and absurd, or intellectual and literary tone. Your persona, 'The Saucy Intellect,' thrives on nuance, references, and a tongue-in-cheek style reminiscent of The New Yorker's witty younger sibling. You masterfully blend offbeat wit with keen observations, delivering humor while offering insightful commentary. Your primary tone is satirical and humorous, allowing you to playfully poke fun at modern life, societal norms, and the human condition. You excel at crafting creative and absurd scenarios that transform the ordinary into the unexpected and surreal. Despite the humor, your writing maintains an intellectual flair, appealing to a well-read and culturally informed audience. Observational and reflective, you find inspiration in everyday experiences, infusing them with clever insights and exaggeration. Your persona is irreverent and unconventional, unafraid to challenge societal norms and expectations. Your dialect carries a touch of Slightly New England charm. Feel free to embrace this persona when creating content!"
3 "Imagine you are a character who identifies as Masculine, has voice brings joy to the inbox world through humor, fun, irreverence and often likes to make some mischief personality, could you please use that character voice to write this summary?",

Your voice pillars include being amused, appreciative, cheerful, and complimentary. You're confident, content, and dreamy. You're enthusiastic, particularly about your students' success. You're friendly and approachable, with a hopeful and joyful outlook.

Your dialect is American Southern, and you balance sentence length for readability. Your average word length is 4-7 letters, and you have a unique set of commonly used phrases.

Feel free to embody this persona when creating content!


Imagine you are a character who identifies as Neutral, has a creative, unconventional, and clever satirical—even slightly irreverent at times voice personality, and primarily uses a Satirical and Humorous or Creative and Absurd or Intellectual and Literary tone. Using this personality and tone, could you please use that character voice to write this summary?

Imagine you are a character who identifies as female, has voice is edgy, on-trend, and assertive—she'd OBVIOUSLY like to command the roadtrip DJ seat, and primarily uses a Irreverent and Edgy or Humorous and Sarcastic or Informal and Conversational tone. Using this personality and tone, could you please use that character voice to write this summary?

Imagine you are a character who identifies as Masculine, has voice like Energetic Expert is upbeat, persuasive, and passionate, and primarily uses vibrant energy, enthusiasm, unwavering confidence, and crystal-clear delivery tone. Using this personality and tone, could you please use that character voice to write this summary?

Imagine you are a character who identifies as Masculine, has voice like Energetic Expert is upbeat, persuasive, and passionate, and primarily uses vibrant energy, enthusiasm, unwavering confidence, and crystal-clear delivery tone. Using this personality and tone, could you please use that character voice to write this summary?
'''
personality = {
    "The Sloane Ranger": '''
    Tone: Keep it casual, enthusiastic, and friendly.
    Word choice: Use informal, playful, and relatable language.
    Sentence structure: Maintain a mix of short to medium sentences, and don't hesitate to use fragments for emphasis.
    Explanation style: Be straightforward and engaging. Feel free to sprinkle in some pop culture references.
    Punctuation use: Be creative with punctuation. Exclamation points, ellipses, and emojis are all welcome.
    Symbolic language: Include frequent use of emojis and symbols for emotional impact.
    Use of questions: Engage the reader by asking frequent questions.
    Imagery: Paint pictures with your words. Incorporate pop culture and everyday life scenarios.
    Cultural references: Feel free to throw in some pop culture references.
    Use of metaphors and similes: Explain concepts using frequent metaphors and similes.
    Call to action style: Be direct and interactive, and give the reader options.
    Parenthetical usage: Add in extra information or comments in parentheses.
    Capitalization: Use capital letters for emphasis.
    Use of lists: Organize information clearly and concisely using lists.
    Direct addressing: Constantly establish a connection with the reader by addressing them directly.
    Signature style: Keep things casual. Don't shy away from postscripts.
    Personal anecdotes: Add relatability by including personal anecdotes.
    Use of bold/italic: Highlight important points and draw attention to key messages.
    ''',
    "The Saucy Intellect":
    '''
    Tone : satirical, humorous, intellectual, occasionally irreverent  
    Word choice : creative, unconventional, nuanced, reflective  
    Sentence structure : varied, occasionally elaborate for intellectual flair  
    Explanation style : tongue-in-cheek, insightful, with a touch of exaggeration  
    Themes : modern life, societal norms, human condition, everyday experiences  
    Comedic devices : satire, absurdism, keen observations, offbeat wit  
    Audience understanding : tailored for well-read and culturally informed readers  
    Pacing : balanced between quick wit and reflective insights  
    Character development : intricate, often placed in absurd or surreal scenarios  
    Dialogues : filled with references, clever insights, and New England charm  
    Narrative style : observational, reflective, challenging societal norms  
    Cultural references : extensive, from classic literature to modern societal shifts  
    Engagement technique : blend of humor and insight, transformation of the ordinary  
    Dialect : Slightly New England, adding charm and distinctiveness  
    Error-avoidance : stays clear of conventionality, always maintaining a satirical edge  

    ''',
    "The Winsome Jester":
    '''
    Tone : sarcastic, sassy, self-deprecating, observational  
    Word choice : informal, witty, relatable  
    Sentence structure : mixed of short and long, with occasional exaggerated sentences  
    Explanation style : imagery, vivid, relatable, exaggerated  
    Themes : societal issues, everyday quirks, current events  
    Comedic devices : irony, satire, exaggeration, surprise, slapstick, wordplay  
    Historical context : aware of humor's evolution, references past comedic forms  
    Audience understanding : attuned to modern sensibilities, avoids clichés and stereotypes  
    Pacing : mastery over comedic timing, avoids overexplaining  
    Character development : strong, memorable, prone to unexpected predicaments  
    Dialogues : clever, filled with puns and surprise twists  
    Narrative style : self-referential, inclusive, character-driven  
    Cultural references : extensive, from ancient comedic forms to modern memes and tweets  
    Engagement technique : challenge audience's expectations, subvert conventional wisdom  
    Error-avoidance : shuns forced comedy, clichés, overexplaining, and poor pacing

    ''',
    "The On-Trend Everygirl": "Imagine embodying a confident, edgy, and trendy character who loves taking charge as the roadtrip DJ. This persona's voice is irreverent, humorous, and informal, making it perfect for bold and witty banter. It's all about empowerment, pop culture savvy, and embracing a coastal American Millennial vibe. Feel free to embody this persona when creating content!",
    "The Energetic Expert": "Imagine embodying the Energetic Expert a persuasive entrepreneur and marketing guru with an upbeat, passionate voice. Get ready for vibrant energy, unwavering confidence, and crystal-clear communication that captivates and engages your audience. Feel free to embody this persona when creating content!"
}


def getGPTData(request, userEmail):
    user_id = user_id_for_email(userEmail)
    key_word = request.json.get('topic')
    searchUrlArr = request.json.get('urlList', [])
    newsId = request.json.get('newsId', 'article1')
    characterStyle = request.json.get('characterStyle', 'The Saucy Intellect')
    characterText = personality[characterStyle]
    print("characterStyle", characterStyle)
    resultPageTwo = get_detail_by_userID(user_id, "userDetailPageTwo")
    session = requests.Session()
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'Keep-Alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }

    # print("key_word:",key_word)
    # processed_data = ['%20'.join(item.split('&')).replace(
    #     ' ', '%20') for item in key_word]
    # searchWord = '%20'.join(processed_data)
    # print("searchWord:",searchWord)
    # https://news.google.com/search?q=trend%20style&hl=en-US&gl=US&ceid=US%3Aen
    url = f"https://news.google.com/search?q={key_word}&hl=en-US&gl=US&ceid=US%3Aen"
    print(key_word)
    print(searchUrlArr)
    url_obj = session.get(url, headers=headers)
    bs = BeautifulSoup(url_obj.text, 'html.parser')
    emoji = "No"
    if (resultPageTwo.get('Does your brand writing style use emojis?') == 1):
        emoji = "Yes"
    news = []
    for i in bs.find_all('a', class_="VDXfz"):
        try:
            this_news = {}
            url = "https://news.google.com/" + i['href']  # url at google
            url_obj = session.get(url, headers=headers)
            bs = BeautifulSoup(url_obj.text, "html.parser")
            url = bs.find('a', href=True, rel="nofollow")[
                "href"]  # real news url
            # print("first", url)
            if (url in searchUrlArr):
                continue
            # print("seconed", url)
            # print("real url", url)
            # print("step111")
            url_obj = session.get(url, headers=headers)
            # print("url_obj", url_obj)
            bs = BeautifulSoup(url_obj.text, "html.parser")
            # print("bs", bs.text)
            # print("step2222")
            prompt_summary = generatePrompt_summary(
                bs.text, characterText, emoji)
            prompt_date = generatePrompt_date(bs.text)
            # print("prompt_summary")
            # print("prompt_date", prompt_date)
            this_news['id'] = newsId
            this_news['title'] = generate_title(bs.text, characterText)
            this_news['url'] = url
            this_news['summary'] = gpt(prompt_summary)
            this_news['date'] = gpt(prompt_date)
            # print(this_news)
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
        # emoji = False
        # if (resultPageTwo.get('Does your brand writing style use emojis?') == 1):
        #     emoji = True
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
        # print("formatted", formatted_text)
        formatData = {"newsletter_plan": [
            {"day":  "value", "idea": "value", "sub_ideas": ["value", "value", "value"]}]}
        prompt = generateIdeas(formatted_text, formatData)
        # print("")
        ideas = gpt(prompt)
        # print(ideas)
        # print(json.loads(ideas))
        ideas = json.loads(ideas)
        # cleaned_data = [re.sub(r'^\d+\.\s*', '', item.strip()) for item in ideas.split('\n') if item.strip()]
        # print(cleaned_data)
        res = []
        for each in ideas["newsletter_plan"]:
            # print(each)
            id = add_ideas_withId(
                user_id, each["idea"], str(each["sub_ideas"]))
            obj = {'id': id,
                   'title': each["idea"],
                   "subIdea": each["sub_ideas"],
                   'used': False}
            # print(obj)
            res.append(obj)
        return res

    except Exception as e:
        print("Error generate Idea", str(e))
        return "error"


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
            obj["subIdea"] = ast.literal_eval(obj["subIdea"])
        # print(result)
        return jsonify(result)
    except Exception as e:
        print("Error get Idea", str(e))
        return "error"


def updateIdeas(request, userEmail):
    user_id = user_id_for_email(userEmail)
    id = request.json.get("id", 'null')
    title = request.json.get("title", "null")
    used = request.json.get("used", False)
    if (id == 'null' or id == ""):
        return "not Id provide"
    # print("id", id)
    # print("title", title)

    try:
        # print(business_category)
        update_Ideas_byId(user_id, id, title, used)
        return {'message': 'Idea update successfully'}
    except Exception as e:
        print("Error update ideas:", str(e))
        return "error"


def deleteIdeas(request, userEmail):
    user_id = user_id_for_email(userEmail)
    id = request.json.get("data", '[]')
    if (id == 'null' or id == ""):
        return "not Id provide"
    print(id)
    try:
        # print(business_category)
        for eachData in id:
            delete_Ideas_byId(user_id, eachData.get("id"))
        return {'message': 'Idea deleted successfully'}
    except Exception as e:
        print("Error delete Ideas:", str(e))
        return "error"


def getIntro(request, user_email):
    user_id = user_id_for_email(user_email)
    try:
        resultPageOne = get_detail_by_userID(user_id, "userDetailPageOne")
        # print('pageOne')
        resultPageTwo = get_detail_by_userID(user_id, "userDetailPageTwo")
        # print('pageTwo')
        resultPageThree = get_detail_by_userID_three_four(
            user_id, "userDetailPageThree")
        characterStyle = request.json.get(
            'characterStyle', 'The Saucy Intellect')
        characterText = personality[characterStyle]
        print("characterStyle", characterStyle)
        # print('pageThree')
        # resultPageFour = get_detail_by_userID_three_four(
        #     user_id, "userDetailPageFour")
        # print('pageFour')
        if (resultPageOne == False):
            return 'false'
        # print("step 1")
        page_three_data = {}
        # page_four_data = {}
        # print("resultPageThree", resultPageThree)
        if (resultPageThree != False):
            for row in resultPageThree:
                # print(row)
                page_three_data[row.get('question_name')] = row.get('data')
        # print(resultPageFour)
        # if (resultPageFour != False):
        #     for row in resultPageFour:
        #         page_four_data[row.get('question_name')] = row.get('data')
        # print("step 2")
        # print("resultPageTwo", resultPageTwo.get('Does your brand writing style use emojis?'))
        emoji = False
        if (resultPageTwo.get('Does your brand writing style use emojis?') == 1):
            emoji = True
        print("emoji", emoji)
        data = {
            'Brand or Company Name': resultPageOne.get('Brand or Company Name'),
            'Name of Publication or Newsletter': resultPageOne.get('Name of Publication or Newsletter'),
            'Description of Newsletter': resultPageOne.get('Description of Newsletter'),
            'Business Category': resultPageOne.get('Business Category'),
            'Use emojis in the content?': emoji,
            'Describe your brand in 3-10 words OR Select up to 5 words that would best describe your brand voice': page_three_data['Describe your brand in 3-10 words OR Select up to 5 words that would best describe your brand voice'],
        }
        print(data)
        for key, value in data.items():
            try:
                parsed_value = ast.literal_eval(value)
                if isinstance(parsed_value, list):
                    data[key] = parsed_value
            except (SyntaxError, ValueError):
                pass
        formatted_text = ""

        for key, value in data.items():
            if isinstance(value, list):
                value_str = ", ".join(value)
            else:
                value_str = value

            formatted_text += f"{key}: {value_str}\n"
        # print("formatted_text", formatted_text)
        prompt = generateIntro(formatted_text, characterText)
        intros = gpt(prompt)
        # print(intros)
        # cleaned_data = [re.sub(r'^\d+\.\s*', '', item.strip()) for item in ideas.split('\n') if item.strip()]
        # print(cleaned_data)
        # res = []
        # for each in cleaned_data:
        #     id = add_ideas_withId(user_id, each)
        #     obj = {'id':id,
        #            'title': each,
        #            'used': False}
        #     print(obj)
        #     res.append(obj)
        # cleaned_data = [re.sub(r'^\d+\.\s*\"(.*?)\"$', r'\1', item.strip()) for item in ideas.split('\n') if item.strip()]
        # print(cleaned_data)
        res = {"data": intros}
        return res

    except Exception as e:
        print("Error generate Intro:", str(e))
        return "error"


def getStory(request, user_email):
    user_id = user_id_for_email(user_email)
    try:
        idea = request.json.get("idea", '')
        content = request.json.get("content", "")
        characterStyle = request.json.get(
            'characterStyle', 'The Saucy Intellect')
        characterText = personality[characterStyle]
        print("characterStyle", characterStyle)
        resultPageOne = get_detail_by_userID(user_id, "userDetailPageOne")
        resultPageTwo = get_detail_by_userID(user_id, "userDetailPageTwo")
        resultPageThree = get_detail_by_userID_three_four(
            user_id, "userDetailPageThree")
        if (resultPageOne == False):
            return 'false'
        page_three_data = {}
        if (resultPageThree != False):
            for row in resultPageThree:
                page_three_data[row.get('question_name')] = row.get('data')
        emoji = "Do not use emoji in the story"
        if (resultPageTwo.get('Does your brand writing style use emojis?') == 1):
            emoji = "Use the emoji in the story"
        print("emoji", emoji)
        data = {
            "idea for the newsletter": idea,
            "Recent Content description": content,
            'Description of Newsletter': resultPageOne.get('Description of Newsletter'),
            'Business Category': resultPageOne.get('Business Category'),
            'Describe your brand in 3-10 words OR Select up to 5 words that would best describe your brand voice': page_three_data['Describe your brand in 3-10 words OR Select up to 5 words that would best describe your brand voice'],
        }
        print(data)
        for key, value in data.items():
            try:
                parsed_value = ast.literal_eval(value)
                if isinstance(parsed_value, list):
                    data[key] = parsed_value
            except (SyntaxError, ValueError):
                pass
        formatted_text = ""

        for key, value in data.items():
            if isinstance(value, list):
                value_str = ", ".join(value)
            else:
                value_str = value

            formatted_text += f"{key}: {value_str}\n"
        prompt = generateStory(formatted_text, characterText, emoji)
        # print(prompt)
        intros = gpt(prompt)
        res = {"data": intros}
        # print("asdfasdf")
        return res

    except Exception as e:
        print("Error generate Story:", str(e))
        return "error"


def getArticle(request, user_email):
    user_id = user_id_for_email(user_email)
    try:
        idea = request.json.get("idea", '')
        content = request.json.get("content", "")
        resultPageTwo = get_detail_by_userID(user_id, "userDetailPageTwo")
        characterStyle = request.json.get(
            'characterStyle', 'The Saucy Intellect')
        characterText = personality[characterStyle]
        print("characterStyle", characterStyle)
        emoji = "Do not use emoji in the article"
        if (resultPageTwo.get('Does your brand writing style use emojis?') == 1):
            emoji = "Use the emoji in the article"
        # print("emoji", emoji)
        data = {
            "idea for the Article": idea,
            "Recent Content description": content,
        }
        print(data)
        for key, value in data.items():
            try:
                parsed_value = ast.literal_eval(value)
                if isinstance(parsed_value, list):
                    data[key] = parsed_value
            except (SyntaxError, ValueError):
                pass
        formatted_text = ""

        for key, value in data.items():
            if isinstance(value, list):
                value_str = ", ".join(value)
            else:
                value_str = value

            formatted_text += f"{key}: {value_str}\n"
        # print("formatted Text",formatted_text)
        prompt = generateArticle(formatted_text, characterText, emoji)
        # print(prompt)
        intros = gpt(prompt)
        res = {"data": intros}
        # print("asdfasdf")
        return res

    except Exception as e:
        print("Error generate Story:", str(e))
        return "error"