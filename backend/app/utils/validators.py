from fastapi import HTTPException

from core.constants import MAX_FILE_SIZE, ALLOWED_DOCUMENT_TYPES, ALLOWED_PHOTO_TYPES


async def validate_document(file):
    if file.content_type not in ALLOWED_DOCUMENT_TYPES:
        raise HTTPException(status_code=400, detail="Only JPG, PNG and PDF files are allowed.")

    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size must be less than 2 MB.")
    await file.seek(0)


async def validate_photo(file):
    if file.content_type not in ALLOWED_PHOTO_TYPES:
        raise HTTPException(status_code=400, detail="Only JPG and PNG images are allowed.")
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size must be less than 2 MB.")
    await file.seek(0)