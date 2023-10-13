import os
import mysql.connector
from flask import request
import socket
from flask import jsonify
from collections import deque
import numpy as np
from datetime import datetime, timedelta
from io import StringIO
from opensearchpy import OpenSearch, RequestsHttpConnection
from flask import make_response
from dateutil.relativedelta import relativedelta
from database.db_auth import user_id_for_email
from flask_mail import Message
from email.mime.text import MIMEText
from constants.global_constants import kSessionTokenExpirationTime, kPasswordResetExpirationTime, EMAIL_WHITELIST, planToCredits, kValidationResetExpirationTime
from db_enums import PaidUserStatus

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_db_connection():
    print("in auth get_db_connection")
    print(socket.gethostname())
    print(socket.gethostname())
    print(os.environ)
    if ('.local' in socket.gethostname() or '.lan' in socket.gethostname() or 'Shadow' in socket.gethostname()) or ('APP_ENV' in os.environ and os.environ['APP_ENV'] == 'local'):
        print("in local branch")
        conn = mysql.connector.connect(
            user='root',
            password='1165205407',
            host='localhost',
            port=3306,
            database='newsLetter'
        )
    else:
        print("in remote branch")
        db_host = "newsletter-db.ctoizzxupont.us-east-1.rds.amazonaws.com"
        db_name = "newsletter"
        db_user = "admin"
        db_password = "R57sWqpGu83Xde"
        conn = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_name,
        )
        print("connected")
    # conn.row_factory = sqlite3.Row
    return conn, conn.cursor(dictionary=True)

# def get_db_connection():
#     if ('.local' in socket.gethostname() or '.lan' in socket.gethostname() or 'Shadow' in socket.gethostname()) or ('APP_ENV' in os.environ and os.environ['APP_ENV'] == 'local'):
#         conn = mysql.connector.connect(
#             user='root',
#             password='1165205407',
#             host='localhost',
#             port=3306,
#             database='newsLetter'
#         )
#     else:
#         db_host = "newsletter-db.ctoizzxupont.us-east-1.rds.amazonaws.com"
#         db_name = "newsletter"
#         db_user = "admin"
#         db_password = ""
#         conn = mysql.connector.connect(
#             host=db_host,
#             user=db_user,
#             password=db_password,
#             database=db_name,
#         )
#     # conn.row_factory = sqlite3.Row
#     return conn, conn.cursor(dictionary=True)

# test connection
# try:
#     connection, cursor = get_db_connection()

#     if connection.is_connected():
#         print("Connected to MySQL database")

# except mysql.connector.Error as error:
#     print(f"Error: {error}")

# finally:
#     if 'connection' in locals() and connection.is_connected():
#         connection.close()
#         print("MySQL connection closed")

# create a user

# def create_user():
#     conn, cursor = get_db_connection()
#     NOW = datetime.now()
#     cursor.execute('INSERT INTO users (company_name, news_letter_detail, industry) VALUES (NULL, NULL, NULL);')
#     conn.commit()
#     conn.close()


def check_user_by_id(id):
    conn, cursor = get_db_connection()
    cursor.execute('SELECT * FROM users WHERE id=%s;', [id])
    user = cursor.fetchone()
    conn.commit()
    conn.close()
    if (user):
        return True
    return False


def check_detail_by_userId(user_ID, tableName):
    conn, cursor = get_db_connection()
    # Use proper string formatting with placeholders (%s) for variables
    query = f'SELECT * FROM {tableName} WHERE user_id=%s;'
    cursor.execute(query, [user_ID])
    detail = cursor.fetchone()
    conn.commit()
    conn.close()
    if detail:
        return True
    print("detail", detail)
    return False


def get_detail_by_userID(user_ID, tabeName):
    conn, cursor = get_db_connection()
    cursor.execute(f"""
            SELECT * FROM {tabeName}
            WHERE user_id = %s
        """, [user_ID])
    page_data = cursor.fetchone()
    # print(page_data)
    conn.commit()
    conn.close()
    # print(detail)
    if (page_data):
        return page_data
    return False

def get_detail_by_userID_three_four(user_ID, tableName):
    conn, cursor = get_db_connection()
    cursor.execute(f"""
            SELECT question_name, data FROM {tableName}
            WHERE user_id = %s
        """, [user_ID])
    page_data = cursor.fetchall()
    # print(page_data)
    conn.commit()
    conn.close()
    if (page_data):
        return page_data
    return False


