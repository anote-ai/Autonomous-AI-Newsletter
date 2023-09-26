from flask import jsonify
import secrets
import string
from datetime import datetime
from database.db import add_newsletter, get_all_newsletter, user_id_for_email
# from database.db import user_for_credentials, update_session_token_for_user, get_salt_for_email, user_exists, create_user_from_credentials, update_user_credentials, verify_password_reset_code, update_password_reset_token
import bcrypt
import re
from flask_mail import Message

def getAllNewsletter(userEmail):
    user_id = user_id_for_email(userEmail)
    # print(data)
    try:
        # print(business_category)
        result = get_all_newsletter(user_id)
        return result
    except Exception as e:
        print("Error inserting newsletter:", str(e))
        return "error"

def setNewsletter(request, userEmail):
    # add_user_detail_by_id_page_one(user_id, company_name, url, newsletter_name, header_image, description, business_category, branding_colors, color_palette, font_styles)
    user_id = user_id_for_email(userEmail)
    data = str(request.json.get("data", '[]'))
    title = request.json.get("title", 'text')
    # print(data)
    try:
        # print(business_category)
        result = add_newsletter(user_id, title, data)
        return result
    except Exception as e:
        print("Error inserting newsletter:", str(e))
        return "error"

