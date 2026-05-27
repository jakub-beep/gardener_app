from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models.garden import Garden
from app.schemas.garden import GardenCreate
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/gardens", tags=["gardens"])


@router.post("/")
def create_garden(
    data: GardenCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    garden = Garden(name=data.name, owner_id=current_user.id)

    db.add(garden)
    db.commit()
    db.refresh(garden)

    return garden


@router.get("/my")
def get_my_gardens(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    gardens = db.query(Garden).filter(Garden.owner_id == current_user.id).all()

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