def add_user_detail_by_id_page_one(user_id, company_name, url, newsletter_name, header_image, description, business_category, branding_colors, color_palette, font_styles):
    conn, cursor = get_db_connection()
    # print('step1')
    if check_user_by_id(user_id):
        # print('step2')
        if check_detail_by_userId(user_id, 'userDetailPageOne'):
            # print('step3')
            update_query = """
                UPDATE userDetailPageOne 
                SET 
                    `Brand or Company Name` = %s, 
                    `URL` = %s, 
                    `Name of Publication or Newsletter` = %s, 
                    `Newsletter Header Image or Company Logo` = %s, 
                    `Description of Newsletter` = %s, 
                    `Business Category` = %s, 
                    `colors used on the majority of your branding` = %s, 
                    `List your color palette` = %s, 
                    `Select your font styles` = %s 
                WHERE user_id = %s
            """
            cursor.execute(update_query, (
                company_name, url, newsletter_name, header_image,
                description, business_category, branding_colors,
                color_palette, font_styles, user_id
            ))
        else:
            # print("step4")
            print(business_category)
            insert_query = """
                INSERT INTO userDetailPageOne 
                (user_id, `Brand or Company Name`, `URL`, `Name of Publication or Newsletter`, 
                `Newsletter Header Image or Company Logo`, `Description of Newsletter`, 
                `Business Category`, `colors used on the majority of your branding`, 
                `List your color palette`, `Select your font styles`)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute('INSERT INTO userDetailPageOne (user_id, `Brand or Company Name`, `URL`, `Name of Publication or Newsletter`, `Newsletter Header Image or Company Logo`, `Description of Newsletter`, `Business Category`, `colors used on the majority of your branding`, `List your color palette`, `Select your font styles`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', [
                user_id, company_name, url, newsletter_name, header_image,
                description, business_category, branding_colors,
                color_palette, font_styles
            ])
        
        conn.commit()
        conn.close()
        return True
    else:
        return 'user not exist'

def add_user_detail_by_id_page_two(user_id, email_platform, send_frequency, language, newsletter_size, audience_demographics, age_range, income_level, stylistic_choice, emojis, youtube_url, facebook_url, instagram_url, twitter_url, linkedin_url, pinterest_url, shop_url, portfolio_url, threads_url):
    conn, cursor = get_db_connection()
    # print('step1')
    if check_user_by_id(user_id):
        # print('step2')
        if check_detail_by_userId(user_id, 'userDetailPageTwo'):
            # print('step3')
            update_query = """
                UPDATE userDetailPageTwo 
                SET 
                    `Which email platform do you use?` = %s, 
                    `How often do you send your newsletter?` = %s, 
                    `Publication Language` = %s, 
                    `Newsletter Size` = %s, 
                    `Audience Demographics` = %s, 
                    `Audience Age Range` = %s, 
                    `Audience Income Level` = %s, 
                    `Do you adhere to a stylistic choice?` = %s, 
                    `Does your brand writing style use emojis?` = %s, 
                    `YouTube Channel URL` = %s, 
                    `Facebook URL` = %s, 
                    `Instagram URL` = %s, 
                    `Twitter URL` = %s, 
                    `Linkedin URL` = %s, 
                    `Pinterest URL` = %s, 
                    `Shop URL` = %s, 
                    `Portfolio URL` = %s, 
                    `Threads URL` = %s
                WHERE user_id = %s
            """
            cursor.execute(update_query, (
                email_platform, send_frequency, language, newsletter_size,
                audience_demographics, age_range, income_level, stylistic_choice,
                emojis, youtube_url, facebook_url, instagram_url, twitter_url,
                linkedin_url, pinterest_url, shop_url, portfolio_url, threads_url, user_id
            ))
        else:
            # print('step4')
            insert_query = """
                INSERT INTO userDetailPageTwo 
                (user_id, `Which email platform do you use?`, `How often do you send your newsletter?`, 
                `Publication Language`, `Newsletter Size`, `Audience Demographics`, 
                `Audience Age Range`, `Audience Income Level`, `Do you adhere to a stylistic choice?`, 
                `Does your brand writing style use emojis?`, `YouTube Channel URL`, `Facebook URL`, 
                `Instagram URL`, `Twitter URL`, `Linkedin URL`, `Pinterest URL`, `Shop URL`, 
                `Portfolio URL`, `Threads URL`)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (
                user_id, email_platform, send_frequency, language, newsletter_size,
                audience_demographics, age_range, income_level, stylistic_choice,
                emojis, youtube_url, facebook_url, instagram_url, twitter_url,
                linkedin_url, pinterest_url, shop_url, portfolio_url, threads_url
            ))
        
        conn.commit()
        conn.close()
        return True
    else:
        return 'user not exist'

def add_user_detail_by_id_page_three_four(user_id, data_page, question_id, question_name, question_data):
    conn, cursor = get_db_connection()
    # print('step1')
    if check_user_by_id(user_id):
        # print('step2')
        cursor.execute(f"""
            SELECT * FROM {data_page}
            WHERE user_id = %s AND question_id = %s
        """, (user_id, question_id))
        existing_record = cursor.fetchone()
        if existing_record:
            # Update the existing record
            cursor.execute(f"""
                UPDATE {data_page}
                SET question_name = %s, data = %s
                WHERE user_id = %s AND question_id = %s
            """, (question_name, question_data, user_id, question_id))
        else:
            # Insert a new record
            cursor.execute(f"""
                INSERT INTO {data_page} (user_id, question_id, question_name, data)
                VALUES (%s, %s, %s, %s)
            """, (user_id, question_id, question_name, question_data))
        
        conn.commit()
        conn.close()
        return True
    else:
        return 'user not exist'


