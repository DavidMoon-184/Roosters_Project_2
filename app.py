from flask import Flask, render_template
from flask.json import jsonify
from datetime import datetime
from flask_cors import CORS

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
import json
import pandas as pd

# Create an instance of our Flask app.
app = Flask(__name__)
CORS(app)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/posts')
def posts():
    return render_template('posts.html')

@app.route('/primary_school')
def primary_school():
    return render_template('primary_school.html')

@app.route('/poverty_rate')
def poverty_rate():
    return render_template('poverty_rate.html')

@app.route('/birth_rate')
def birth_rate():
    return render_template('birth_rate.html')

@app.route('/api')
def get_data():
    db = client.poverty_db
    try:
        q = db.poverty.find({})
        docs = [doc for doc in q]
        print(len(docs))
        return jsonify(docs)
    except Exception as e:
        return jsonify({"message":e})

@app.route('/api/primary-school')
def get_primary_school():
    db = client.primary_school_db
    try:
        q = db.primary_school.find({})
        docs = [doc for doc in q]
        print(len(docs))
        return jsonify(docs)
    except Exception as e:
        return jsonify({"message":e})

@app.route('/api/primary-completion')
def get_primary_completion():
    db = client.primary_completion_db
    try:
        q = db.primary_completion.find({})
        docs = [doc for doc in q]
        print(len(docs))
        return jsonify(docs)
    except Exception as e:
        return jsonify({"message":e})
        

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)
