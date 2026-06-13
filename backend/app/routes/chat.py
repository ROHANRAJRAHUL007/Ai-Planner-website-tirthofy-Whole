from fastapi import APIRouter

from app.services.rag import ask_ai

from app.db.collections import chats_collection

from datetime import datetime


router = APIRouter()


@router.post("/chat")
async def chat(data: dict):
    user_message = data["message"]

    user_email = data["email"]

    # AI response
    answer = await ask_ai(user_message)

    # save in MongoDB
    result = await chats_collection.insert_one({

        "userEmail": user_email,

        "title": user_message[:50],

        "messages": [

            {
                "role": "user",
                "content": user_message
            },

            {
                "role": "assistant",
                "content": answer
            }

        ],

        "createdAt": datetime.utcnow()

    })

    print("CHAT SAVED:", result.inserted_id)

    return {

        "answer": answer,

        "chatId": str(result.inserted_id)

    }


@router.get("/chats/{email}")
async def get_user_chats(email: str):

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

        chats.append(chat)

    return chats
