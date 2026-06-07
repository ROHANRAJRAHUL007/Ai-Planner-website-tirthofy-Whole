import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from prompts.travel_prompt import TRAVEL_PROMPT
from dotenv import load_dotenv
import os
from app.routes.story import router as story_router

try:
    from google import genai as google_genai
    GENAI_SDK = "modern"
except ImportError:
    import google.generativeai as google_genai
    GENAI_SDK = "legacy"


load_dotenv()

app = FastAPI()


# allow Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


gemini_api_key = os.getenv("GEMINI_API_KEY")

if GENAI_SDK == "modern":
    client = google_genai.Client(api_key=gemini_api_key)
else:
    google_genai.configure(api_key=gemini_api_key)
    client = google_genai.GenerativeModel("gemini-2.5-flash-lite")


class ChatRequest(BaseModel):
    message: str


app.include_router(story_router)


@app.get("/")
def home():
    return {
        "message": "AI Planner backend running 🚀"
    }


@app.post("/chat")
async def chat(req: ChatRequest):
    if GENAI_SDK == "modern":
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=[
                TRAVEL_PROMPT,
                req.message
            ]
        )
        response_text = response.text
    else:
        response = client.generate_content(
            [TRAVEL_PROMPT, req.message]
        )
        response_text = getattr(response, "text", None)

    if response_text is None:
        raise HTTPException(
            status_code=500,
            detail="Empty Gemini response"
        )

    clean_text = (
        response_text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

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
