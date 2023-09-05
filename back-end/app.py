import flask
from flask import Flask, jsonify, request
import json
from flask_cors import CORS, cross_origin
from api_endpoints.user.handler import SignUpHandler

app = Flask(__name__)

config = {
  'ORIGINS': [
    'http://localhost:3000'
  ],
}
CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/setUserDetail', methods = ['POST'])
def setUserDetail():
    # print("get in")
    # print("request",request)
    # print("request.json", request.json)
    res = SignUpHandler(request)
    if(res == True):
        response_data = {"message": "add user detail success"}
        response = jsonify(response_data)
        response.status_code = 200
        return response
    else:
        response_data = {"message": res}
        response = jsonify(response_data)
        response.status_code = 400
        return response
    

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

if __name__ == '__main__':
    app.run(debug=True)
