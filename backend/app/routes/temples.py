from fastapi import APIRouter
from app.db.collections import temple_collection

import json
from pathlib import Path

router = APIRouter()

# Load image URLs once when the server starts
image_file = Path("data/temple_images.json")

if image_file.exists():
    with open(image_file, "r", encoding="utf-8") as f:
        image_map = json.load(f)
else:
    image_map = {}


@router.get("/temples")
async def get_temples():
    temples = await temple_collection.find(
        {},
        {
            "_id": 0,
            "embedding": 0
        }
    ).to_list(length=None)

    for temple in temples:
        key = f"{temple.get('name', '')}|{temple.get('state', '')}"
        temple["img_url"] = image_map.get(key, "")

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

    key = f"{temple.get('name', '')}|{temple.get('state', '')}"
    temple["img_url"] = image_map.get(key, "")

    return temple
