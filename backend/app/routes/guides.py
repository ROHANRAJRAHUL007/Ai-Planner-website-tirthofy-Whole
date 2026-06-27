from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from app.db.collections import guides_collection

router = APIRouter()


class Place(BaseModel):
    title: str
    description: str


class Guide(BaseModel):
    title: str
    location: str
    overview: str
    places: List[Place]


@router.post("/guides")
async def create_guide(guide: Guide):
    result = await guides_collection.insert_one(
        guide.model_dump()
    )

    return {
        "success": True,
        "id": str(result.inserted_id)
    }

# for inspiration page


@router.get("/guides")
async def get_guides():

    guides = []

    async for guide in guides_collection.find():

        guide["_id"] = str(guide["_id"])

        guides.append(guide)

    return guides
