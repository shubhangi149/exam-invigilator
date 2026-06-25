from typing import Literal

from pydantic import BaseModel
from pydantic import EmailStr


class ApplicationListResponse(BaseModel):
    id: str
    name: str
    mobile: str
    email: EmailStr
    city: str
    status: str
    created_at: str


class ApplicationDetailsResponse(BaseModel):
    id: str
    name: str
    mobile: str
    email: EmailStr
    city: str
    dob: str
    education: str
    current_city: str
    status: str
    documents: dict
    created_at: str


class StatusUpdateRequest(BaseModel):
    status: Literal[
        "PENDING",
        "SHORTLISTED",
        "REJECTED"
    ]