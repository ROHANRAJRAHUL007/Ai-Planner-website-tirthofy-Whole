from fastapi import APIRouter
from app.models.story import StoryCreate
from app.db.collections import stories_collection

router = APIRouter()


@router.post("/stories")
async def create_story(story: StoryCreate):

    result = await stories_collection.insert_one(
        story.dict()
    )

    return {
        "id": str(result.inserted_id),
        "message": "Story created"
    }
