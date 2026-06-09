import os

from google import genai
from dotenv import load_dotenv

from app.services.vector_search import search_temples


load_dotenv()


client = genai.Client(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)


async def ask_ai(question):

    temples = await search_temples(
        question
    )

    context = ""

    for temple in temples:

        context += f"""

        Name:
        {temple['name']}

        History:
        {temple['history']}

        """

    prompt = f"""

    Answer using temple data.

    DATA:
    {context}


    USER QUESTION:
    {question}

    """

    response = client.models.generate_content(

        model="gemini-2.5-flash",

        contents=prompt

    )

    return response.text
