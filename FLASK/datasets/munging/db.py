# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
import pandas as pd

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.poverty_db
# Drops collection if available to remove duplicates
db.poverty.drop()

# Creates a collection in the database and inserts two documents
df = pd.read_csv('https://raw.githubusercontent.com/DavidMoon-184/Roosters_Project_2/main/FLASK/datasets/ddf--datapoints--extreme_poverty_percent_people_below_190_a_day--by--geo--time.csv')

def insert_db():
    for i, row in df.iterrows():
        doc = {
            '_id': f'doc_{i}',
            'geo': row["geo"],
            'time': row["time"],
            'poverty_percent': row["extreme_poverty_percent_people_below_190_a_day"]
    
        }
        db.poverty.insert_one(doc)

    print("collection created")

insert_db()