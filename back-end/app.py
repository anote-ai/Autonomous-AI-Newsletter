import flask
from flask import Flask, jsonify, request, abort, redirect
from flask.wrappers import Response
import json
from flask_cors import CORS, cross_origin
from api_endpoints.userDetail.handler import detail_update_Handler, detail_get_Handler
from constants.global_constants import kSessionTokenExpirationTime
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token, decode_token, JWTManager
from flask_mail import Mail
import requests
from pip._vendor import cachecontrol
import os
import pathlib
from google_auth_oauthlib.flow import Flow
from google.oauth2 import id_token
import google.auth.transport.requests
import jwt
from functools import wraps
from jwt import InvalidTokenError
from urllib.parse import urlparse
from api_endpoints.login.handler import LoginHandler, SignUpHandler, ForgotPasswordHandler, ResetPasswordHandler, getVerificationHandler, checkVerificationHandler
from api_endpoints.payments.handler import CreateCheckoutSessionHandler, CreatePortalSessionHandler, StripeWebhookHandler
from database.db import create_user_if_does_not_exist 
from api_endpoints.view_user.handler import ViewUserHandler
from api_endpoints.gptData.hndler import getGPTData, getIdeasFromGPT, deleteIdeas, getAllIdeas, updateIdeas, getIntro, getStory, getArticle
from api_endpoints.newsLetter.handler import setNewsletter, getAllNewsletter, deleteNewsletter
from database.db_auth import extractUserEmailFromRequest, is_session_token_valid, user_id_for_email, profile_lists_access_invalid, profiles_multi_access_invalid, sequences_access_invalid, sequence_texts_access_invalid, verifyAuthForSearch, verifyAuthForPaymentsTrustedTesters, verifyAuthForCheckoutSession, verifyAuthForPortalSession, sequence_texts_multi_access_invalid


app = Flask(__name__)

config = {
  'ORIGINS': [
    'http://localhost:3000',  # React
    'https://nwsltr.anote.ai', # Frontend prod URL,
    'https://newsletter.anote.ai', # Frontend prod URL,
  ],
}
CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)

# CORS(app, resources={
#      r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)

app.secret_key = '6cac159dd02c902f822635ee0a6c3078'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config["JWT_SECRET_KEY"] = "6cac159dd02c902f822635ee0a6c3078"
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = kSessionTokenExpirationTime
app.config["JWT_TOKEN_LOCATION"] = "headers"
app.config.from_object(__name__)

jwt_manager = JWTManager(app)
app.jwt_manager = jwt_manager

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'vidranatan@gmail.com'
app.config['MAIL_PASSWORD'] = 'fhytlgpsjyzutlnm'
app.config['MAIL_DEFAULT_SENDER'] = 'vidranatan@gmail.com'
mail = Mail(app)

# host = 'pn7o2o2mdglj1umeufk8.us-east-1.aoss.amazonaws.com'
# region = 'us-east-1'
# service = 'aoss'
# access_key = 'AKIASDTPFOZIGNOYL6RM'
# secret_key = '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'

# session = boto3.Session(
#       aws_access_key_id=access_key,
#       aws_secret_access_key=secret_key
# )

# credentials = session.get_credentials()
# auth = AWSV4SignerAuth(credentials, region, service)


def jwt_or_session_token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs)
        # print("in jwt_or_session_token_required")
        # try:
        #     # Check if JWT token is present and valid
        #     print("in jwt_or_session_token_required2")
        #     verify_jwt_in_request()
        #     print("in jwt_or_session_token_required3")
        #     # If JWT token is valid, return the decorated function
        #     return fn(*args, **kwargs)
        # except:
        #     print("in jwt_or_session_token_required4")
        #     # If JWT token verification fails, check for the presence of a session token
        #     auth_header = request.headers.get('Authorization')
        #     if auth_header and auth_header.startswith('Bearer '):
        #         print("in jwt_or_session_token_required5")
        #         session_token = auth_header.split(' ')[1]
        #         print("in jwt_or_session_token_required55")
        #         print(session_token)

        #         # Add your logic to validate the session token against the database
        #         if is_session_token_valid(session_token):
        #             print("in jwt_or_session_token_required6")
        #             # If session token is valid, return the decorated function
        #             return fn(*args, **kwargs)

        #     # If neither JWT token nor session token is present or valid, return an error message or handle it as needed
        #     return "Unauthorized", 401
    return wrapper


