from fastapi import APIRouter, Body, HTTPException
from pydantic import ValidationError

from app.models.guide_model import GuideCreate, GuideUpdate
from app.services.guide_service import (
    create_guide,
    get_guides,
    get_my_guides,
    get_guide,
    update_guide,
)

router = APIRouter(
    prefix="/guides",
    tags=["Guides"],
)


def build_guide_create_payload(payload: dict) -> dict:
    author_id = payload.get("authorId") or payload.get("authorEmail") or ""
    author_email = payload.get("authorEmail") or payload.get("authorId") or ""

    temple = str(payload.get("temple") or "").strip()
    state = str(payload.get("state") or "").strip()
    district = str(payload.get("district") or "").strip()
    description = str(payload.get("description") or "").strip()
    location = str(payload.get("location") or "").strip()
    overview = str(payload.get("overview") or "").strip()
    places = payload.get("places")

    derived_location = location or ", ".join(part for part in [district, state] if part) or temple or "Not specified"
    derived_overview = overview or description or temple or "Guide details coming soon."
    normalized_places = places if isinstance(places, list) else []

    return {
        "authorId": str(author_id).strip(),
        "authorName": str(payload.get("authorName") or "Anonymous").strip(),
        "authorEmail": str(author_email).strip(),
        "title": str(payload.get("title") or "Untitled Guide").strip(),
        "temple": temple,
        "state": state,
        "district": district,
        "category": str(payload.get("category") or "").strip(),
        "description": description,
        "coverImage": str(payload.get("coverImage") or "").strip(),
        "location": derived_location,
        "overview": derived_overview,
        "places": [str(place).strip() for place in normalized_places if str(place).strip()],
    }


@router.get("")
async def list_guides():
    guides = await get_guides()

    return {
        "success": True,
        "count": len(guides),
        "guides": guides,
    }


@router.post("")
async def create(payload: dict = Body(...)):
    try:
        data = GuideCreate.model_validate(build_guide_create_payload(payload))
    except ValidationError as exc:
        messages = []

        for error in exc.errors():
            field = ".".join(str(part) for part in error.get("loc", []))
            message = error.get("msg", "Invalid value")
            messages.append(f"{field}: {message}" if field else message)

        raise HTTPException(status_code=400, detail=messages) from exc

    if not data.authorId or not data.authorEmail:
        raise HTTPException(status_code=400, detail="Author information is required")

    guide = await create_guide(data)

    return {
        "success": True,
        "guideId": guide["_id"],
        "guide": guide,
    }


@router.get("/me/{author_id}")
async def my_guides(author_id: str):
    guides = await get_my_guides(author_id)

    return {
        "success": True,
        "count": len(guides),
        "guides": guides,
    }


@router.get("/{guide_id}")
async def guide(guide_id: str):
    guide = await get_guide(guide_id)

    return {
        "success": True,
        "guide": guide,
    }


@router.put("/{guide_id}")
async def update(guide_id: str, data: GuideUpdate):
    guide = await update_guide(guide_id, data)

    return {
        "success": True,
        "guide": guide,
    }
