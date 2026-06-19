from datetime import datetime

from app.db.collections import chats_collection


async def save_chat(
        email,
        question,
        answer
):

    result = await chats_collection.insert_one(
        {
            "userEmail": email,

            "title": question[:50],

            "messages": [

                {
                    "role": "user",
                    "content": question
                },

                {
                    "role": "assistant",
                    "content": answer
                }
            ],

            "createdAt": datetime.utcnow()
        }
    )

    return str(
        result.inserted_id
    )


async def find_user_chats(email):

    chats = []

    cursor = chats_collection.find(
        {
            "userEmail": email
        }
    ).sort(
        "createdAt",
        -1
    )

    async for chat in cursor:

        chat["_id"] = str(
            chat["_id"]
        )

        chats.append(
            chat
        )

    return chats
