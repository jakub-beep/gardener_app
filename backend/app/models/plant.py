from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from app.db.base import Base


class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    species = Column(String)
    description = Column(String)

    watering_frequency_days = Column(Integer)

    last_watered_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    garden_id = Column(Integer, ForeignKey("gardens.id"), nullable=False)

    garden = relationship("Garden", back_populates="plants")
