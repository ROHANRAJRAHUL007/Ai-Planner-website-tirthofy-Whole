from app.db.collections import temple_collection
from app.services.embedding import create_embedding


async def search_temples(question):

    query_embedding = create_embedding(question)

    cursor = temple_collection.aggregate([
        {
            "$vectorSearch": {
                "index": "temple_vector_index",
                "path": "embedding",
                "queryVector": query_embedding,
                "numCandidates": 50,
                "limit": 5
            }
        }
    ])

    temples = await cursor.to_list(length=5)

    return temples
