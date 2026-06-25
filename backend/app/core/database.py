from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from core.settings import settings


class Database:
    client: AsyncIOMotorClient = None
    database: AsyncIOMotorDatabase = None


db = Database()


async def connect_database():

    db.client = AsyncIOMotorClient(settings.MONGODB_URI)
    db.database = db.client[settings.DATABASE_NAME]
    print("MongoDB Connected")


async def close_database():
    if db.client:
        db.client.close()
        print("MongoDB Disconnected")


def get_database():
    return db.database