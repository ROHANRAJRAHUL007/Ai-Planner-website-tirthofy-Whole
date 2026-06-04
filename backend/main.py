import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from prompts.travel_prompt import TRAVEL_PROMPT
from dotenv import load_dotenv
import os


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


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "message": "AI Planner backend running 🚀"
    }


@app.post("/chat")
async def chat(req: ChatRequest):

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=[
            TRAVEL_PROMPT,
            req.message
        ]
    )

    if response.text is None:
        raise HTTPException(
            status_code=500,
            detail="Empty Gemini response"
        )

    clean_text = (
        response.text
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
