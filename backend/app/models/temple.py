from pydantic import BaseModel
from typing import List


class Temple(BaseModel):

    name: str

    state: str

    city: str

    description: str

    history: str

    deity: str

    category: List[str]

    best_time: str
