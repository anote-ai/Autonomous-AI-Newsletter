from flask import jsonify
import secrets
import string
from datetime import datetime
from database.db import user_id_for_email
# from database.db import user_for_credentials, update_session_token_for_user, get_salt_for_email, user_exists, create_user_from_credentials, update_user_credentials, verify_password_reset_code, update_password_reset_token
import bcrypt
import re
from flask_mail import Message
from database.db import add_user_detail_by_id_page_one, add_user_detail_by_id_page_two, add_user_detail_by_id_page_three_four, get_detail_by_userID, get_detail_by_userID_three_four

def detail_get_Handler(request, userEmail):
    user_id = user_id_for_email(userEmail)
    # print("getInTwo")
    try:
        resultPageOne = get_detail_by_userID(user_id, "userDetailPageOne")
        # print('pageOne')
        resultPageTwo = get_detail_by_userID(user_id, "userDetailPageTwo")
        # print('pageTwo')
        resultPageThree = get_detail_by_userID_three_four(user_id, "userDetailPageThree")
        # print('pageThree')
        resultPageFour = get_detail_by_userID_three_four(user_id, "userDetailPageFour")
        # print('pageFour')
        if(resultPageOne == False or resultPageTwo == False):
            return 'false'
        # print("step 1")
        page_three_data = {}
        page_four_data = {}
        # print("resultPageThree", resultPageThree)
        if(resultPageThree != False):
            for row in resultPageThree:
                    # print(row)
                    page_three_data[row.get('question_name')] = row.get('data')
        # print(resultPageFour)
        if(resultPageFour != False):
            for row in resultPageFour:
                    page_four_data[row.get('question_name')] = row.get('data')
        # print("step 2")
        # print("resultPageTwo", resultPageTwo.get('Does your brand writing style use emojis?'))
        emoji = False
        if (resultPageTwo.get('Does your brand writing style use emojis?') == 1):
            emoji = True
        # print(emoji)
        data = {
            'pageOne':{
                'Brand or Company Name': resultPageOne.get('Brand or Company Name'),
                'URL': resultPageOne.get('URL'),
                'Name of Publication or Newsletter': resultPageOne.get('Name of Publication or Newsletter'),
                'Newsletter Header Image or Company Logo': resultPageOne.get('Newsletter Header Image or Company Logo'),
                'Description of Newsletter': resultPageOne.get('Description of Newsletter'),
                'Business Category': resultPageOne.get('Business Category'),
                'What color you want for the background': resultPageOne.get('colors used on the majority of your branding'),
                'What color you want for the Text': resultPageOne.get('List your color palette'),
                'Select your font styles': resultPageOne.get('Select your font styles'),
            },
            'pageTwo':{
                'Which email platform do you use?': resultPageTwo.get('Which email platform do you use?'),
                'How often do you send your newsletter?': resultPageTwo.get('How often do you send your newsletter?'),
                'Publication Language': resultPageTwo.get('Publication Language'),
                'Newsletter Size': resultPageTwo.get('Newsletter Size'),
                'Audience Demographics': resultPageTwo.get('Audience Demographics'),
                'Audience Age Range': resultPageTwo.get('Audience Age Range'),
                'Audience Income Level': resultPageTwo.get('Audience Income Level'),
                'Do you adhere to a stylistic choice?': resultPageTwo.get('Do you adhere to a stylistic choice?'),
                'Does your brand writing style use emojis?': emoji,
                'YouTube Channel URL': resultPageTwo.get('YouTube Channel URL'),
                'Facebook URL': resultPageTwo.get('Facebook URL'),
                'Instagram URL': resultPageTwo.get('Instagram URL'),
                'Twitter URL': resultPageTwo.get('Twitter URL'),
                'Linkedin URL': resultPageTwo.get('Linkedin URL'),
                'Pinterest URL': resultPageTwo.get('Pinterest URL'),
                'Shop URL': resultPageTwo.get('Shop URL'),
                'Portfolio URL': resultPageTwo.get('Portfolio URL'),
                'Threads URL': resultPageTwo.get('Threads URL')
            },
            'pageThree':page_three_data,
            'pageFour':page_four_data
        }
        # print("data", data)
        # print(result)
        # {'company_name': 'Daniel', 'news_letter_detail': 'Daniel', 'industry': 'Daniel'}
        return jsonify(data), 200
    except:
        return 'error'

