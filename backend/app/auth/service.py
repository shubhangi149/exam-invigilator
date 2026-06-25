from bson import ObjectId

from core.database import get_database
from core.security import hash_password, verify_password, create_access_token


async def register_admin(username: str, password: str):
    db = get_database()
    existing_admin = await db.admins.find_one({"username": username})

    if existing_admin:
        return None

    result = await db.admins.insert_one(
        {
            "username": username,
            "hashed_password": hash_password(password)
        }
    )

    return str(result.inserted_id)


async def login_admin(username: str, password: str):
    db = get_database()

    admin = await db.admins.find_one({"username": username})

    if not admin:
        return None

    if not verify_password(password, admin["hashed_password"]):
        return None

    access_token = create_access_token({"sub": str(admin["_id"])})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


async def get_admin_by_id(admin_id: str):
    db = get_database()
    return await db.admins.find_one({"_id": ObjectId(admin_id)})
