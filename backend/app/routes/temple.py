from fastapi import APIRouter

from app.models.temple import Temple
from app.db.collections import temple_collection
from app.services.embedding import create_embedding


router = APIRouter()


@router.post("/temples")
async def add_temple(
    temple: Temple
):

    data = temple.model_dump()
    text = f"""

Name:
{data["name"]}

City:
{data["city"]}

State:
{data["state"]}

Deity:
{data["deity"]}

Category:
{",".join(data["category"])}

Description:
{data["description"]}

History:
{data["history"]}

Best Time:
{data["best_time"]}

"""
    embedding = create_embedding(
        text
    )
    data["embedding"] = embedding
    await temple_collection.insert_one(
        data
    )
    return {
        "message": "Temple added with embedding"
    }
