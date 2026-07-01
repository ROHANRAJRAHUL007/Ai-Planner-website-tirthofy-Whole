from fastapi import APIRouter
from app.db.collections import users_collection

router = APIRouter()


@router.post("/users")
async def create_user(data: dict):

    existing = await users_collection.find_one(
        {"email": data["email"]}
    )

    if existing:
        return {
            "id": str(existing["_id"])
        }

    result = await users_collection.insert_one(data)

    return {
        "id": str(result.inserted_id)
    }
