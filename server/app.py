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
    cursor.execute("SELECT * FROM massive_data")
    for row in cursor.fetchall():
        result.append({"variant": row[0], "gene": row[1], "classification": row[2], "frequency": row[3]})
#    connection.close()
    response = jsonify({'results': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