def create_user_if_does_not_exist(email, google_id, person_name, profile_pic_url):
    conn, cursor = get_db_connection()
    cursor.execute(
        'SELECT COUNT(*), id FROM users WHERE email=%s GROUP BY id', [email])
    count = cursor.fetchone()
    user_id = -1
    if count is None or count["COUNT(*)"] == 0:
        # Create new user
        cursor.execute('INSERT INTO users (email, google_id, person_name, profile_pic_url) VALUES (%s,%s,%s,%s)', [
                       email, google_id, person_name, profile_pic_url])
        row = cursor.fetchone()
        conn.commit()
        conn.close()
        user_id = cursor.lastrowid
    else:
        user_id = count["id"]

    return user_id


def verify_password_reset_code(email, passwordResetCode):
    conn, cursor = get_db_connection()
    isVerified = False
    NOW = datetime.now()
    cursor.execute("SELECT * FROM users WHERE email = %s AND password_reset_token = %s AND password_reset_token_expiration > %s",
                   [email, passwordResetCode, NOW])
    users = cursor.fetchall()
    if len(users) > 0:
        isVerified = True
    conn.close()
    return isVerified

def verify_verification_code(email, verificationCode):
    conn, cursor = get_db_connection()
    isVerified = False
    NOW = datetime.now()
    cursor.execute("SELECT * FROM users WHERE email = %s AND verification_token = %s AND verification_token_expiration > %s",
                   [email, verificationCode, NOW])
    users = cursor.fetchall()
    if len(users) > 0:
        isVerified = True
    conn.close()
    return isVerified


def user_for_credentials(email, password_hash):
    conn, cursor = get_db_connection()
    cursor.execute(
        'SELECT * FROM users WHERE email = %s AND password_hash = %s', [email, password_hash])
    return cursor.fetchone()


def get_salt_for_email(email):
    conn, cursor = get_db_connection()
    cursor.execute('SELECT salt FROM users WHERE email = %s', [email])
    salt = cursor.fetchone()
    if salt and salt["salt"]:
        return salt["salt"]
    else:
        return None


def update_session_token_for_user(email, session_token):
    conn, cursor = get_db_connection()
    NOW = datetime.now()
    expiration_limit = NOW + kSessionTokenExpirationTime
    cursor.execute("UPDATE users SET session_token = %s , session_token_expiration = %s WHERE email = %s", [
                   session_token, expiration_limit, email])
    conn.commit()
    conn.close()


def user_exists(email):
    conn, cursor = get_db_connection()
    cursor.execute('SELECT * FROM users WHERE email = %s', [email])
    return cursor.fetchone()


def create_user_from_credentials(email, password_hash, salt, session_token):
    conn, cursor = get_db_connection()
    NOW = datetime.now()
    expiration_limit = NOW + kSessionTokenExpirationTime
    cursor.execute('INSERT INTO users (email, password_hash, session_token, session_token_expiration, salt) VALUES (%s, %s, %s, %s, %s)', [
                   email, password_hash, session_token, expiration_limit, salt])
    conn.commit()
    conn.close()

def update_verification_token(email, generated_token):
    conn, cursor = get_db_connection()

    NOW = datetime.now()
    expiration_limit = NOW + kValidationResetExpirationTime
    cursor.execute("UPDATE users SET verification_token = %s , verification_token_expiration = %s WHERE email = %s", [
                   generated_token, expiration_limit, email])

    conn.commit()
    conn.close()

def update_password_reset_token(email, generated_token):
    conn, cursor = get_db_connection()

    NOW = datetime.now()
    expiration_limit = NOW + kPasswordResetExpirationTime
    cursor.execute("UPDATE users SET password_reset_token = %s , password_reset_token_expiration = %s WHERE email = %s", [
                   generated_token, expiration_limit, email])

    conn.commit()
    conn.close()


def update_user_credentials(email, hashed_password, salt, token):
    conn, cursor = get_db_connection()

    NOW = datetime.now()
    expiration_limit = NOW + kSessionTokenExpirationTime
    cursor.execute("UPDATE users SET password_hash = %s, salt = %s, session_token = %s , session_token_expiration = %s WHERE email = %s", [
                   hashed_password, salt, token, expiration_limit, email])

    conn.commit()
    conn.close()


def stripe_subscription_for_user(userEmail):
    conn, cursor = get_db_connection()
    cursor.execute("""
        SELECT Subscriptions.subscription_id
        FROM users
        JOIN StripeInfo ON users.id = StripeInfo.user_id
        JOIN Subscriptions ON StripeInfo.id = Subscriptions.stripe_info_id
        WHERE users.email = %s AND (Subscriptions.end_date IS NULL OR Subscriptions.end_date > CURRENT_TIMESTAMP)
        AND Subscriptions.start_date < CURRENT_TIMESTAMP
        ORDER BY Subscriptions.start_date DESC
        LIMIT 1
    """, [userEmail])
    print("stripe_subscription_for_user1")
    subscription = cursor.fetchone()
    print("stripe_subscription_for_user2")
    if subscription:
        print("yes subscription")
        return subscription["subscription_id"]
    else:
        print("not subscription")
        return None


