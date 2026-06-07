from fastapi import APIRouter
from app.db.collections import users_collection

router = APIRouter()


@router.post("/users")
async def create_user(data: dict):
    result = await users_collection.insert_one(data)

    return {
        "id": str(result.inserted_id)
    }
