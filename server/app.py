from flask import Flask, request, jsonify, after_this_request
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
CORS(app)

df = pd.read_json("data.json")

def save_to_db(data):
    global df
    data_point = pd.DataFrame(data)
    df = pd.concat([df, data_point], axis=0)
    print(df)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/json', methods=['GET', 'POST'])
def json():
    if request.method == 'GET':
        print(df)
        return {'status': 'sucess',
                'data': df.T.to_json()}
    else:
        try:
            data = request.get_json()
            save_to_db(data['body'])
            return {'status': 'success'}
        except Exception as e:
            return {'status': 'error', 'message': str(e)}

@app.after_request
def add_access_headers(resp):
    resp.headers['Access-Control-Allow-Credentials']='true'
    return resp


if __name__ == '__main__':
    app.run(host='localhost', port=8989, debug=True)

