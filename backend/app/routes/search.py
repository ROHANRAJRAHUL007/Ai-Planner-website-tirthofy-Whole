from fastapi import APIRouter

from app.services.vector_search import search_temples


router = APIRouter()


@router.post("/search")
async def search(
    data: dict
):

    result = await search_temples(
        data["query"]
    )

    return result
