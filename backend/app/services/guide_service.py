from datetime import datetime

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import HTTPException

from app.db.collections import guides_collection
from app.models.guide_model import GuideCreate, GuideUpdate


def parse_guide_id(guide_id: str) -> ObjectId:
    try:
        return ObjectId(guide_id)
    except InvalidId as exc:
        raise HTTPException(status_code=400, detail="Invalid guide id") from exc


def normalize_owner_value(value: str) -> str:
    return str(value or "").strip().lower()


async def create_guide(data: GuideCreate):
    now = datetime.utcnow()
    author_id = str(data.authorId or "").strip()
    author_email = str(data.authorEmail or "").strip()

    guide = {
        "authorId": author_id,
        "authorName": data.authorName,
        "authorEmail": author_email,
        "title": data.title,
        "temple": data.temple,
        "state": data.state,
        "district": data.district,
        "category": data.category,
        "description": data.description,
        "coverImage": (data.coverImage or "").strip(),
        "location": data.location,
        "overview": data.overview,
        "places": data.places,
        "status": "draft",
        "ownerKeys": list(
            {
                key
                for key in [
                    normalize_owner_value(author_id),
                    normalize_owner_value(author_email),
                ]
                if key
            }
        ),
        "createdAt": now,
        "updatedAt": now,
    }

    result = await guides_collection.insert_one(guide)
    guide["_id"] = str(result.inserted_id)

    return guide


async def get_guides():
    cursor = guides_collection.find().sort("updatedAt", -1)
    guides = []

    async for guide in cursor:
        guide["_id"] = str(guide["_id"])
        guides.append(guide)

    return guides


async def get_my_guides(author_id: str):
    normalized = normalize_owner_value(author_id)

    query = {
        "$or": [
            {"authorId": author_id},
            {"authorEmail": author_id},
        ]
    }

    if normalized:
        query["$or"].extend(
            [
                {"authorId": normalized},
                {"authorEmail": normalized},
                {"ownerKeys": normalized},
            ]
        )

    cursor = guides_collection.find(query).sort("updatedAt", -1)
    guides = []

    async for guide in cursor:
        guide["_id"] = str(guide["_id"])
        guides.append(guide)

    return guides


async def get_guide(guide_id: str):
    object_id = parse_guide_id(guide_id)
    guide = await guides_collection.find_one({"_id": object_id})

    if not guide:
        raise HTTPException(status_code=404, detail="Guide not found")

    guide["_id"] = str(guide["_id"])
    return guide


async def update_guide(guide_id: str, data: GuideUpdate):
    object_id = parse_guide_id(guide_id)
    payload = data.model_dump(exclude_none=True)

    if not payload:
        return await get_guide(guide_id)

    payload["updatedAt"] = datetime.utcnow()

    result = await guides_collection.update_one(
        {"_id": object_id},
        {"$set": payload},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Guide not found")

    return await get_guide(guide_id)
