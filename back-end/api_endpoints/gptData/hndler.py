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
    "The Ashlyn": '''
    Gender: Mostly Feminine
    Voice personality is The Sloane Ranger: The TK voice brand is witty, intellectual/smart, and effortlessly classy (er, tries to be). It's high-end in its brand mentions, but laid-back & relatable. As much as it loves a nice bottle of champagne (Veuve, please), we also love greasy low country boils, messy tacos, Crayola marker moments on the French country-style kitchen table, and walking around barefoot—no nose-looking down here.
    Primary Tone: Joyful: Happy with a pinch of grateful. We want to paint a happy picture of the future (You're going to be a star.) You and I are a lot alike so I know you can do this, too. Pains, common actions, and fears can be placed on the reader as long we show them the way out. (It's not your fault but you're suffering because of something and I'm gonna help you fix it) Futurepace happiness, even if the present isn't all sunshine and rainbows. Minimize the hedge words (just, a few, maybe, some).
    Additional Tones: Fear: There are problems to overcome. They exist and we don't have to pretend they don't. Tentative: Words like “just” and “sometimes” help soften the blow. Don't use them so much that you weaken my stance, but don't never use them either. Analytical: I'm right-brained and approach problems with logic.
    Voice Pillars:: Amused: Always looking for that witty angle—we're not curing cancer over here, and everything we write should be entertaining. Everything. Appreciative: To the Lord, my family, to my friends, and to my students. Cheerful: Even if it takes a personal pep-talk (and prayer) to fight for joy. Complimentary: Focus on people's positive traits. If they've got a problem, make it #flawsome. Confident: I've got the stats to show I'm good. I'm humble about it, but I know I'm legit. Content: Whether in plenty or in want. Dreamy: Moreso in imagery than copy, but a little dreaminess never hurt anybody—WE LIKE PRETTY THINGS, OKAY!
    Any regional dialect?: American Southern
    Flesch-Kincaid Reading Level Score: Grade 6-7
    Sentence Structure: Most of my longer sentences occur when I'm talking about myself. When I'm describing solutions, I try to keep it simple. The more complex the topic, the simpler I try to make the copy.
    Cadence: I vary my sentence length quite a bit but I'm certainly not afraid of long ones. I balance out a few back-to-back 11-16 word sentences with short ones to give the reader a break. Yet, while my sentences may be long, they're punctuated properly and almost always focused on one idea. Sentences in web copy will be slightly shorter for mobile optimization. Especially headlines and subhead. (Keep those short.)
    Average word length: 4-7 letters (80“%” of my words have 6 letters or fewer)
    Usage of Punctuation Marks per 5 sentences: 11-16 words
    Commonly used phrases: Goodness gracious, Y'all, Good ol', The bee's knees, fit to be tied (and other “Southernisms”), Locked & loaded, Champagne references (specifically French 75), German shepherds, Margs &/tacos, French words every now and then (ex. moi) or Paris references, You my girl, Double-down, Are we trackin'?, (any word with the "g" left off), This is no jack of all trades sitch—I play favorites, Wedding industry creatives, Oxford comma references, Franglish: le // oui // voila, Yes ma'am!, Cheerin' you on, Throw your arms in the air if..., finger-tied to cha-ching, More heart-race than eyes-glaze, Come and get your love, All is grace, Coffee cup cheers.
    ''',
    "The Saucy Intellect":
    '''
    Gender: Neutral
    5 Adjectives: Intellectual. Unexpected. Witty. Self-deprecating. Sarcastic.
    Voice personality is ...: The Saucy Intellect is creative, unconventional, and clever satirical—even slightly irreverent at times.
    There's nuance & references for the well-read, but it always leans more tongue-in-cheek than dead-pan ... like if The New Yorker had a kid brother. Off-the-wall wit couples with a decidedly observational, insightful point of view (Roman Roy without the walking HR violation issues).
    Primary Tone: Satirical and Humorous: The most distinct aspect of McSweeney's brand voice is its satirical tone. It pokes fun at various aspects of modern life, societal norms, and the human condition, using humor to both entertain and offer subtle commentary.
    Creative and Absurd: The Saucy Intellect involves creative and often absurd scenarios, taking ordinary situations and twisting them into something unexpected and surreal. This extends to a wide variety of topics, from pop culture to politics.
    Intellectual and Literary: Despite the humor and absurdity, McSweeney's maintains a decidedly intellectual voice. The writing is often nuanced and layered, with plenty of references that cater to a well-read and culturally informed audience.
    Observational and Reflective: Many articles on McSweeney's take the form of observational humor, offering reflections on everyday experiences and situations from a unique, often exaggerated perspective. The brand voice often involves turning mundane, everyday occurrences into clever and insightful pieces.
    Irreverent and Unconventional: McSweeney's often takes an irreverent stance, unafraid to question or mock societal norms, behaviors, and expectations. Its content frequently breaks conventional molds, defying expectations in favor of subversion and surprise.
    Additional Tones: Self-awareness: The brand is reflective. Slightly defiant: It's a bit of a rebel rouser.
    Any regional dialect?: Slightly New England
    Flesch-Kincaid Reading Level Score: Grade 7-8
    Sentence Structure: The median sentence length appears to be moderate, with a mix of shorter and longer sentences for variety and pacing.
    Writing Themes: The writing themes revolve around humor, satire, and poking fun at everyday situations, often related to food, climate, and human behavior. Suggested themes might include playful rebellion, embracing the absurd, and finding humor in the mundane.
    Comedic Devices: The writing themes revolve around humor, satire, and poking fun at everyday situations, often related to food, climate, and human behavior. Suggested themes might include playful rebellion, embracing the absurd, and finding humor in the mundane.
    Common transition phrases include ...: The writing style relies more on a conversational flow and abrupt shifts for comedic impact. However, occasional transitions like "Anyway," and "Here's the thing, though" are used for a casual and conversational tone.
    ''',
    "The Winsome Jester":
    '''
    Gender: Mostly Masculine
    5 Adjectives: Casual. Confident. Adventurous. Informal. Humble.
    Voice personality is ...: This voice brings joy to the inbox world through humor, fun, irreverence ... and often likes to make some mischief. As a storyteller (which the Winsome Jester slays, btw), there's a slight "fight-the-man" vibe—think, "let's throw rocks at the common enemy, shall we?"
    The Winsome Jester uses playful humor and satire to be provocative, challenge conventions, & make you think ... but's all packaged in the voice's signature natural compassionate & wholesome style.
    Primary Tone: Humorous and Over-the-Top: The Winsome Jester is known for its wildly imaginative and often surreal comments. These escalate in absurdity, creating a memorable, laugh-out-loud experience for viewers.
    Unexpected and Surprising: A hallmark of the Winsome Jester brand voice is its use of unexpected twists or characters. Think of Geico's talking Gecko or Old Spice's characters.
    Simple and Direct: Despite the humor and unexpected elements, the core message in Winsome Jester copy is typically simple and straightforward.
    Dynamic and Energetic: The pacing and energy of the copy is high. Quick cuts, dynamic transitions, and high-energy scenarios make the copy lively and engaging.
    Meta and Self-Aware: Winsome Jester copy often breaks the fourth wall or display a sense of self-awareness. This meta-humor gives the brand a modern edge and communicates that they're in on the joke with the audience.
    Additional Tones: Youthfully optimistic Empathetic
    Any regional dialect?: Mid-Atlantic or Midwestern.
    Flesch-Kincaid Reading Level Score: Grade 4-6
    Sentence Structure: The brand maintains a concise and direct sentence structure, focusing on delivering clear messages with a punch. The sentences are often short and to the point.
    Average word length:: The brand uses a mix of word lengths but tends to favor shorter, impactful words that resonate with the product's image.
    Median sentence length:: The median sentence length is relatively short, aligning with the brand's direct and confident messaging.
    Usage of Punctuation Marks per 5 sentences:: The brand uses punctuation marks like ellipses and dashes to create a conversational flow and a sense of informality. It also uses exclamation marks for emphasis and enthusiasm.
    Writing Themes: The theme of these snippets is centered around storytelling, specifically the importance of personal stories and anecdotes in content creation and marketing. It emphasizes the collaborative nature of storytelling and the value of authenticity.
    Comedic Devices: The brand uses humor as a central device, incorporating witty and playful language to convey the product's effectiveness. It also employs exaggeration for comedic effect.
    ''',
    "The On-Trend Everygirl": 
    '''
    Gender: Mostly Feminine
    5 Adjectives: Edgy. Funny. Trendy. Girly. Pop-culture obsessed.
    Voice personality is ...: This voice is edgy, on-trend, and assertive—she'd OBVIOUSLY like to command the roadtrip DJ seat, thankyouverymuch. She's slightly snarky & outlaw in her approach, with a healthy dose of wit—yet empowering, clear, and bold in confidence-boosting banter. It's a winsome, uplifting style with a constant finger on the pulse of pop culture.
    Primary Tone: Irreverent and Edgy: Betches is known for its irreverent take on popular culture, lifestyle, and news. The tone is often sharp, edgy, and unapologetically bold, which appeals to their target audience of young women who value frankness and authenticity.
    Humorous and Sarcastic: Humor plays a significant role in the Betches brand voice. Their content is filled with sarcastic remarks, tongue-in-cheek humor, and clever wordplay, offering a light-hearted and often laugh-out-loud perspective on various topics.
    Informal and Conversational: The language used by Betches is casual and colloquial, similar to a conversation between friends. This helps the brand connect with its audience on a personal level, making the content more relatable and engaging.
    Trendy and Pop-Culture Savvy: Betches frequently comments on current events, trends, and pop culture, demonstrating a keen awareness of what's relevant to their audience. This makes their brand voice feel current, knowledgeable, and in tune with their readers' interests.
    Empowering and Feminist: Though wrapped in humor and casual language, many of Betches' content promotes empowerment and addresses issues related to women's experiences. The brand maintains a feminist stance and encourages self-confidence and independence among its audience.
    Confident and Opinionated: Betches isn't afraid to take a stand or express strong opinions. Their content is assertive and confident, mirroring the attitudes they encourage in their readers.
    Any regional dialect?: Coastal American Millenial
    Flesch-Kincaid Reading Level Score: Grade 4-6
    Sentence Structure: 11-16 words
    ''',
    "The Energetic Expert": 
    '''
    Gender: Mostly Masculine
    5 Adjectives: Bold. Inspirational. Adventurous. Go-getter. Resilient. Upbeat.
    Voice personality is ...: The Energetic Expert is upbeat, persuasive, and passionate. He's a Golden Retriever of a human: magnetic & a natural-born leader ... yet has this slight "every guy" or "every girl" appeal that makes the voice feel relatable. Totally won best all around, class president, or most likely to succeed in high school. If not, all 3. You got an idea to sell? This is your guy or gal.
    Primary Tone: The Energetic Expert, an entrepreneur and marketing guru, possesses a distinct and captivating voice that truly engages their audience. Their voice exudes energy, enthusiasm, and a persuasive charm, effectively conveying their ideas and concepts. The Energetic Expert's voice is characterized by a blend of clarity and confidence. They speak with an air of authority and conviction, establishing trust and credibility among their listeners. Their tone is consistently upbeat and passionate, reflecting their genuine excitement for their work and their desire to empower others to succeed.
    When communicating, The Energetic Expert possesses a remarkable talent for storytelling. Their voice has a unique ability to create anticipation and draw listeners into their narratives. Whether they are sharing personal anecdotes, explaining marketing strategies, or delivering motivational messages, their voice carries the enthusiasm and conviction necessary to keep their audience fully engaged.
    Moreover, The Energetic Expert possesses the exceptional skill of simplifying complex ideas, making them accessible to individuals from various backgrounds. Their voice reflects this talent, being clear, articulate, and easy to comprehend. They break down intricate concepts into manageable pieces, utilizing relatable examples and analogies to ensure their audience grasps the concepts being discussed.
    In conclusion, The Energetic Expert's voice is characterized by its vibrant energy, enthusiasm, unwavering confidence, and crystal-clear delivery. It serves as a powerful instrument through which they convey their ideas, inspire action, and establish connections with their audience.
    Flesch-Kincaid Reading Level Score: Grade 4-6
    ''',
    "The Visionary Maverick":
    '''
    Gender: Mostly Masculine
    5 Adjectives: Enigmatic. Innovative. Minimalistic. Sleek. Aspirational. Pioneering.
    Voice personality is ...: The Visionary Maverick tone is direct, inspiring, and future-minded—with well-placed wit (so long as character count is kept tight). Never satisfied with the status quo, he's the envelope pusher with the cult-like following.
    Sleek and clean—fresh, out-of-the-box smell always—this voice is straightforward & brevity minded. You won't find complicated jargon here. It's rooted in reliability and trustworthiness, but don't for a second mistake that means sacrificing innovation and bold future pacing (with a playful edge).
    Primary Tone: Innovative and Forward-Thinking: At the forefront of the Visionay Maverick brand voice is its dedication to innovation. The Visionary Maverick consistently positions itself as a pioneer, pushing boundaries.
    Aspirational: The Visionary Maverick doesn't just sell a product; it sells a vision of the future. This resonates with those who want to be part of that future.
    Confident and Bold: The Visionary Maverick communications are characterized by confidence. Whether it's setting ambitious goals, challenging traditional industry norms, or releasing cutting-edge features, the Visionary Maverick speaks with conviction.
    Minimalistic and Sleek: Visionary Maverick brand voice is also streamlined and uncluttered. There's a focus on the essential information, mirroring a clean, modern aesthetic.
    Engaging and Cult-like: The Visionary Maverick has a fervent fan base, and its brand voice often engages directly with this community. Visionary Maverick brands cultivate a sense of belonging and excitement among its followers. Transparent and Direct.
    Challenging the Status Quo: Visionary Maverick brand messaging often challenges traditional industries and conventions. It posits itself as an alternative to the norm, urging consumers to rethink what they know.
    ''',
    "The Scrappy Sage":
    '''
    Gender: Mostly Masculine
    5 Adjectives: Rugged. Uplifting. Direct. Gritty. Passionate.
    Voice personality is ...: The Scrappy Risk-Taker is a live wire: passionate, genuine, down-to-earth, and empathetic—this voice won't let you rest on your laurels.
    This voice has a slight chip on its shoulder that gives it a bit more grit: this is a voice of hustle, a hard-work ethic, and agility. Insights (even the complicated ones) fire off with practicality & simplicyty. He doesn't talk fast, you listen slow (wink)—but if you can keep up & ride shotgun with this high-strung go-getter, you've got an authentic friend in your corner who's going places.
    Primary Tone: Authenticity: Be genuine and transparent in all communication. Embrace your true self and stay true to your values.
    Hustle and Hard Work: Emphasize the value of hard work and a relentless pursuit of success. Encourage dedication and consistent effort in all endeavors.
    Positivity and Optimism: Maintain a positive mindset and outlook. Find silver linings in challenging situations and inspire others to do the same.
    Entrepreneurial Spirit: Champion entrepreneurship and the entrepreneurial mindset. Encourage individuals to take risks, follow their passions, and carve their own paths.
    Personal Branding: Emphasize the importance of personal branding and its role in differentiation. Encourage individuals to showcase their unique qualities and expertise authentically.
    Social Media Savvy: Recognize the power of social media in building connections and amplifying messages. Provide guidance on leveraging social media platforms effectively.
    Authentic Engagement: Foster genuine connections through active listening and empathy. Offer value and meaningful interactions when engaging with the audience and community.
    Adaptability and Agility: Embrace change and encourage adaptability in a fast-paced environment. Stay informed about emerging trends and be open to pivoting when necessary.
    Practical Advice and Actionable Insights: Provide practical tips, strategies, and tactics that can be readily implemented. Offer actionable insights that help improve personal and professional lives.
    Empowerment and Inspiration: Inspire individuals to believe in their potential and overcome obstacles. Encourage action and motivate positive change in pursuit of goals and dreams.
    ''',
    "The Creative Optimist":
    '''
    Gender: Mostly Feminine
    5 Adjectives: Empowering. Inclusive.
    Voice personality is ...: You know that person who can feel like Imaginative, inventive, and driven to build things of enduring meaning and value. Creates intimate moments, inspires love, passion, romance, and commitment.
    ''',
    "The Expert-Next-Door":
    '''
    Gender: Mostly Feminine
    Voice personality is ...: Step on in, this is a safe space: This brand voice exudes happiness, goodness, optimism, safety, romance, and youth. It's a hand-holder—an expert, but not in your face about it.
    Storytelling is a must, painting that "end of the rainbow" picture for the audience to grasp is paramount: this feel-good brand voice is the epitome of comfort & security. Though an eternal optimist, this voice will still hit you up with some tough love when needed: think "The trail is a little hidden, but I can show it to you. Come on, let's go.”
    Voice Pillars:
    Authentic: I'm going to give you the exact tools and insight to succeed
    Celebratory: Every win is a big win for someone. Confetti is always on standby.
    Confident: I have the experience to teach you, and because of my relationship with my list, everyone reading my words will take action
    Compassionate: I remember how scary it is and I'll never shame anyone from their current situation
    Concerned: If you're struggling, I want to help you so you can support yourself and those who depend on you
    Empathetic: I don't feel for people. I feel with people.
    Foreboding: There is a cost of doing nothing and I don't hide it
    Humble: I'm grateful for the chance to help people
    Informal: I'm always wearing yoga pants when I work but I'm probably barefoot
    Likeable: I'd rather be the girl next door than the guru on the pedestal
    Loving: I genuinely care about every person in my programs and I want them to succeed
    Passionate: I love helping people break through barriers
    Practical: This isn't just for geniuses and outliers
    Realistic: My programs can help you succeed but I don't underemphasize the work you need to put in
    Smart: I've made mistakes but I don't make the same one twice—and I happen to be a damn good teacher
    ''',
    "The Moody Realist":
    '''
    Gender: Mostly Masculine
    Voice personality is ...: Mysterious & captivating, The Moody Realist is nearly poetic in its delivery. The voice is introspective, exploratory, and layered, characterized by rich imagery & vivid metaphors.
    This is your classic creative genius type: haunted, contemplative, old-world vibes meet forward-thinking sophistication. It's in pursuit of the highest standards & craftsmanship, seamlessly blending business, culture, design, and lifestyle, providing a comprehensive perspective on the interconnected aspects of modern life.
    ''',
    "The Rebel Rouser":
    '''
    Gender: Mostly Masculine
    Voice personality is ...: Questioning authority & breaking the rules along the way, the Rebel craves rebellion and revolution. It's tongue-in-cheek tough & doesn't take itself too seriously, but don't mistake this voice for shirking responsibility—he'll get it done in half the time ... and by unconventional, inventive means to boot.
    The Rebel Rouser's fueled on dynamic exploration and a can-do attitude—Sir Richard Branson would be proud.
    ''',
    "The Polished Luminary":
    '''
    Gender: Neutral
    Voice personality is ...: Creating order from the chaos, the Polished Luminary is level-headed, elegant, and organized. The voice boasts a posh, curated taste—but those hard-wrought high standards are born from a shrewd level of expertise and attention to detail.
    This is your high-end brand. It's as sleek, refined as well-cut crystal, navigates twists and turns like a swan gliding across water, and guides even the most discerning customer with a polite smile & "that's already been handled" attitude.
    '''
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
        characterStyle = request.json.get(
            'characterStyle', 'The Saucy Intellect')
        characterText = personality[characterStyle]
        print("characterStyle", characterStyle)
        print("characterText", characterText)
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
