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
from flask_mail import Message
from email.mime.text import MIMEText

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_db_connection():
    conn = mysql.connector.connect(
        user='root',
        password='1165205407',
        host='localhost',
        port=3306,
        database='newsLetter'
    )
    return conn, conn.cursor(dictionary=True)

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

#create a user

def create_user():
    conn, cursor = get_db_connection()
    NOW = datetime.now()
    cursor.execute('INSERT INTO users (company_name, news_letter_detail, industry) VALUES (NULL, NULL, NULL);')
    conn.commit()
    conn.close()

def check_user_by_id(id):
    conn, cursor = get_db_connection()
    cursor.execute('SELECT * FROM users WHERE id=%s;', [id])
    user = cursor.fetchone()
    conn.commit()
    conn.close()
    if(user):
        return True
    return False

# print(check_user_by_id(1))

def add_user_detail_byID(id, companyName, newsLetterDetail, industry):
    conn, cursor = get_db_connection()
    if(check_user_by_id(id)):
        cursor.execute('UPDATE users SET company_name = %s, news_letter_detail = %s, industry = %s WHERE id = %s;', (companyName, newsLetterDetail, industry, id))
    else:
        return 'user not exist'
    conn.commit()
    conn.close()
    return True

# print(add_user_detail_byID(1000, 'hhhh', 'ggg', 'ggg'))

# def create_user_from_credentials(email, password_hash, salt, session_token):
#     conn, cursor = get_db_connection()
#     NOW = datetime.now()
#     expiration_limit = NOW + kSessionTokenExpirationTime
#     cursor.execute('INSERT INTO users (email, password_hash, session_token, session_token_expiration, salt) VALUES (%s, %s, %s, %s, %s)', [
#                    email, password_hash, session_token, expiration_limit, salt])
#     conn.commit()
#     conn.close()