@app.route('/health', methods=['GET'])
def health_check():
    return "Healthy", 200


# Auth
# this is to set our environment to https because OAuth 2.0 only supports https environments
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

# GOOGLE_CLIENT_ID = "261908856206-u67q6mdasnf7sflc49d6cl4panmnlfnf.apps.googleusercontent.com"  #enter your client id you got from Google console
# GOOGLE_CLIENT_ID = "503188717568-epgsohj91lnf6h7k4tu85aq17u1k3fr9.apps.googleusercontent.com" # Sababa final prod key
GOOGLE_CLIENT_ID = "180416107291-5bosgfv0d8ko33g5bujc1isup5kdvn40.apps.googleusercontent.com"
# set the path to where the .json file you got Google console is
client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(  # Flow is OAuth 2.0 a class that stores all the information on how we want to authorize our users
    client_secrets_file=client_secrets_file,
    # scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/gmail.send", "openid"],  #here we are specifing what do we get after the authorization
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email",
            "openid"],  # here we are specifing what do we get after the authorization
    # redirect_uri="http://localhost:5000/callback"  #and the redirect URI is the point where the user will end up after the authorization
    # redirect_uri="http://127.0.0.1:3000"  #and the redirect URI is the point where the user will end up after the authorization
)
# postmessage


@app.route("/login")  # the page where the user can login
@cross_origin(supports_credentials=True)
def login():
    if request.args.get('email') and len(request.args.get('email')) > 0:
        # print(request.args.get('email'), request.args.get('email'))
        return LoginHandler(request)
    else:
        o = urlparse(request.base_url)
        netloc = o.netloc
        scheme = "https"
        if netloc == "localhost:5000" or netloc == "127.0.0.1:5000":
            scheme = "http"
        else:
            netloc = "nwsltrapi.anote.ai"
        flow.redirect_uri = f'{scheme}://{netloc}/callback'
        # flow.redirect_uri = f'https://sababaapi.anote.ai/callback'

        state_dict = {
            "redirect_uri": flow.redirect_uri
        }

        if request.args.get('product_hash'):
            print("during checking product hash")
            state_dict["product_hash"] = request.args.get('product_hash')
        if request.args.get('free_trial_code'):
            print("during checking free_trial_code")
            state_dict["free_trial_code"] = request.args.get('free_trial_code')

        state = jwt.encode(
            state_dict, app.config["JWT_SECRET_KEY"], algorithm="HS256")

        # Generate the authorization URL and use the JWT as the state value
        authorization_url, _ = flow.authorization_url(state=state)

        response = Response(
            response=json.dumps({'auth_url': authorization_url}),
            status=200,
            mimetype='application/json'
        )
        response.headers.add('Access-Control-Allow-Headers',
                             'Origin, Content-Type, Accept')
        return response


