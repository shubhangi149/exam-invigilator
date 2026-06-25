from bson import ObjectId
from fastapi import APIRouter, HTTPException
from fastapi import Form
from fastapi import File
from fastapi import UploadFile
from fastapi import Depends
from fastapi import Query

from storage.cloudinary_service import upload_file
from utils.validators import validate_document, validate_photo
from core.database import get_database
from applications.model import application_document

from core.database import get_database
from core.dependencies import get_current_admin
from storage.cloudinary_service import delete_file
from applications.schemas import StatusUpdateRequest


router = APIRouter()


@router.post("")
async def create_application(
    name: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(...),
    city: str = Form(...),
    dob: str = Form(...),
    education: str = Form(...),
    current_city: str = Form(...),

    aadhaar_front: UploadFile = File(...),
    aadhaar_back: UploadFile = File(...),
    pan_card: UploadFile = File(...),
    passport_photo: UploadFile = File(...)
):
    await validate_document(aadhaar_front)
    await validate_document(aadhaar_back)
    await validate_document(pan_card)
    await validate_document(passport_photo)

    aadhaar_front_doc = await upload_file(aadhaar_front, "applications/aadhaar")
    aadhaar_back_doc = await upload_file(aadhaar_back, "applications/aadhaar")
    pan_card_doc = await upload_file(pan_card, "applications/pan")
    passport_photo_doc = await upload_file(passport_photo, "applications/passport")

    documents = {
        "aadhaar_front": aadhaar_front_doc,
        "aadhaar_back": aadhaar_back_doc,
        "pan_card": pan_card_doc,
        "passport_photo": passport_photo_doc
    }

    data = {
        "name": name,
        "mobile": mobile,
        "email": email,
        "city": city,
        "dob": dob,
        "education": education,
        "current_city": current_city
    }

    application = application_document(data, documents)
    db = get_database()
    result = await db.applications.insert_one(application)

    return {"message": "Application submitted successfully", "id": str(result.inserted_id)}


@router.get("")
async def get_applications(
    page: int = Query(default=1, ge=1),
    city: str | None = None,
    search: str | None = None,
    status: str | None = None,
    admin=Depends(get_current_admin)
):
    limit = 20
    skip = (page - 1) * limit
    query = {}
    if city:
        query["city"] = city

    if status:
        query["status"] = status

    if search:
        query["$or"] = [
            {
                "name": {
                    "$regex": search,
                    "$options": "i"
                }
            },
            {
                "mobile": {
                    "$regex": search,
                    "$options": "i"
                }
            },
            {
                "email": {
                    "$regex": search,
                    "$options": "i"
                }
            }
        ]

    db = get_database()
    applications = await db.applications.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    total = await db.applications.count_documents(query)
    data = []
    for application in applications:
        data.append(
            {
                "id": str(application["_id"]),
                "name": application.get("name"),
                "mobile": application.get("mobile"),
                "email": application.get("email"),

                "city": application.get("city"),
                "dob": application.get("dob"),
                "education": application.get("education"),
                "current_city": application.get("current_city"),

                "status": application.get("status", "PENDING"),
                "documents": application.get("documents", {}),

                "created_at": application.get("created_at")
            }
        )

    return {"total": total, "page": page, "page_size": limit, "data": data}

@router.get("/{application_id}")
async def get_application( application_id: str, admin=Depends(get_current_admin)):
    db = get_database()
    application = await db.applications.find_one({"_id": ObjectId(application_id)})

    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    application["id"] = str(application["_id"])
    del application["_id"]
    return application


@router.patch("/{application_id}/status")
async def update_status(application_id: str, payload: StatusUpdateRequest, admin=Depends(get_current_admin)):
    db = get_database()
    result = await db.applications.update_one({"_id": ObjectId(application_id)}, {"$set": {"status": payload.status}})

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")

    return {"message": "Status updated"}


@router.delete("/{application_id}")
async def delete_application(application_id: str, admin=Depends(get_current_admin)):
    db = get_database()
    application = await db.applications.find_one({"_id": ObjectId(application_id)})

    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    documents = application["documents"]
    delete_file(documents["aadhaar_front"]["public_id"])
    delete_file(documents["aadhaar_back"]["public_id"])
    delete_file(documents["pan_card"]["public_id"])
    delete_file(documents["passport_photo"]["public_id"])

    await db.applications.delete_one({"_id": ObjectId(application_id)})

    return {"message": "Application deleted"}
