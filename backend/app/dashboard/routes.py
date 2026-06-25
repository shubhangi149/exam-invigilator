from datetime import datetime
from datetime import timedelta

from fastapi import APIRouter
from fastapi import Depends

from core.database import get_database
from core.dependencies import get_current_admin


router = APIRouter()

@router.get("/overview")
async def dashboard_overview(admin=Depends(get_current_admin)):
    db = get_database()
    now = datetime.utcnow()
    today_start = datetime(now.year, now.month, now.day)
    week_start = now - timedelta(days=7)
    month_start = datetime(now.year, now.month, 1)
    total = await db.applications.count_documents({})
    today = await db.applications.count_documents(
        {
            "created_at": {
                "$gte": today_start
            }
        }
    )
    week = await db.applications.count_documents(
        {
            "created_at": {
                "$gte": week_start
            }
        }
    )
    month = await db.applications.count_documents(
        {
            "created_at": {
                "$gte": month_start
            }
        }
    )

    return {
        "total_applications": total,
        "today": today,
        "this_week": week,
        "this_month": month
    }


@router.get("/city-stats")
async def city_stats(admin=Depends(get_current_admin)):
    db = get_database()
    pipeline = [
        {
            "$group": {
                "_id": "$city",
                "count": {
                    "$sum": 1
                }
            }
        },
        {
            "$sort": {
                "count": -1
            }
        }
    ]

    result = db.applications.aggregate(pipeline).to_list(None)

    return [{"city": item["_id"], "count": item["count"]} for item in result]
