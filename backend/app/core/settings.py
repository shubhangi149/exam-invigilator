from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Application Portal API"
    APP_VERSION: str = "1.0.0"

    # MongoDB
    MONGODB_URI: str
    DATABASE_NAME: str

    # JWT
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    
    HOST: str = "localhost"
    PORT: int = 5000
    MODE: str = "DEV"

    model_config = SettingsConfigDict(env_file="app\.env", extra="ignore")


settings = Settings()
