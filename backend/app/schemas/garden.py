from typing import List
from app.schemas.plant import PlantOut
from app.schemas.tool import ToolOut
from pydantic import BaseModel


class GardenCreate(BaseModel):
    name: str
    gardenArea: int
    tools: List[int] = []
    plants: List[int] = []
    has_water_pool: bool


class GardenOut(BaseModel):
    id: int
    name: str
    plants: list[PlantOut]
    tools: list[ToolOut]

    class Config:
        from_attributes = True
