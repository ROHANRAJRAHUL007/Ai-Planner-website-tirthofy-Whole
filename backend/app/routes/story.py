from fastapi import APIRouter
from app.models.story import StoryCreate
from app.db.collections import stories_collection

router = APIRouter()


@router.post("/stories")
async def create_story(story: StoryCreate):

    story_data = story.model_dump()

    saved_story = await stories_collection.insert_one(story_data)

    return {
        "id": str(saved_story.inserted_id),
        "message": "Story created successfully"
    }
