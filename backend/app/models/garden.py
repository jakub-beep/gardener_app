from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.models.associations import (
    garden_plants,
    garden_tools,
)


class Garden(Base):
    __tablename__ = "gardens"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User")
    plants = relationship(
        "Plant",
        secondary=garden_plants,
        back_populates="gardens",
    )

    tools = relationship(
        "Tool",
        secondary=garden_tools,
        back_populates="gardens",
    )

    garden_area = Column(Integer, nullable=False)
    has_water_pool = Column(Boolean, default=False)