# this is the page that will handle the callback process meaning process after the authorization
@app.route("/callback")
@cross_origin(supports_credentials=True)
def callback():
    try:
        decrypted_token = jwt.decode(
            request.args["state"], app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
        product_hash = decrypted_token.get('product_hash', None)
        free_trial_code = decrypted_token.get('free_trial_code', None)
    except jwt.exceptions.InvalidSignatureError:
        abort(500)
    flow.redirect_uri = decrypted_token["redirect_uri"]
    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(
        session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    # default_referrer = "http://localhost:3000"
    default_referrer = "https://nwsltr.anote.ai"
    # default_referrer = "http://localhost:3000"
    user_id = create_user_if_does_not_exist(id_info.get("email"), id_info.get(
        "sub"), id_info.get("name"), id_info.get("picture"))

    access_token = create_access_token(identity=id_info.get("email"))
    refresh_token = create_refresh_token(identity=id_info.get("email"))
    productGetParam = ""
    if product_hash is not None:
        productGetParam = "&" + "product_hash=" + product_hash
    freeTrialCodeGetParam = ""
    if free_trial_code is not None:
        freeTrialCodeGetParam = "&" + "free_trial_code=" + free_trial_code

    print("request.referrer")
    print(request.referrer)
    # response = redirect(
    #   (request.referrer or default_referrer) +
    #   "?accessToken=" + access_token + "&"
    #   "refreshToken=" + refresh_token
    # )
    response = redirect(
        (default_referrer) +
        "?accessToken=" + access_token + "&"
        "refreshToken=" + refresh_token + productGetParam + freeTrialCodeGetParam
    )
    return response


@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    # Get the JWT refresh token from the Authorization header
    authorization_header = request.headers["Authorization"]
    authorization_header_parts = authorization_header.split(" ")

    if len(authorization_header_parts) >= 2:
        jwt_token = authorization_header_parts[1]

        try:
            # Try to decode the JWT
            decoded_jwt = decode_token(jwt_token)

            # If the JWT is valid, generate a new JWT with a refreshed expiration time
            access_token = create_access_token(identity=decoded_jwt["sub"])

            # Return the new JWT in the response
            return jsonify({"accessToken": access_token}), 200
        except InvalidTokenError:
            # If the JWT is invalid, return an error
            return jsonify({"error": "Invalid JWT"}), 401
    else:
        # If the Authorization header does not have enough elements, return an error
        return jsonify({"error": "Invalid Authorization header"}), 401


@app.route("/signUp", methods=["POST"])
@cross_origin(supports_credentials=True)
def signUp():
    return SignUpHandler(request)


@app.route("/forgotPassword", methods=["POST"])
@cross_origin(supports_credentials=True)
def forgotPassword():
    return ForgotPasswordHandler(request, mail)


@app.route("/resetPassword", methods=["POST"])
@cross_origin(supports_credentials=True)
def resetPassword():
    return ResetPasswordHandler(request)

@app.route("/getVerification", methods=["POST"])
@cross_origin(supports_credentials=True)
def getVerification():
    return getVerificationHandler(request, mail)


@app.route("/checkVerification", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkVerification():
    return checkVerificationHandler(request)


@app.route('/createCheckoutSession', methods=['POST'])
@jwt_or_session_token_required
def create_checkout_session():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    verifyAuthForCheckoutSession(user_email, mail)
    return CreateCheckoutSessionHandler(request, user_email)


@app.route('/createPortalSession', methods=["POST"])
@jwt_or_session_token_required
def customer_portal():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    print("got email customer_portal")
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        print("no verifyAuthForPaymentsTrustedTesters")
        abort(401)
    verifyAuthForPortalSession(request, user_email, mail)
    return CreatePortalSessionHandler(request, user_email)



# @app.route('/viewUnlockedProfiles', methods = ['POST'])
# @jwt_or_session_token_required
# def ViewUnlockedProfiles():
#   try:
#     user_email = extractUserEmailFromRequest(request)
#   except InvalidTokenError:
#     # If the JWT is invalid, return an error
#     return jsonify({"error": "Invalid JWT"}), 401
#   return jsonify(ViewUnlockedProfilesHandler(request, user_email))

@app.route('/getUserDetail')
@jwt_or_session_token_required
def getUserDetail():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print("getIn")
    return detail_get_Handler(request, user_email)

@app.route('/setUserDetail', methods=['POST'])
@jwt_or_session_token_required
def setUserDetail():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    res = detail_update_Handler(request, user_email)
    if (res == True):
        response_data = {"message": "add user detail success"}
        response = jsonify(response_data)
        response.status_code = 200
        return response
    else:
        # print("res",res)
        response_data = {"message": res}
        response = jsonify(response_data)
        response.status_code = 400
        return response
    # return CreateCheckoutSessionHandler(request, user_email)
    # print("get in")
    # print("request",request)
    # print("request.json", request.json)
    # res = SignUpHandler(request)
    # if (res == True):
    #     response_data = {"message": "add user detail success"}
    #     response = jsonify(response_data)
    #     response.status_code = 200
    #     return response
    # else:
    #     response_data = {"message": res}
    #     response = jsonify(response_data)
    #     response.status_code = 400
    #     return response
    
@app.route('/viewUser', methods = ['GET'])
@jwt_or_session_token_required
def ViewUser():
  try:
    user_email = extractUserEmailFromRequest(request)
  except InvalidTokenError:
    # If the JWT is invalid, return an error
    return jsonify({"error": "Invalid JWT"}), 401
  return ViewUserHandler(request, user_email)

# @app.route('/blog/<blog_id>')
# def blog_id(blog_id):
#     print(blog_id)
#     return "Hi"

# @app.route('/book')
# def getPage():
#     page = request.args.get("page", default=1, type=int)
#     return f"page:{page}"

# @app.route("/class")
# def classReturn():
#     user = {"name" :"daniel", "age" :18}
#     return flask.jsonify(user)

@app.route('/run-script', methods = ['POST'])
@jwt_or_session_token_required
def queryGPTData(): 
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    # try:
    #     user_email = extractUserEmailFromRequest(request)
    # except InvalidTokenError:
    #     # If the JWT is invalid, return an error
    #     return jsonify({"error": "Invalid JWT"}), 401
    # if not verifyAuthForPaymentsTrustedTesters(user_email):
    #     abort(401)
    # return detail_get_Handler(request, user_email)
    # if (request.args.get('key_word') and not request.args.get('key_word').isspace()):
    try:
        return getGPTData(request, user_email)
    except:
        response_data = {"message": "input should not be empty or space only"}
        response = jsonify(response_data)
        response.status_code = 400
        return response
    
@app.route('/setNewsletterData', methods = ['POST'])
@jwt_or_session_token_required
def setNewsletterData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    res = setNewsletter(request, user_email)
    if (res == True):
        response_data = {"message": "add Newsletter success"}
        response = jsonify(response_data)
        response.status_code = 200
        return response
    else:
        # print("res",res)
        response_data = {"message": res}
        response = jsonify(response_data)
        response.status_code = 400
        return response
    
@app.route('/getNewsletterData', methods = ['GET'])
@jwt_or_session_token_required
def getAllNewsletterData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    return getAllNewsletter(user_email)

@app.route('/deleteNewsletterData', methods = ['POST'])
@jwt_or_session_token_required
def deleteNewsletterData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    return deleteNewsletter(request, user_email)

@app.route('/getIdeasFromGPT', methods = ['GET'])
@jwt_or_session_token_required
def getIdeasFromGPTData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    return getIdeasFromGPT(request, user_email)

@app.route('/getAllIdeasData', methods = ['GET'])
@jwt_or_session_token_required
def getAllIdeasData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    return getAllIdeas(user_email)

@app.route('/updateIdeasData', methods = ['POST'])
@jwt_or_session_token_required
def updateIdeasData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    return updateIdeas(request, user_email)

@app.route('/deleteIdeasData', methods = ['POST'])
@jwt_or_session_token_required
def deleteIdeasData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    return deleteIdeas(request, user_email)

@app.route('/getIntroData', methods = ['GET'])
@jwt_or_session_token_required
def getIntroData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    # print(request.json)
    return getIntro(request, user_email)

@app.route('/getStoryData', methods = ['POST'])
@jwt_or_session_token_required
def getStoryData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    print("in the funcrion")
    return getStory(request, user_email)

@app.route('/getArticleData', methods = ['POST'])
@jwt_or_session_token_required
def getArticleData():
    try:
        user_email = extractUserEmailFromRequest(request)
    except InvalidTokenError:
        # If the JWT is invalid, return an error
        return jsonify({"error": "Invalid JWT"}), 401
    if not verifyAuthForPaymentsTrustedTesters(user_email):
        abort(401)
    print("in the funcrion")
    return getArticle(request, user_email)

if __name__ == '__main__':
    app.run(port=5000)
