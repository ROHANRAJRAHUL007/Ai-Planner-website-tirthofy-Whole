from fastapi import APIRouter
from app.db.collections import temple_collection


router = APIRouter()


@router.get("/temples")
async def get_temples():
    temples = await temple_collection.find(
        {},
        {
            "_id": 0,
            "embedding": 0
        }
    ).to_list(length=None)

    return temples


@router.get("/temples/{name}")
async def get_temple(name: str):
    temple = await temple_collection.find_one(
        {
            "name": {
                "$regex": f"^{name}$",
                "$options": "i"
            }
        },
        {
            "_id": 0,
            "embedding": 0
        }
    )

    if not temple:
        return {"error": "Temple not found"}

    return temple
