from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.plant import Plant
from app.schemas.plant import PlantCreate

router = APIRouter(prefix="/plants", tags=["plants"])


@router.post("/")
def create_plant(data: PlantCreate, db: Session = Depends(get_db)):
    plant = Plant(**data.dict())

    db.add(plant)
    db.commit()
    db.refresh(plant)

    return plant


@router.get("/{plant_id}")
def get_plant(plant_id: int, db: Session = Depends(get_db)):
    plant = db.query(Plant).filter(Plant.id == plant_id).first()

    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")

    return plant


@router.get("/")
def get_all_plants(db: Session = Depends(get_db)):
    plants = db.query(Plant).all()
    return plants


@router.put("/{plant_id}")
def update_plant(plant_id: int, data: PlantCreate, db: Session = Depends(get_db)):
    plant = db.query(Plant).filter(Plant.id == plant_id).first()

    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")

    for key, value in data.dict().items():
        setattr(plant, key, value)

    db.commit()
    db.refresh(plant)

    return plant


@router.delete("/{plant_id}")
def delete_plant(plant_id: int, db: Session = Depends(get_db)):
    plant = db.query(Plant).filter(Plant.id == plant_id).first()

    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")

    db.delete(plant)
    db.commit()

    return {"detail": "Plant deleted"}