def user_has_free_trial(userEmail, free_trial_code):
    conn, cursor = get_db_connection()

    # Get a matching token that hasn't expired yet
    # cursor.execute('''
    #     SELECT id, email
    #     FROM freeTrialAllowlist
    #     WHERE (email = %s OR id NOT IN (
    #         SELECT free_trial_allow_list_id
    #         FROM freeTrialsAccessed
    #         GROUP BY free_trial_allow_list_id
    #         HAVING COUNT(*) >= max_non_email_count
    #     )) AND token = %s AND token_expiration > CURRENT_TIMESTAMP LIMIT 1
    # ''', [userEmail, free_trial_code])
    print("user_has_free_trial1")
    inFreetrialAllowlist = False
    inFreeTrialsAccessedAlready = False
    cursor.execute('''
        SELECT id
        FROM freeTrialAllowlist 
        WHERE email = %s AND token = %s AND token_expiration > CURRENT_TIMESTAMP LIMIT 1
    ''', [userEmail, free_trial_code])
    print("user_has_free_trial2")

    freeTrialAllowlist = cursor.fetchone()
    print("user_has_free_trial3")
    if freeTrialAllowlist:
        print("user_has_free_trial4")
        inFreetrialAllowlist = True
    else:
        print("user_has_free_trial5")
        cursor.execute('''
            SELECT id, max_non_email_count
            FROM freeTrialAllowlist 
            WHERE token = %s AND token_expiration > CURRENT_TIMESTAMP LIMIT 1
        ''', [free_trial_code])
        print("user_has_free_trial6")
        freeTrialAllowlist = cursor.fetchone()
        print("user_has_free_trial7")
        if freeTrialAllowlist:
            print("user_has_free_trial8")
            cursor.execute('''
                SELECT COUNT(*)
                FROM freeTrialsAccessed 
                WHERE free_trial_allow_list_id = %s
            ''', [freeTrialAllowlist["id"]])
            print("user_has_free_trial9")
            freeTrialAllowlistCount = cursor.fetchone()
            print("user_has_free_trial10")
            if freeTrialAllowlistCount["COUNT(*)"] < freeTrialAllowlist["max_non_email_count"]:
                print("user_has_free_trial11")
                inFreetrialAllowlist = True
        if not inFreetrialAllowlist and freeTrialAllowlist:
            cursor.execute('''
                SELECT c.id
                FROM freeTrialsAccessed c JOIN users p ON c.user_id=p.id
                WHERE c.free_trial_allow_list_id = %s AND p.email=%s LIMIT 1
            ''', [freeTrialAllowlist["id"], userEmail])
            freeTrialsAccessed = cursor.fetchone()
            if freeTrialsAccessed:
                inFreeTrialsAccessedAlready = True
    if inFreetrialAllowlist or inFreeTrialsAccessedAlready:
        print("user_has_free_trial12")
        cursor.execute('''
            SELECT gc.id 
            FROM users p 
            JOIN StripeInfo c ON c.user_id=p.id 
            JOIN Subscriptions gc ON gc.stripe_info_id = c.id 
            WHERE p.email = %s
        ''', [userEmail])
        print("user_has_free_trial13")
        subscriptions = cursor.fetchall()
        print("user_has_free_trial14")
        if len(subscriptions) > 0:
            print("user_has_free_trial15")
            conn.close()
            return False
        else:
            print("user_has_free_trial16")
            # Fetch user_id for given email
            cursor.execute(
                'SELECT id FROM users WHERE email = %s', [userEmail])
            print("user_has_free_trial17")
            user_id = cursor.fetchone()
            print("user_has_free_trial18")
            if user_id:
                print("user_has_free_trial19")
                user_id = user_id["id"]
                print("user_has_free_trial20")
                # Insert into freeTrialsAccessed if not exists
                if not inFreeTrialsAccessedAlready:
                    cursor.execute('''
                        INSERT INTO freeTrialsAccessed (free_trial_allow_list_id, user_id)
                        VALUES (%s, %s)
                    ''', [freeTrialAllowlist["id"], user_id])
                    print("user_has_free_trial21")
                    conn.commit()

            conn.close()
            return True
    else:
        print("user_has_free_trial22")
        conn.close()
        return False


def stripe_customer_for_user(userEmail):
    conn, cursor = get_db_connection()
    cursor.execute("""
        SELECT StripeInfo.stripe_customer_id
        FROM StripeInfo
        JOIN users ON StripeInfo.user_id = users.id
        WHERE users.email = %s
    """, [userEmail])
    print("stripe_customer_for_user1")
    stripe_customer_id = cursor.fetchone()
    print("stripe_customer_for_user2")
    if stripe_customer_id:
        print("yes stripe_customer_id")
        return stripe_customer_id["stripe_customer_id"]
    else:
        print("not stripe_customer_id")
        return None


