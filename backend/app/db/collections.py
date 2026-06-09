from .mongodb import db

users_collection = db["users"]
trips_collection = db["trips"]
stories_collection = db["stories"]

temple_collection = db["temples"]
semantic_cache_collection = db["semantic_cache"]
