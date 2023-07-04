import subprocess
import json
import time
from flask import *
from flask_cors import CORS, cross_origin
from encrypt import AesEncryption
from waitress import serve
import re
from vault import Vault
import os

encrypt = AesEncryption()
app     = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

with open('./setup.json', 'r') as json_file:
    json_data = json.load(json_file)
path          = json_data['path']
host          = json_data['host']
port          = json_data ['port']
fullchain     = json_data['certificate']['fullchain']
privkey       = json_data['certificate']['privkey']

@app.route('/fetch_file', methods=['POST', 'PUT'])
@cross_origin()
def fetch_file():
    try:        
        recv_data      = str(request.data.decode("utf-8"))
        json_recv_data = json.loads(recv_data)
        vault          = Vault()
        #print(json_recv_data)
        result = vault.url_fetch_file(json_recv_data['url'], json_recv_data['extension'])
        return jsonify({"file_name": result["file_name"], "file_download": result["file_download"]}), 200

    except Exception as error:
        print("Fetch file error: " + str(error))
        return str(error), 500

@app.route('/fetch_data', methods=['POST', 'PUT'])
@cross_origin()
def fetch_data():
    try:        
        recv_data      = str(request.data.decode("utf-8"))
        json_recv_data = json.loads(recv_data)
        vault          = Vault()
        
        return jsonify(vault.url_fetch_data(json_recv_data['url'])), 200

    except Exception as error:
        print("Fetch data error: " + str(error))
        return str(error), 500


@app.route('/download', methods=['POST', 'PUT'])
@cross_origin()
def download():
    try:
        recv_data      = str(request.data.decode("utf-8"))
        json_recv_data = json.loads(recv_data)
        file_name      = json_recv_data['file_name']
        
        return send_file(os.path.join(path, json_recv_data['file_name']), as_attachment=True, attachment_filename=file_name), 200

    except Exception as error:
        print("Download file error: " + str(error))
        return str(error), 500

if __name__ == "__main__":
    app.run(host=host, port=port, ssl_context=(fullchain, privkey))
