from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URL"))

db = client["tripplanner"]
collection = db["temples"]

result = collection.update_many(
    {"img_url": {"$exists": False}},
    {
        "$set": {
            "img_url": ""
        }
    }
)

print(f"Updated {result.modified_count} documents")