def detail_update_Handler(request, userEmail):
    # add_user_detail_by_id_page_one(user_id, company_name, url, newsletter_name, header_image, description, business_category, branding_colors, color_palette, font_styles)
    user_id = user_id_for_email(userEmail)
    table = request.args.get('table')
    if(table == "userDetailPageOne"):
        print("pageOne", request.json)
        companyName = request.json.get('Brand or Company Name', 'null')
        url = request.json.get('URL', 'null')
        newsletter_name = request.json.get('Name of Publication or Newsletter', 'null')
        header_image = request.json.get('Newsletter Header Image or Company Logo', 'null')
        description = request.json.get('Description of Newsletter', 'null')
        business_category = str(request.json.get('Business Category', '[]'))
        branding_colors = request.json.get('What color you want for the background', 'null')
        color_palette = request.json.get('What color you want for the Text', 'null')
        font_styles = request.json.get('Select your font styles', 'null')
        print("step 1")
        try:
            # print(business_category)
            result = add_user_detail_by_id_page_one(user_id, companyName, url, newsletter_name, header_image, description, business_category, branding_colors, color_palette, font_styles)
            return result
        except Exception as e:
            print("Error inserting newsletter:", str(e))
            return "error"

    elif(table == "userDetailPageTwo"):
        # print("pagetwo", request.json)
        # add_user_detail_by_id_page_two(user_id, email_platform, send_frequency, language, newsletter_size, audience_demographics, age_range, income_level, stylistic_choice, emojis, youtube_url, facebook_url, instagram_url, twitter_url, linkedin_url, pinterest_url, shop_url, portfolio_url, threads_url)
        email_platform = request.json.get('Which email platform do you use?', 'null')
        send_frequency = request.json.get('How often do you send your newsletter?', 'null')
        language = request.json.get('Publication Language', 'null')
        newsletter_size = request.json.get('Newsletter Size', 'null')
        audience_demographics = str(request.json.get('Audience Demographics', '[]'))
        age_range = str(request.json.get('Audience Age Range', '[]'))
        income_level = str(request.json.get('Audience Income Level', '[]'))
        stylistic_choice = str(request.json.get('Do you adhere to a stylistic choice?', '[]'))
        emojis = request.json.get('Does your brand writing style use emojis?', False)
        youtube_url = request.json.get('YouTube Channel URL', 'null')
        facebook_url = request.json.get('Facebook URL', 'null')
        instagram_url = request.json.get('Instagram URL', 'null')
        twitter_url = request.json.get('Twitter URL', 'null')
        linkedin_url = request.json.get('Linkedin URL', 'null')
        pinterest_url = request.json.get('Pinterest URL', 'null')
        shop_url = request.json.get('Shop URL', 'null')
        portfolio_url = request.json.get('Portfolio URL', 'null')
        threads_url = request.json.get('Threads URL', 'null')
        try:
            result = add_user_detail_by_id_page_two(user_id, email_platform, send_frequency, language, newsletter_size, audience_demographics, age_range, income_level, stylistic_choice, emojis, youtube_url, facebook_url, instagram_url, twitter_url, linkedin_url, pinterest_url, shop_url, portfolio_url, threads_url)
            return result
        except Exception as e:
            print("Error inserting newsletter:", str(e))
            return "error"

    elif(table == "userDetailPageThree" or table == "userDetailPageFour"):
        # print("pagethree and pagefour ", request.json)
        dataList = request.json
        try:
            for each in dataList:
                # print(each.get('id'))
                add_user_detail_by_id_page_three_four(user_id, table, each.get('id'), each.get('title'), each.get('data'))
            return True
        except Exception as e:
            print("Error inserting newsletter:", str(e))
            return "error"


    # print(companyName, newsLetterDetail, industry)
    # if not validate_email(email):
    #     return jsonify({
    #         "status": "Invalid email format"
    #     })

    # isOk, message = validate_password(password)
    # if not isOk:
    #     return jsonify({
    #         "status": message
    #     })

    # user = user_exists(email)

    # if user:
    #     return jsonify({
    #         "status": "User already exists"
    #     })
    # else:
    #     token = generate_session_token(length=32)
    #     hashed_password, salt = hash_password(password)

    #     create_user_from_credentials(email, hashed_password, salt, token)

    #     return jsonify({
    #         "status": "OK",
    #         "token": token
    #     })