from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.associations import garden_tools
from app.db.base import Base


class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    gardens = relationship(
        "Garden",
        secondary=garden_tools,
        back_populates="tools",
    )
