# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
import pandas as pd

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.primary_completion_db
# Drops collection if available to remove duplicates
db.primary_completion.drop()

# Creates a collection in the database and inserts two documents
df_primary_completion = pd.read_csv('https://raw.githubusercontent.com/DavidMoon-184/Roosters_Project_2/main/FLASK/datasets/primary_completion_world.csv')

def insert_db():
    for i, row in df_primary_completion.iterrows():
        doc = {
            '_id': f'doc_{i}',
            'Country Name': row["Country Name"],
            'Country Code': row["Country Code"],
            'time': row["time"],
            'primary_completion_rate_total_percent_of_relevant_age_group': row["primary_completion_rate_total_percent_of_relevant_age_group"],
            'Numeric code': row["Numeric code"]
        }
        db.primary_completion.insert_one(doc)

    print("collection created")

insert_db()