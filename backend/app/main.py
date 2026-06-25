import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.settings import settings
from core.database import connect_database, close_database
from auth.routes import router as auth_router
from applications.routes import router as application_router
from dashboard.routes import router as dashboard_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_database()
    yield
    await close_database()

app = FastAPI(    
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

app.include_router(
    application_router,
    prefix="/api/applications",
    tags=["Applications"]
)

app.include_router(
    dashboard_router,
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

@app.get("/")
async def root():
    return {"message": "Application Portal API"}

if __name__ == "__main__":
    if settings.MODE == "DEV":
        uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
    else:
        uvicorn.run("main:app", host='0.0.0.0', port=8000)
