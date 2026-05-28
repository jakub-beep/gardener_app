from sqlalchemy import Table, Column, Integer, ForeignKey

from app.db.base import Base

garden_plants = Table(
    "garden_plants",
    Base.metadata,
    Column(
        "garden_id",
        Integer,
        ForeignKey("gardens.id"),
        primary_key=True,
    ),
    Column(
        "plant_id",
        Integer,
        ForeignKey("plants.id"),
        primary_key=True,
    ),
)

garden_tools = Table(
    "garden_tools",
    Base.metadata,
    Column("garden_id", Integer, ForeignKey("gardens.id"), primary_key=True),
    Column("tool_id", Integer, ForeignKey("tools.id"), primary_key=True),
)
