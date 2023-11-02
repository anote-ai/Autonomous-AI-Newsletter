import ast
from flask import jsonify
import os
import requests
import openai
import sys
import json
from database.db import user_id_for_email
from database.db import get_detail_by_userID, get_detail_by_userID_three_four
from database.db import add_brand_voice_withId, get_all_brand_voice, update_Brand_voice_byId, delete_Brand_voice_byId, check_brand_voice_by_id, check_brand_voice_by_id
import re
from gpt.api import Gpt

def addBrandVoiceHandler(request, user_email):
    user_id = user_id_for_email(user_email)
    try:
        BrandVoiceData = request.json.get("data", "null")
        BrandVoiceExists = check_brand_voice_by_id(user_id)
        if BrandVoiceExists != False:
            update_Brand_voice_byId(user_id, BrandVoiceExists.get("id"), BrandVoiceData)
        else:
            add_brand_voice_withId(user_id, BrandVoiceData)
        return jsonify("true")
    except Exception as e:
        print("Error add Brand Voice:", str(e))
        return "error"
    
def getBrandVoiceHandler(request, user_email):
    user_id = user_id_for_email(user_email)
    try:
        result = get_all_brand_voice(user_id)
        print(result)
        return result
    except Exception as e:
        print("Error get Brand Voice:", str(e))
        return "error"


def generateBrandVoiceHandler(request, user_email):
    user_id = user_id_for_email(user_email)
    try:
        resultPageOne = get_detail_by_userID(user_id, "userDetailPageOne")
        resultPageTwo = get_detail_by_userID(user_id, "userDetailPageTwo")

        if (resultPageOne == False):
            return 'false'
        if (resultPageTwo == False):
            return 'false'
        
        resultPageThree = get_detail_by_userID_three_four(
            user_id, "userDetailPageThree")
        
        page_three_data = {}
        page_four_data = {}

        if (resultPageThree != False):
            for row in resultPageThree:
                page_three_data[row.get('question_name')] = row.get('data')

        resultPageFour = get_detail_by_userID_three_four(
            user_id, "userDetailPageFour")
        
        if (resultPageFour != False):
            for row in resultPageFour:
                page_four_data[row.get('question_name')] = row.get('data')

        BrandVoiceGpt = Gpt()

        scenePrompt = generateBrandVoicePrompt1(resultPageOne.get('Brand or Company Name'), resultPageOne.get('URL'), resultPageOne.get("Business Category"), resultPageTwo.get(
            'Audience Demographics', 'N/A'), resultPageTwo.get('Audience Age Range', 'N/A'), resultPageTwo.get('Audience Income Level', 'N/A'), page_three_data.get(
                "In a nutshell, what do you set out to do every day on the job? What do you do for your current clients, customers, students, or followers?", "N/A"), page_three_data.get(
                    "Do you have a brand mission statement? It can be absolutely informal and messy—don't worry if it's not polished.", 'brand mission'))
        
        # print("prompt 1 : ", scenePrompt)
        sceneResult = BrandVoiceGpt.chat(scenePrompt)
        # print("prompt 1 result : ", sceneResult)


        brandVoiceBenchmarkPrompt = generateBrandVoicePrompt2(resultPageOne.get('Brand or Company Name'), page_three_data.get("Describe your brand in 3-10 words OR Select up to 5 words that would best describe your brand voice"), page_three_data.get("What are some phrases that sound just like you or your brand?", "N/A"))

        # print("prompt 2 : ", brandVoiceBenchmarkPrompt)
        brandVoiceBenchmarkResult = BrandVoiceGpt.chat(brandVoiceBenchmarkPrompt)
        # print("prompt 2 result : ", brandVoiceBenchmarkResult)


        aestheticsPrompt = page_four_data.get("What are some other brands with aesthetics and/or voices you enjoy?", "N/A")
        aspirationalBrandsPrompt = "N/A"
        aspirationalBrandsResult = "N/A"
        if aestheticsPrompt != "N/A" and aestheticsPrompt != "" and not aestheticsPrompt.isspace():
            aspirationalBrandsPrompt = generateBrandVoicePrompt3(aestheticsPrompt)
            aspirationalBrandsResult = BrandVoiceGpt.chat(aspirationalBrandsPrompt)

        # print("prompt 3 : ", aspirationalBrandsPrompt)
        # print("prompt 3 result : ", aspirationalBrandsResult)


        labelPrompt = generateBrandVoicePrompt4(resultPageOne.get('Brand or Company Name'), sceneResult, brandVoiceBenchmarkResult, aspirationalBrandsResult)

        print("prompt 4 : ", labelPrompt)
        labelPromptResult = BrandVoiceGpt.chat(labelPrompt)
        print("prompt 4 result : ", labelPromptResult)

        # resultOfBrandVoicePrompt = generateBrandVoicePrompt5(resultPageOne.get('Brand or Company Name'), labelPromptResult)

        # print("prompt 5 : ", labelPrompt)
        # resultOfBrandVoiceResult = BrandVoiceGpt.chat(resultOfBrandVoicePrompt)
        # print("prompt 5 result : ", resultOfBrandVoiceResult)

        return jsonify(labelPromptResult)

    except Exception as e:
        print("Error generate Brand Voice:", str(e))
        return "error"


