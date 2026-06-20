from langchain_core.prompts import ChatPromptTemplate

from app.core.llm import llm

from app.services.vector_search import search_temples


prompt = ChatPromptTemplate.from_template(
    """

You are Tirthofy AI.

Answer only using temple database.

Temple Data:

{context}


User Question:

{question}


"""
)


async def ask_tirthofy(question):

    temples = await search_temples(question)

    context = ""

    for temple in temples:

        context += f"""

        Temple:
        {temple.get("name")}

        Location:
        {temple.get("city")}
        {temple.get("state")}


        About:
        {temple.get("description")}


        History:
        {temple.get("history")}

        """

    chain = prompt | llm

    response = await chain.ainvoke(
        {
            "context": context,
            "question": question
        }
    )

    return response.content
