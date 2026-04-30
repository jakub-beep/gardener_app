from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class Garden(Base):
    __tablename__ = "gardens"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User")
    plants = relationship("Plant", back_populates="garden", cascade="all, delete")
    tools = relationship("Tool", back_populates="garden", cascade="all, delete")
