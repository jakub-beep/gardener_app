from pydantic import BaseModel


class GardenCreate(BaseModel):
    name: str


class GardenOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
