import os
from dotenv import load_dotenv

load_dotenv()


_pinecone_api_key = os.getenv("PINECONE_API_KEY")
_pinecone_index = os.getenv("PINECONE_INDEX")


if _pinecone_api_key is None:
    raise ValueError("PINECONE_API_KEY missing")

if _pinecone_index is None:
    raise ValueError("PINECONE_INDEX missing")


# export only after validation
PINECONE_API_KEY: str = _pinecone_api_key
PINECONE_INDEX: str = _pinecone_index
