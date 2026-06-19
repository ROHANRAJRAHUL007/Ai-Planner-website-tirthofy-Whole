from app.services.rag import ask_ai

from app.repositories.chat_repository import save_chat


async def create_chat(
        email,
        message
):

    # get AI answer
    answer = await ask_ai(
        message
    )

    # save conversation
    chat_id = await save_chat(
        email,
        message,
        answer
    )

    return {

        "answer": answer,

        "chatId": chat_id

    }