def config_for_payment_tiers(userEmail, newPaymentTier):
    conn, cursor = get_db_connection()
    paidLevel = paid_user_for_user_email_with_cursor(conn, cursor, userEmail)
    conn.close()
    config = ""
    upgrade_to_standard = "bpc_1Ne99AAuWN19h35KDOIITw1Z"
    upgrade_to_premier = "bpc_1Ne99AAuWN19h35K7QhZh9OY"
    downgrade_to_basic = "bpc_1Ne99BAuWN19h35KE5oEz0u9"
    downgrade_to_standard = "bpc_1Ne99BAuWN19h35KnutfEQEw"
    if newPaymentTier == PaidUserStatus.FREE_TIER:
        config = "bpc_1NZVKQAuWN19h35KGJb9PeiP"
    elif paidLevel == PaidUserStatus.BASIC_TIER:
        if newPaymentTier == PaidUserStatus.STANDARD_TIER:
            config = upgrade_to_standard
        elif newPaymentTier == PaidUserStatus.PREMIUM_TIER:
            config = upgrade_to_premier
    elif paidLevel == PaidUserStatus.STANDARD_TIER:
        if newPaymentTier == PaidUserStatus.BASIC_TIER:
            config = downgrade_to_basic
        elif newPaymentTier == PaidUserStatus.PREMIUM_TIER:
            config = upgrade_to_premier
    elif paidLevel == PaidUserStatus.PREMIUM_TIER:
        if newPaymentTier == PaidUserStatus.BASIC_TIER:
            config = downgrade_to_basic
        elif newPaymentTier == PaidUserStatus.STANDARD_TIER:
            config = downgrade_to_standard
    return config


def paid_user_for_user_email_with_cursor(conn, cursor, user_email):
    cursor.execute(
        'SELECT gc.paid_user FROM Subscriptions gc JOIN StripeInfo c ON c.id=gc.stripe_info_id JOIN users p ON p.id=c.user_id WHERE gc.start_date < CURRENT_TIMESTAMP AND (gc.end_date IS NULL OR gc.end_date > CURRENT_TIMESTAMP) AND p.email = %s ORDER BY gc.start_date ASC LIMIT 1', [user_email])
    paidUser = cursor.fetchone()
    if paidUser:
        return paidUser["paid_user"]
    else:
        return 0


def no_subscriptions_with_end_date_null(user_email):
    conn, cursor = get_db_connection()
    cursor.execute(
        "SELECT COUNT(*) FROM Subscriptions gc JOIN StripeInfo c ON c.id=gc.stripe_info_id JOIN users p ON p.id=c.user_id WHERE p.email = %s AND gc.end_date IS NULL", [user_email])
    emailCount = cursor.fetchone()
    cursor.close()
    conn.close()
    if not emailCount or emailCount["COUNT(*)"] == 0:
        return True
    else:
        return False


def add_subscription(subscription, user_id, customer_id, payment_plan, free_trial_end):
    conn, cursor = get_db_connection()
    try:
        cursor.execute("SELECT id FROM StripeInfo WHERE user_id=%s", [user_id])
        stripe_info_id_db = cursor.fetchone()
        if stripe_info_id_db:
            stripe_info_id = stripe_info_id_db["id"]
        else:
            cursor.execute(
                "INSERT INTO StripeInfo (user_id, stripe_customer_id) VALUES (%s, %s)", (user_id, customer_id))
            cursor.execute("SELECT LAST_INSERT_ID()")
            stripe_info_id = cursor.fetchone()["LAST_INSERT_ID()"]

        cursor.execute(
            "SELECT COUNT(*) FROM Subscriptions c JOIN StripeInfo p ON c.stripe_info_id=p.id WHERE p.user_id=%s AND c.start_date < CURRENT_TIMESTAMP AND (c.end_date IS NULL OR c.end_date > CURRENT_TIMESTAMP)", [user_id])
        activePaidSubscriptions = cursor.fetchone()
        if activePaidSubscriptions["COUNT(*)"] == 0:
            if free_trial_end:
                cursor.execute("UPDATE StripeInfo SET anchor_date = %s WHERE user_id = %s", [
                               free_trial_end, user_id])
            else:
                cursor.execute(
                    "UPDATE StripeInfo SET anchor_date = CURRENT_TIMESTAMP WHERE user_id = %s", [user_id])

        if free_trial_end:
            cursor.execute("INSERT INTO Subscriptions (stripe_info_id, subscription_id, paid_user, is_free_trial, end_date) VALUES (%s, %s, %s, %s, %s)", [
                           stripe_info_id, subscription['id'], int(payment_plan), 1, free_trial_end])
            cursor.execute("INSERT INTO Subscriptions (stripe_info_id, subscription_id, paid_user, is_free_trial, start_date) VALUES (%s, %s, %s, %s, %s)", [
                           stripe_info_id, subscription['id'], int(payment_plan), 0, free_trial_end])
        else:
            cursor.execute("INSERT INTO Subscriptions (stripe_info_id, subscription_id, paid_user, is_free_trial) VALUES (%s, %s, %s, %s)", [
                           stripe_info_id, subscription['id'], int(payment_plan), 0])

        conn.commit()
    finally:
        conn.close()


