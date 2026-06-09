import os

from google import genai
from dotenv import load_dotenv


load_dotenv()


api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY missing")


client = genai.Client(
    api_key=api_key
)


def create_embedding(text: str) -> list[float]:

    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )

    if not result.embeddings:
        raise ValueError(
            "Gemini embedding failed"
        )

    embedding = result.embeddings[0]

    if not embedding.values:
        raise ValueError(
            "Embedding values empty"
        )

    return embedding.values
