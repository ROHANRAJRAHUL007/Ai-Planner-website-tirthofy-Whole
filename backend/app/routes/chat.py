
from fastapi import APIRouter

from app.chains.temple_chain import ask_tirthofy


router = APIRouter()


@router.post("/chat")
async def chat(data: dict):

    question = data["message"]

    answer = await ask_tirthofy(question)

    return {

        "answer": answer

    }
