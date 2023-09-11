from flask import jsonify
import secrets
import string
from datetime import datetime
from database.db import user_id_for_email
# from database.db import user_for_credentials, update_session_token_for_user, get_salt_for_email, user_exists, create_user_from_credentials, update_user_credentials, verify_password_reset_code, update_password_reset_token
import bcrypt
import re
from flask_mail import Message
from database.db import add_user_detail_byID, get_detail_by_userID

def detail_get_Handler(request, userEmail):
    user_id = user_id_for_email(userEmail)
    try:
        result = get_detail_by_userID(user_id)
        if(result == False):
            return 'false'
        
        # print(result)
        # {'company_name': 'Daniel', 'news_letter_detail': 'Daniel', 'industry': 'Daniel'}
        return jsonify({'companyName': result.get('company_name'), 'newsLetterDetail': result.get('news_letter_detail'), 'industry':result.get('industry')}), 200
    except:
        return 'error'

def detail_update_Handler(request, userEmail):
    user_id = user_id_for_email(userEmail)
    companyName = request.json.get("companyName", 'null')
    newsLetterDetail = request.json.get("newsLetterDetail", 'null')
    industry = request.json.get("industry", 'null')
    # print(companyName, newsLetterDetail, industry)
    try:
        result = add_user_detail_byID(user_id, companyName, newsLetterDetail, industry)
        return result
    except:
        return 'error'


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