def user_email_for_id(id):
    conn, cursor = get_db_connection()
    cursor.execute("SELECT email FROM users WHERE id = %s", [id])
    email = cursor.fetchone()
    cursor.close()
    conn.close()
    return email["email"]


def delete_subscription(subscription):
    conn, cursor = get_db_connection()

    try:
        print(subscription['id'])
        # print("SELECT p.user_id FROM StripeInfo p JOIN Subscriptions c ON p.id=c.stripe_info_id WHERE c.subscription_id = %s" + subscription['id'])
        cursor.execute("SELECT p.user_id FROM StripeInfo p JOIN Subscriptions c ON p.id=c.stripe_info_id WHERE c.subscription_id = %s LIMIT 1", [
                       subscription['id']])
        # cursor.execute("SELECT user_id FROM StripeInfo WHERE id = (SELECT stripe_info_id FROM Subscriptions WHERE subscription_id = %s)", (subscription['id'],))
        user_id = cursor.fetchone()["user_id"]

        cursor.execute(
            "SELECT is_free_trial FROM Subscriptions WHERE subscription_id = %s AND start_date < CURRENT_TIMESTAMP AND (end_date IS NULL OR end_date > CURRENT_TIMESTAMP) ORDER BY start_date DESC LIMIT 1", (subscription['id'],))
        activeSubscription = cursor.fetchone()
        if activeSubscription["is_free_trial"] == 1:
            # If active subscription if free trial, make end_date of everything that starts after that Subsription NOW
            cursor.execute("""
                UPDATE Subscriptions SET Subscriptions.end_date = CURRENT_TIMESTAMP
                WHERE subscription_id = %s AND start_date < CURRENT_TIMESTAMP AND (end_date IS NULL OR end_date > CURRENT_TIMESTAMP)
            """, [subscription['id']])
        else:
            # Else, make the end_date of the current active subscripion be the next anchor date
            anchor_time = next_anchor_time_for_user_with_cursor(
                conn, cursor, user_id)
            cursor.execute("""
                UPDATE Subscriptions SET Subscriptions.end_date = %s
                WHERE subscription_id = %s AND start_date < CURRENT_TIMESTAMP AND (end_date IS NULL OR end_date > CURRENT_TIMESTAMP)
            """, [anchor_time, subscription['id']])

        conn.commit()
    finally:
        conn.close()


def user_email_for_customer_id(id):
    conn, cursor = get_db_connection()
    cursor.execute(
        "SELECT p.email FROM Subscriptions gc JOIN StripeInfo c ON c.id=gc.stripe_info_id JOIN users p ON p.id=c.user_id WHERE c.stripe_customer_id = %s", [id])
    email = cursor.fetchone()
    cursor.close()
    conn.close()
    return email["email"]


def next_anchor_time_for_user(user_id):
    conn, cursor = get_db_connection()
    next_time = next_anchor_time_for_user_with_cursor(conn, cursor, user_id)
    conn.close()
    return next_time


def next_anchor_time_for_user_with_cursor(conn, cursor, user_id):
    cursor.execute(
        'SELECT c.anchor_date from StripeInfo c JOIN users p ON p.id=c.user_id WHERE p.id = %s', [user_id])
    result = cursor.fetchone()

    if result and result['anchor_date']:
        anchor_date = result['anchor_date']
        now = datetime.now()
        # Create a target date based on current month and anchor day
        try:
            target_date = datetime(now.year, now.month, anchor_date.day,
                                   anchor_date.hour, anchor_date.minute, anchor_date.second)
        except ValueError:  # This will be triggered when the day isn't in the current month
            # If this month doesn't have the same day as the anchor_date, get the last day of this month
            next_month_start = (now.replace(day=1) + relativedelta(months=1)).replace(
                hour=anchor_date.hour, minute=anchor_date.minute, second=anchor_date.second)
            target_date = next_month_start - timedelta(days=1)

        # If today's date is after the target_date, compute the next month's target_date
        if now > target_date:
            try:
                target_date = datetime(now.year, now.month + 1, anchor_date.day,
                                       anchor_date.hour, anchor_date.minute, anchor_date.second)
            except ValueError:
                next_month_start = (now.replace(day=1) + relativedelta(months=2)).replace(
                    hour=anchor_date.hour, minute=anchor_date.minute, second=anchor_date.second)
                target_date = next_month_start - timedelta(days=1)

        return target_date
    else:
        return None


