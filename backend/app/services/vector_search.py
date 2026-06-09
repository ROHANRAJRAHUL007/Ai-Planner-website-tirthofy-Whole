from app.db.collections import temple_collection
from app.services.embedding import create_embedding


async def search_temples(
        query: str
):

    query_embedding = create_embedding(
        query
    )

    pipeline = [

        {
            "$vectorSearch": {

                "index":
                "temple_vector_index",

                "path":
                "embedding",

                "queryVector":
                query_embedding,

                "numCandidates":
                100,

                "limit":
                5
            }
        },

        {
            "$project": {

                "_id": 0,

                "name": 1,

                "city": 1,

                "state": 1,

                "description": 1,

                "history": 1,

                "deity": 1,

                "category": 1,

                "best_time": 1,

                "score": {
                    "$meta":
                    "vectorSearchScore"
                }
            }
        }

    ]

    results = []

    async for item in temple_collection.aggregate(
        pipeline
    ):

        results.append(item)

    return results
