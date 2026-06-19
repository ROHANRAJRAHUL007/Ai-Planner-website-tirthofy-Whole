from fastapi import APIRouter

from app.services.rag import ask_ai


router = APIRouter()


@router.post("/chat")
async def chat(data: dict):

    question = data["message"]

    answer = await ask_ai(
        question
    )

    return {
        "answer": answer
    }
