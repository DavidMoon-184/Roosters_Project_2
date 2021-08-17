import json
import pandas as pd

df = pd.read_csv("us_foreign_aid.csv")

def translate(df):
    result = {}
    for i, row in df.iterrows():
        if row["US Category Name"] not in result:
            result[row["US Category Name"]] = {}
            result[row["US Category Name"]].update({
                row["Fiscal Year"]:row["current_amount"]
            })
        else:
            result[row["US Category Name"]].update({
            row["Fiscal Year"]:row["current_amount"]
            })

    return result

print(translate(df))

with open("us_foreign_aid.json", "w") as f:
    json.dump(translate(df), f)