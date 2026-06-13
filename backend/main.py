from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv


from app.routes.users import router as users_router
from app.routes.story import router as story_router
from app.routes import temple
from app.routes import search
from app.routes import chat


# load env
load_dotenv()


# create app
app = FastAPI()


# CORS
app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://www.tirthofy.xyz",
        "https://tirthofy.xyz"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


# ROUTES

app.include_router(
    users_router
)


app.include_router(
    story_router
)


app.include_router(
    temple.router
)


app.include_router(
    search.router
)


app.include_router(
    chat.router
)


# health check
@app.get("/")
def home():

    return {

        "message": "AI Planner backend running 🚀"

    }
