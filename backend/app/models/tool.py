from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import Base


class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)

    garden_id = Column(Integer, ForeignKey("gardens.id"), nullable=False)

    garden = relationship("Garden", back_populates="tools")
