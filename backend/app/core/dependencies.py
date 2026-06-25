from bson import ObjectId
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from core.security import decode_access_token
from core.database import get_database


security = HTTPBearer()


async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    admin_id = payload.get("sub")

    if not admin_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    
    db = get_database()
    admin = await db.admins.find_one({"_id": ObjectId(admin_id)})

    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin not found")

    return admin