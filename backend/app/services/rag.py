from app.services.vector_search import search_temples
from prompts.temple_prompts import temple_prompt
from app.core.gemini import ask_gemini


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

    prompt = temple_prompt(
        context,
        question
    )

    answer = ask_gemini(
        prompt
    )

    return answer
