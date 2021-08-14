from flask import Flask, render_template
from flask.json import jsonify
from datetime import datetime
from flask_cors import CORS

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
import json

# Create an instance of our Flask app.
app = Flask(__name__)
CORS(app)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.poverty_db

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/posts')
def posts():
    return render_template('posts.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api')
def get_data():
    try:
        q = db.poverty.find({})
        docs = [doc for doc in q]
        print(len(docs))
        return jsonify(docs)
    except Exception as e:
        return jsonify({"message":e})
        

if __name__ == "__main__":
    app.run(host='10.5.0.2', port=8080, debug=True, threaded=True)
