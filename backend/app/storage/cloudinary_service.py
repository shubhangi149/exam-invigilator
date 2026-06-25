import cloudinary
import cloudinary.uploader

from core.settings import settings


cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)


async def upload_file(file, folder: str):
    """
    Upload file to Cloudinary
    """

    content = await file.read()

    result = cloudinary.uploader.upload(
        content,
        folder=folder,
        resource_type="auto"
    )

    await file.seek(0)

    return {
        "public_id": result["public_id"],
        "secure_url": result["secure_url"]
    }


def delete_file(public_id: str):
    """
    Delete file from Cloudinary
    """
    return cloudinary.uploader.destroy(public_id)