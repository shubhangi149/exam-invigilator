from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import Depends

from auth.schemas import LoginRequest, RegisterRequest
from auth.service import login_admin, register_admin
from core.dependencies import get_current_admin

router = APIRouter()


@router.post("/register")
async def register(payload: RegisterRequest):
    admin_id = await register_admin(payload.username, payload.password)

    if not admin_id:
        raise HTTPException(status_code=400, detail="Username already exists")

    return {"message": "Admin created successfully", "admin_id": admin_id}


@router.post("/login")
async def login(payload: LoginRequest):
    result = await login_admin(payload.username, payload.password)
    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return result


@router.get("/me")
async def me(admin=Depends(get_current_admin)):
    return {"id": str(admin["_id"]), "username": admin["username"]}
