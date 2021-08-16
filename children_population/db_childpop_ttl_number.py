# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
import pandas as pd

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.childpop_num_db
# Drops collection if available to remove duplicates
db.childpop_num.drop()

# Creates a collection in the database and inserts two documents
df = pd.read_csv('https://raw.githubusercontent.com/DavidMoon-184/Roosters_Project_2/main/FLASK/datasets/population_aged_0_14_years_total_number--by--global--time.csv')

def insert_childpop_num_db():
    for i, row in df.iterrows():
        doc = {
            '_id': f'doc_{i}',
            'time': row["time"],
            'population_aged_0_14_years_total_number': row["population_aged_0_14_years_total_number"]               
        }
        db.childpop_num.insert_one(doc)

    print("collection created")

insert_childpop_num_db()