def refresh_credits(user_email):
    conn, cursor = get_db_connection()
    cursor.execute(
        "SELECT credits, credits_updated, id FROM users WHERE email = %s", (user_email,))
    result = cursor.fetchone()

    cursor.execute(
        "SELECT c.anchor_date FROM StripeInfo c JOIN users p ON c.user_id=p.id WHERE p.id = %s", [result["id"]])
    anchorDateDb = cursor.fetchone()
    if (not anchorDateDb) or (not anchorDateDb["anchor_date"]):
        if result["credits"] > 0:
            cursor.execute(
                "UPDATE users SET credits=0, credits_updated=CURRENT_TIMESTAMP WHERE id=%s", [result["id"]])
            conn.commit()
        conn.close()
        print("refresh_credits1")
        return {
            "numCredits": 0
        }

    previousAnchorDate = previous_anchor_time_for_user_with_cursor(
        conn, cursor, result["id"])
    cursor.execute("""
        SELECT S.*
        FROM Subscriptions S
        JOIN StripeInfo SI ON S.stripe_info_id = SI.id
        JOIN users U ON SI.user_id = U.id
        WHERE U.email = %s
        AND S.start_date < CURRENT_TIMESTAMP AND (S.end_date IS NULL OR S.end_date > CURRENT_TIMESTAMP)
        ORDER BY S.start_date DESC
    """, (user_email,))
    subscriptions = cursor.fetchall()
    if len(subscriptions) == 0:
        if result["credits"] > 0:
            cursor.execute(
                "UPDATE users SET credits=0, credits_updated=CURRENT_TIMESTAMP WHERE id=%s", [result["id"]])
            conn.commit()
        conn.close()
        print("refresh_credits2")
        return {
            "numCredits": 0
        }
    else:
        sub = subscriptions[0]
        if sub["is_free_trial"] == 1:
            if not result["credits_updated"] or sub["start_date"] >= result["credits_updated"]:
                numCredits = planToCredits[sub["paid_user"]]
                cursor.execute("UPDATE users SET credits=%s, credits_updated=CURRENT_TIMESTAMP WHERE id=%s", [
                               numCredits, result["id"]])
                conn.commit()
                conn.close()
                print("refresh_credits33")
                return {
                    "numCredits": numCredits
                }
        else:
            if not result["credits_updated"] or previousAnchorDate >= result["credits_updated"]:
                numCredits = planToCredits[sub["paid_user"]]
                cursor.execute("UPDATE users SET credits=%s, credits_updated=CURRENT_TIMESTAMP WHERE id=%s", [
                               numCredits, result["id"]])
                conn.commit()
                conn.close()
                print("refresh_credits3")
                return {
                    "numCredits": numCredits
                }
        conn.commit()
        conn.close()
        print("refresh_credits4")
        return {
            "numCredits": result["credits"]
        }


def previous_anchor_time_for_user_with_cursor(conn, cursor, user_id):
    cursor.execute(
        'SELECT c.anchor_date from StripeInfo c JOIN users p ON p.id=c.user_id WHERE p.id = %s', [user_id])
    result = cursor.fetchone()

    if result and result['anchor_date']:
        # Ensure anchor_date is a datetime object
        if isinstance(result['anchor_date'], datetime):
            anchor_date = result['anchor_date']
        else:
            # Convert to datetime object if necessary
            # You may need to adjust this depending on the expected format of anchor_date
            anchor_date = datetime.strptime(
                result['anchor_date'], '%Y-%m-%d %H:%M:%S')

        now = datetime.now()

        # Create a target date based on current month and anchor day
        try:
            target_date = datetime(now.year, now.month, anchor_date.day,
                                   anchor_date.hour, anchor_date.minute, anchor_date.second)
        except ValueError:  # This will be triggered when the day isn't in the current month
            # If this month doesn't have the same day as the anchor_date, get the last day of the previous month
            target_date = datetime(now.year, now.month, 1, anchor_date.hour,
                                   anchor_date.minute, anchor_date.second) - relativedelta(days=1)

        # If the target date is still in the future, subtract a month
        if target_date > now:
            target_date = target_date - relativedelta(months=1)
        return target_date
    else:
        return None


def view_user(user_email):
    conn, cursor = get_db_connection()
    cursor.execute(
        'SELECT * FROM users WHERE email = %s LIMIT 1', [user_email])
    user = cursor.fetchone()
    # if user["credits_updated"]:
    #     credits_refresh_date = user["credits_updated"] + relativedelta(months=1)
    #     credits_refresh_str = credits_refresh_date.strftime('%Y-%m-%d')
    # else:
    #     credits_refresh_str = None
    cursor.execute(
        'SELECT anchor_date FROM StripeInfo WHERE user_id = %s', [user["id"]])
    stripeInfo = cursor.fetchone()
    credits_refresh_str = None
    if stripeInfo and stripeInfo["anchor_date"]:
        credits_refresh_date = next_anchor_time_for_user_with_cursor(
            conn, cursor, user["id"])
        if credits_refresh_date:
            credits_refresh_str = credits_refresh_date.strftime('%Y-%m-%d')

    paidLevel = paid_user_for_user_email_with_cursor(conn, cursor, user_email)
    cursor.execute(
        'SELECT c.paid_user FROM Subscriptions c JOIN StripeInfo p ON p.id=c.stripe_info_id WHERE p.user_id = %s AND c.end_date IS NULL AND c.start_date > CURRENT_TIMESTAMP ORDER BY c.start_date DESC LIMIT 1', [user["id"]])
    next_plan = None
    nextPlanDb = cursor.fetchone()
    if nextPlanDb:
        next_plan = nextPlanDb["paid_user"]

    end_date = end_date_for_user_email_with_cursor(conn, cursor, user_email)
    if end_date:
        end_date = end_date.strftime("%Y-%m-%d")

    conn.close()
    return jsonify({
        "id": user["id"],
        "name": user["person_name"],
        "email": user["email"],
        "paid_user": paidLevel,
        "next_plan": next_plan,
        "end_date": end_date,
        "credits_refresh": credits_refresh_str,
        "profile_pic_url": user["profile_pic_url"]
    })


