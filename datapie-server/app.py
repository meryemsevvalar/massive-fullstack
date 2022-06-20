#TO RUN THIS CODE
#IN COMMAND LINE TYPE
#flask run -h localhost -p 3003



import pyodbc
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS 

app = Flask(__name__)


CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})

connection = pyodbc.connect('DRIVER={SQL SERVER}; SERVER=MERYEM; DATABASE=Massive; TRUSTED_CONNECTION=yes;')


@app.route('/', methods=['GET'])
def get_data():
    result = []
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM classifications")
    for row in cursor.fetchall():
        result.append({"classification": row[0]})
#    connection.close()
    response = jsonify({'results': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


