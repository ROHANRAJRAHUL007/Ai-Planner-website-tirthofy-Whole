from fastapi import APIRouter

from app.services.rag import ask_ai


router = APIRouter()


@router.post("/chat")
async def chat(
    data: dict
):

    answer = await ask_ai(
        data["message"]
    )

    return {

        "answer": answer

    }
