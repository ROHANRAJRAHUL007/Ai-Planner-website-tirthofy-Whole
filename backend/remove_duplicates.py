from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

print("MONGO_URL =", os.getenv("MONGO_URL"))

client = MongoClient(os.getenv("MONGO_URL"))

db = client["tripplanner"]
collection = db["temples"]

seen = set()
deleted = 0

for doc in collection.find():
    key = (
        doc.get("name", "").strip().lower(),
        doc.get("state", "").strip().lower(),
        doc.get("location", "").strip().lower(),
    )

    if key in seen:
        collection.delete_one({"_id": doc["_id"]})
        deleted += 1
    else:
        seen.add(key)

print(f"Deleted {deleted} duplicate documents.")
