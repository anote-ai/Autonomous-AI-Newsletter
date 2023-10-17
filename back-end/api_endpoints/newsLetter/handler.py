from flask import jsonify
import secrets
import string
from datetime import datetime
from database.db import add_newsletter, get_all_newsletter, user_id_for_email, delete_newsletter_byId, check_credits, reduce_credits
# from database.db import user_for_credentials, update_session_token_for_user, get_salt_for_email, user_exists, create_user_from_credentials, update_user_credentials, verify_password_reset_code, update_password_reset_token
import bcrypt
import re
from flask_mail import Message
import ast

def getAllNewsletter(userEmail):
    user_id = user_id_for_email(userEmail)
    # print(data)
    try:
        # print(business_category)
        result = get_all_newsletter(user_id)
        for obj in result:
            obj["data"] = ast.literal_eval(obj["data"])

        return result
    except Exception as e:
        print("Error inserting newsletter:", str(e))
        return "error"

def setNewsletter(request, userEmail):
    # add_user_detail_by_id_page_one(user_id, company_name, url, newsletter_name, header_image, description, business_category, branding_colors, color_palette, font_styles)
    user_id = user_id_for_email(userEmail)
    data = str(request.json.get("data", '[]'))
    title = request.json.get("topic", 'text')
    theme = request.json.get("theme", 'null')
    idea_id = request.json.get("idea_id", 'null')
    backgroundColor = request.json.get("backgroundColor", "")
    character_name = request.json.get("character", "null")
    print(idea_id)
    try:
        # print(business_category)
        check_credits_result = check_credits(userEmail)
        if(check_credits_result == False):
            return jsonify({"status": "Not enough credits to unlock the profiles"})
        result = add_newsletter(user_id, title, theme, idea_id, backgroundColor, character_name, data)
        reduce_credits(user_id)
        return result
    except Exception as e:
        print("Error inserting newsletter:", str(e))
        return "error"

def deleteNewsletter(request, userEmail):
    # add_user_detail_by_id_page_one(user_id, company_name, url, newsletter_name, header_image, description, business_category, branding_colors, color_palette, font_styles)
    user_id = user_id_for_email(userEmail)
    id = request.args.get('id', 'null')
    if(id == 'null' or id ==""):
        return "not Id provide"
    # print(data)
    try:
        # print(business_category)
        result = delete_newsletter_byId(user_id, id)
        return result
    except Exception as e:
        print("Error inserting newsletter:", str(e))
        return "error"