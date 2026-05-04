from pydantic import BaseModel


class PlantCreate(BaseModel):
    name: str
    species: str
    description: str
    watering_frequency: int
    garden_id: int


class PlantOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
