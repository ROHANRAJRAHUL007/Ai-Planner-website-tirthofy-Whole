from datetime import datetime

from bson import ObjectId
from bson.errors import InvalidId

from app.db.collections import chats_collection


def _serialize_chat(chat):
    if not chat:
        return None

    chat["_id"] = str(chat["_id"])
    return chat


async def save_chat(email, question, answer):
    result = await chats_collection.insert_one(
        {
            "userEmail": email,
            "title": question[:50],
            "messages": [
                {
                    "role": "user",
                    "content": question,
                },
                {
                    "role": "assistant",
                    "content": answer,
                },
            ],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow(),
        }
    )

    return str(result.inserted_id)


async def append_chat_messages(chat_id, question, answer):
    try:
        object_id = ObjectId(chat_id)
    except InvalidId:
        return None

    result = await chats_collection.update_one(
        {"_id": object_id},
        {
            "$push": {
                "messages": {
                    "$each": [
                        {
                            "role": "user",
                            "content": question,
                        },
                        {
                            "role": "assistant",
                            "content": answer,
                        },
                    ]
                }
            },
            "$set": {
                "updatedAt": datetime.utcnow(),
            },
        },
    )

    if result.matched_count == 0:
        return None

    return chat_id


async def find_user_chats(email):
    chats = []

    cursor = chats_collection.find({"userEmail": email}).sort("updatedAt", -1)

    async for chat in cursor:
        chats.append(_serialize_chat(chat))

    return chats


async def find_chat_by_id(chat_id):
    try:
        object_id = ObjectId(chat_id)
    except InvalidId:
        return None

    chat = await chats_collection.find_one({"_id": object_id})
    return _serialize_chat(chat)
