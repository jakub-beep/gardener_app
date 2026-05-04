from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import garden, plant, tool, auth

app = FastAPI()

app.include_router(auth.router)
app.include_router(garden.router)
app.include_router(plant.router)
app.include_router(tool.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
