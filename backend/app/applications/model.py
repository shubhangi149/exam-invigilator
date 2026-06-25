from datetime import datetime


def application_document(data: dict, documents: dict):
    return {
        "name": data["name"],
        "mobile": data["mobile"],
        "email": data["email"],
        "city": data["city"],
        "dob": data["dob"],
        "education": data["education"],
        "current_city": data["current_city"],

        "status": "PENDING",
        "documents": documents,

        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }