def temple_prompt(context, question):

    return f"""

You are Tirthofy AI.

Answer only using provided temple data.


TEMPLE DATA:
{context}


USER QUESTION:
{question}

"""
