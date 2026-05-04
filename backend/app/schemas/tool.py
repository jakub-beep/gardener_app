from pydantic import BaseModel


class ToolCreate(BaseModel):
    name: str
    description: str
    garden_id: int


class ToolOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
