from datetime import datetime

from pydantic import BaseModel


class PlantCreate(BaseModel):
    name: str
    species: str
    description: str
    watering_frequency_days: int
    garden_id: int


class PlantOut(BaseModel):
    id: int
    name: str
    species: str
    description: str
    watering_frequency_days: int
    last_watered_at: datetime

    class Config:
        from_attributes = True