def end_date_for_user_email_with_cursor(conn, cursor, user_email):
    cursor.execute(
        'SELECT gc.end_date FROM Subscriptions gc JOIN StripeInfo c ON c.id=gc.stripe_info_id JOIN users p ON p.id=c.user_id WHERE gc.start_date < CURRENT_TIMESTAMP AND (gc.end_date IS NULL OR gc.end_date > CURRENT_TIMESTAMP) AND p.email = %s ORDER BY gc.start_date ASC LIMIT 1', [user_email])
    paidUser = cursor.fetchone()
    if paidUser:
        return paidUser["end_date"]
    else:
        return None
# print(add_user_detail_byID(1000, 'hhhh', 'ggg', 'ggg'))

# def create_user_from_credentials(email, password_hash, salt, session_token):
#     conn, cursor = get_db_connection()
#     NOW = datetime.now()
#     expiration_limit = NOW + kSessionTokenExpirationTime
#     cursor.execute('INSERT INTO users (email, password_hash, session_token, session_token_expiration, salt) VALUES (%s, %s, %s, %s, %s)', [
#                    email, password_hash, session_token, expiration_limit, salt])
#     conn.commit()
#     conn.close()

def add_newsletter(user_id, title, theme, idea_id, backgroundColor, character_name,  data):
    conn, cursor = get_db_connection()
    # print('step1')
    if check_user_by_id(user_id):
        # print('step2')
            # Update the existing record
            # Insert a new record
        cursor.execute("INSERT INTO AllNewsletterInfo (user_id, title, theme, idea_id, backgroundColor, character_name, data) VALUES (%s, %s, %s, %s, %s, %s, %s)", (user_id, title, theme, idea_id, backgroundColor, character_name, data))
        # print("step3")
        conn.commit()
        conn.close()
        return True
    else:
        return 'user not exist'
    
def get_all_newsletter(user_id):
    conn, cursor = get_db_connection()
    # print('step1')
    if check_user_by_id(user_id):
        # print('step2')
            # Update the existing record
            # Insert a new record
        query = "SELECT id, title, theme, idea_id, backgroundColor, character_name, data FROM AllNewsletterInfo WHERE user_id = %s"
        cursor.execute(query, (user_id,))
        newsletters = cursor.fetchall()
        # print("step3")
        conn.commit()
        conn.close()
        return newsletters
    else:
        return 'user not exist'
    
def delete_newsletter_byId(user_id, id):
    conn, cursor = get_db_connection()
    # print('step1')
    if check_user_by_id(user_id):
        # print('step2')
            # Update the existing record
            # Insert a new record
        query = "DELETE FROM AllNewsletterInfo WHERE user_id = %s AND id = %s"
        cursor.execute(query, (user_id, id))
        conn.commit()
        conn.close()
        return {'message': 'Newsletter deleted successfully'}
    else:
        return 'user not exist'
    
def add_ideas_withId(user_id, data, subIdea):
    conn, cursor = get_db_connection()
    if check_user_by_id(user_id):
        cursor.execute("INSERT INTO AllIdeas (user_id, title, subIdea) VALUES (%s, %s, %s)", (user_id, data, subIdea))
        # print("step3")
        conn.commit()
        inserted_id = cursor.lastrowid
        conn.close()
        return inserted_id
    else:
        return 'user not exist'
    
def get_all_Ideas(user_id):
    conn, cursor = get_db_connection()
    # print('step1')
    if check_user_by_id(user_id):
        # print('step2')
            # Update the existing record
            # Insert a new record
        query = "SELECT id, title, used, subIdea FROM AllIdeas WHERE user_id = %s"
        cursor.execute(query, (user_id,))
        newsletters = cursor.fetchall()
        # print("step3")
        conn.commit()
        conn.close()
        return newsletters
    else:
        return 'user not exist'
    
def update_Ideas_byId(user_id, id, title, used):
    conn, cursor = get_db_connection()
    cursor.execute("UPDATE AllIdeas SET title = %s , used = %s WHERE user_id = %s AND id = %s", [
                   title, used, user_id, id])
    conn.commit()
    conn.close()
    return True
    
def delete_Ideas_byId(user_id, id):
    conn, cursor = get_db_connection()
    if check_user_by_id(user_id):
        cursor.execute("DELETE FROM AllIdeas WHERE user_id = %s AND id = %s", (user_id, id))
        # print("step3")
        conn.commit()
        conn.close()
        return True
    else:
        return 'user not exist'
