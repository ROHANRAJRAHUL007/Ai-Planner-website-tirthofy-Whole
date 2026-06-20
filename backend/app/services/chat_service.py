from app.chains.temple_chain import ask_tirthofy


async def chat_with_ai(message: str):

    response = await ask_tirthofy(
        message
    )

    return response
