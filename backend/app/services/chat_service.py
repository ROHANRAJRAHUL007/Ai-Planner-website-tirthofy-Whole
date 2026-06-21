from app.graphs.tirthofy_graph import tirthofy_graph, TirthofyState


async def chat_with_ai(message: str):

    state: TirthofyState = {
        "question": message,
        "answer": ""
    }

    result = await tirthofy_graph.ainvoke(state)

    return result["answer"]
