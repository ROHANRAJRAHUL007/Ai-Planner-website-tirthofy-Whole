from app.graphs.state import TirthofyState
from app.chains.temple_chain import ask_tirthofy


async def temple_node(
        state: TirthofyState
):

    print("🔥 TEMPLE NODE RUNNING")

    result = await ask_tirthofy(
        state["question"]
    )

    return {
        "answer": result
    }
