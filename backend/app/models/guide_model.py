from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class GuideCreate(BaseModel):
    authorId: str
    authorName: str
    authorEmail: str

    title: str
    temple: str
    state: str
    district: str
    category: str
    description: str
    coverImage: Optional[str] = None
    location: str = ""
    overview: str = ""
    places: list[str] = Field(default_factory=list)


class GuideUpdate(BaseModel):
    title: Optional[str] = None
    temple: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None

    coverImage: Optional[str] = None
    status: Optional[str] = None
    location: Optional[str] = None
    overview: Optional[str] = None
    places: Optional[list[str]] = None


class GuideResponse(BaseModel):
    id: str

    authorId: str
    authorName: str
    authorEmail: str

    title: str
    temple: str
    state: str
    district: str
    category: str
    description: str

    coverImage: Optional[str] = None
    location: str = ""
    overview: str = ""
    places: list[str] = Field(default_factory=list)

    status: str = "draft"

    createdAt: datetime
    updatedAt: datetime
