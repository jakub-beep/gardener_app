from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload

from app.api.deps import get_db, get_current_user
from app.api.deps import get_current_user

from app.schemas.garden import GardenCreate, GardenOut

from app.models.user import User
from app.models.plant import Plant
from app.models.tool import Tool
from app.models.garden import Garden

router = APIRouter(prefix="/gardens", tags=["gardens"])


@router.post("/")
def create_garden(
    data: GardenCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    plants = db.query(Plant).filter(Plant.id.in_(data.plants)).all()
    tools = db.query(Tool).filter(Tool.id.in_(data.tools)).all()

    garden = Garden(
        name=data.name,
        garden_area=data.garden_area,
        has_water_pool=data.has_water_pool,
        owner_id=current_user.id,
        plants=plants,
        tools=tools,
    )

    db.add(garden)
    db.commit()
    db.refresh(garden)

    return garden


@router.get("/my", response_model=list[GardenOut])
def get_my_gardens(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    gardens = (
        db.query(Garden)
        .options(
            selectinload(Garden.plants),
            selectinload(Garden.tools),
        )
        .filter(Garden.owner_id == current_user.id)
        .all()
    )

    return gardens


@router.get("/{garden_id}")
def get_garden(garden_id: int, db: Session = Depends(get_db)):
    garden = db.query(Garden).filter(Garden.id == garden_id).first()

    if not garden:
        raise HTTPException(status_code=404, detail="Garden not found")

    return garden


@router.put("/{garden_id}")
def update_garden(garden_id: int, data: GardenCreate, db: Session = Depends(get_db)):
    garden = db.query(Garden).filter(Garden.id == garden_id).first()

    if not garden:
        raise HTTPException(status_code=404, detail="Garden not found")

    garden.name = data.name

    db.commit()
    db.refresh(garden)

    return garden
