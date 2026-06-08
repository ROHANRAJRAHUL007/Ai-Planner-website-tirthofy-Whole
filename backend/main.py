from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from google import genai

import os
import json

from prompts.travel_prompt import TRAVEL_PROMPT
from app.routes.story import router as story_router


# load environment variables
load_dotenv()


# create FastAPI app
app = FastAPI()


# allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_methods=["*"],
    allow_headers=["*"]
)


# Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# request body model
class ChatRequest(BaseModel):
    message: str


# story routes
app.include_router(story_router)


# health check route
@app.get("/")
def home():
    return {
        "message": "AI Planner backend running 🚀"
    }


# chat API
@app.post("/chat")
async def chat(req: ChatRequest):

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=[
            TRAVEL_PROMPT,
            req.message
        ]
    )

    response_text = response.text

    if not response_text:
        raise HTTPException(
            status_code=500,
            detail="Empty Gemini response"
        )

    # clean Gemini markdown
    clean_text = (
        response_text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    # convert string JSON to Python dict
    try:
        data = json.loads(clean_text)
        return data

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Invalid JSON from Gemini",
                "raw": clean_text
            }
        )
