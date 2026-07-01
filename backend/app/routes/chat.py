from fastapi import APIRouter, HTTPException

from app.chains.temple_chain import ask_tirthofy
from app.repositories.chat_repository import (
    append_chat_messages,
    find_chat_by_id,
    find_user_chats,
    save_chat,
)

router = APIRouter()


@router.post("/chat")
async def chat(data: dict):
    question = str(data.get("message") or "").strip()
    email = str(data.get("email") or "").strip()
    chat_id = str(data.get("chatId") or "").strip()

    if not question:
        raise HTTPException(status_code=400, detail="Message is required")

    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    answer = await ask_tirthofy(question)

    if chat_id:
        saved_chat_id = await append_chat_messages(chat_id, question, answer)
        if not saved_chat_id:
            raise HTTPException(status_code=404, detail="Chat not found")
    else:
        saved_chat_id = await save_chat(email, question, answer)

    return {
        "answer": answer,
        "chatId": saved_chat_id,
    }


@router.get("/chats/user/{email}")
async def get_user_chats(email: str):
    return await find_user_chats(email)


@router.get("/chats/{chat_id}")
async def get_chat(chat_id: str):
    chat = await find_chat_by_id(chat_id)

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    return chat
