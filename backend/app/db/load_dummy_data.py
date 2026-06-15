import json
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.user import User
from app.models.tool import Tool
from app.models.plant import Plant
from app.models.garden import Garden
from app.core.security import hash_password

SEED_DIR = Path(__file__).parent


def load_json(filename: str):
    print(f"Loading {filename}...")
    print(f"SEED_DIR: {SEED_DIR}")
    with open(SEED_DIR / "dummy_data" / filename, encoding="utf-8") as f:
        return json.load(f)


def load_dummy_data(db: Session):
    # USERS

    users = load_json("users.json")
    print(f"Loaded {users} users from JSON.")

    for user in users:
        exists = db.query(User).filter(User.email == user["email"]).first()
        print(f"Checking user: {user['email']}")
        print("password", hash_password(user["password"]))

        if not exists:
            db.add(
                User(
                    email=user["email"],
                    hashed_password=hash_password(user["password"]),
                )
            )

    db.commit()

    # TOOLS

    tools = load_json("tools.json")

    for tool in tools:
        exists = db.query(Tool).filter(Tool.name == tool["name"]).first()

        if not exists:
            db.add(Tool(**tool))

    db.commit()

    # PLANTS

    plants = load_json("plants.json")

    for plant in plants:
        exists = db.query(Plant).filter(Plant.name == plant["name"]).first()

        if not exists:
            db.add(Plant(**plant))

    db.commit()

    # GARDENS

    gardens = load_json("gardens.json")
    users = db.query(User).all()

    for garden in gardens:
        exists = db.query(Garden).filter(Garden.name == garden["name"]).first()
        owner = db.query(User).filter(User.email == garden["owner_email"]).first()

        if not exists:
            db.add(
                Garden(
                    name=garden["name"],
                    owner_id=owner.id,
                    garden_area=garden["garden_area"],
                    has_water_pool=garden["has_water_pool"],
                )
            )

    db.commit()

    # ASSOCIATIONS

    associations = load_json("associations.json")

    for association in associations:
        print("association", association)

        garden = (
            db.query(Garden).filter(Garden.name == association["garden_name"]).first()
        )
        print("garden", garden)

        if not garden:
            continue

        plants = db.query(Plant).filter(Plant.id.in_(association["plant_ids"])).all()

        tools = db.query(Tool).filter(Tool.id.in_(association["tool_ids"])).all()

        for plant in plants:
            if plant not in garden.plants:
                garden.plants.append(plant)

        for tool in tools:
            if tool not in garden.tools:
                garden.tools.append(tool)

    db.commit()
