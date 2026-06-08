from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.tool import Tool
from app.schemas.tool import ToolCreate

router = APIRouter(prefix="/tools", tags=["tools"])


@router.post("/")
def create_tool(data: ToolCreate, db: Session = Depends(get_db)):
    tool = Tool(**data.dict())

    db.add(tool)
    db.commit()
    db.refresh(tool)

    return tool


@router.get("/{tool_id}")
def get_tool(tool_id: int, db: Session = Depends(get_db)):
    tool = db.query(Tool).filter(Tool.id == tool_id).first()

    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    return tool


@router.get("/")
def get_all_tools(db: Session = Depends(get_db)):
    tools = db.query(Tool).all()
    return tools


@router.put("/{tool_id}")
def update_tool(tool_id: int, data: ToolCreate, db: Session = Depends(get_db)):
    tool = db.query(Tool).filter(Tool.id == tool_id).first()

    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    for key, value in data.dict().items():
        setattr(tool, key, value)

    db.commit()
    db.refresh(tool)

    return tool


@router.delete("/{tool_id}")
def delete_tool(tool_id: int, db: Session = Depends(get_db)):
    tool = db.query(Tool).filter(Tool.id == tool_id).first()

    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    db.delete(tool)
    db.commit()

    return {"detail": "Tool deleted"}