def generateBrandVoicePrompt1(companyName, Url, Category, audienceDemographics, ageRange, incomeLevel, theBusiness, brandMission):
    prompt = f'''

    You are a columnist writing an article for a newsletter for {companyName}, found at {Url}. The business operates in a {Category} industry and services an audience that is audience demographics : {audienceDemographics} and audience age range: {ageRange} and audience income level: {incomeLevel}. The business: {theBusiness}. {companyName} describes its mission as "brand mission statement: {brandMission}". 
    Your task is to analyze our brand's usage scenarios and tasks.
    
    you should only response the your answer only without any other text.

    '''
    # print(prompt)
    # print("title reply", reply)
    # print(prompt)
    return prompt

def generateBrandVoicePrompt2(companyName, describeBrand, phrasesForYourBrand):
    prompt = f'''
    I am going to give you some stylistic notes about this brand's tone of voice.
    The brand is {describeBrand}. Common phrases the brand uses in copy & content could include {phrasesForYourBrand}.
    Do you understand this brand's voice? Please write a 2-3 line paragraph under 150 words to describe the voice of {companyName}.

    you should only response the your answer only without any other text.
    '''
    # print(prompt)
    # print("title reply", reply)
    # print(prompt)
    return prompt

def generateBrandVoicePrompt3(aesthetics):
    prompt = f'''
    I'm looking to find the commonalities between the following brands. Based on available content and copy on the internet, what do the following brands have in common: {aesthetics}? Write a list of 3 bullet points with sentences 10 words or less to describe those voices.”

    you should only response the your answer with 3 bullet points only without any other text.
    '''
    # print(prompt)
    # print("title reply", reply)
    # print(prompt)
    return prompt

def generateBrandVoicePrompt4(companyName, scene, brandVoiceBenchmark, brandVoiceElements):
    if brandVoiceElements != "NA":
        prompt = f'''
        Now, combine the brand's scene: {scene}, brand voice benchmark: {brandVoiceBenchmark} and brand voice elements:{brandVoiceElements} describing {companyName}'s brand voice with the above 3 bullet points. Write 3-4 line paragraph that combines both elements. Include a line that says “The voice is similar to [BRAND 1, BRAND 2, and BRAND 3]. Title this “Voice Synopsis.

        You should only respond with the format:{{"data": your answer}} only without any other text.
        '''
    else:
        prompt = f'''
        Now, combine the brand's scene: {scene} and brand voice benchmark: {brandVoiceBenchmark} describing {companyName}'s brand voice with the above 3 bullet points. Write 3-4 line paragraph that combines both elements. Include a line that says “The voice is similar to [BRAND 1, BRAND 2, and BRAND 3]. Title this “Voice Synopsis.

        You should only respond with the format:{{"data": your answer}} only without any other text.
        '''
    # print(prompt)
    # print("title reply", reply)
    # print(prompt)
    return prompt
def generateBrandVoicePrompt5(companyName, voiceSynopsis):
    prompt = f'''
    I would like to create a list of 13 more detailed features of the {companyName} you've described via the voice synopsis: {voiceSynopsis}. 

    Based on that information, please provide the following information for this brand as a 13-point list to serve as a brand voice style guide for this project:

    1, 5 adjectives to describe this brand's voice
    2, Is there a regional dialect you'd detect with this brand?
    3, What is the reading grade level this brand maintains based on the writing sample?
    4, What is the sentence structure or cadence this brand maintains based on the writing sample?
    5, What is the average word length this brand maintains based on the writing sample?
    6, What is the median sentence length this brand maintains based on the writing sample?
    7, What is the use of punctuation marks this brand maintains based on the writing sample?
    8, What writing themes does this brand maintains based on the writing sample, or what themes would you suggest based on the target audience & nature of the business?
    9, What comedic devices does this brand maintains based on the writing sample, or what themes would you suggest based on the target audience & nature of the business?
    10, Are there any commonly used phrases detected based on the writing sample?
    11, What narrative style does this brand maintains based on the writing sample, or what themes would you suggest based on the target audience & nature of the business?
    12, What comm
    13, What cultural references does the brand reference based on the writing sample? Include modern memes and tweets that an audience that enjoy [[BRAND 1, BRAND 2, and BRAND 3] would also enjoy. 


    You should only respond with the format: {{
        "5 adjectives to describe this brand's voice: answer1": answer,
        "Is there a regional dialect you'd detect with this brand?": answer,
        "What is the reading grade level this brand maintains based on the writing sample?": answer,
        "What is the sentence structure or cadence this brand maintains based on the writing sample?": answer,
        "What is the average word length this brand maintains based on the writing sample?": answer,
        "What is the median sentence length this brand maintains based on the writing sample?": answer,
        "What is the use of punctuation marks this brand maintains based on the writing sample?": answer,
        "What writing themes does this brand maintains based on the writing sample, or what themes would you suggest based on the target audience & nature of the business?": answer,
        "What comedic devices does this brand maintains based on the writing sample, or what themes would you suggest based on the target audience & nature of the business?": answer,
        "Are there any commonly used phrases detected based on the writing sample?": answer,
        "What narrative style does this brand maintains based on the writing sample, or what themes would you suggest based on the target audience & nature of the business?": answer,
        "What comm?": answer,
        "What cultural references does the brand reference based on the writing sample? Include modern memes and tweets that an audience that enjoy [[BRAND 1, BRAND 2, and BRAND 3] would also enjoy.": answer,
        }} and without any other text.
    '''
    # print(prompt)
    # print("title reply", reply)
    # print(prompt)
    return prompt
