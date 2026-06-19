import json
import asyncio

from app.db.collections import temple_collection
from app.services.embedding import create_embedding


async def upload():

    with open(
        "data/temples.json",
        "r",
        encoding="utf-8"
    ) as f:

        temples = json.load(f)

    for temple in temples:

        text = f"""

        Temple Name:
        {temple.get("name")}

        State:
        {temple.get("state")}

        City:
        {temple.get("city")}

        Description:
        {temple.get("description")}

        History:
        {temple.get("history")}

        Deity:
        {temple.get("deity")}

        """

        embedding = create_embedding(text)

        temple["embedding"] = embedding

        await temple_collection.insert_one(
            temple
        )

        print(
            "Saved:",
            temple.get("name")
        )


asyncio.run(upload())
