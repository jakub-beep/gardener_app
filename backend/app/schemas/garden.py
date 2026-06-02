from typing import List
from app.schemas.plant import PlantOut
from app.schemas.tool import ToolOut
from pydantic import BaseModel


class GardenCreate(BaseModel):
    name: str
    garden_area: int
    tool_ids: List[int] = []
    plant_ids: List[int] = []
    has_water_pool: bool


class GardenOut(BaseModel):
    id: int
    name: str
    plants: list[PlantOut]
    tools: list[ToolOut]
    has_water_pool: bool
    garden_area: int

    class Config:
        from_attributes = True
