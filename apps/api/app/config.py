from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"

    supabase_url: str = ""
    supabase_service_role_key: str = ""

    gemini_api_key: str = ""
    openai_api_key: str = ""

    internal_webhook_secret: str = ""

    aisensy_api_key: str = ""
    aisensy_base_url: str = "https://backend.aisensy.com"
    aisensy_doctor_note_campaign: str = "redcity_doctor_note"
    aisensy_nudge_d3_campaign: str = "redcity_nudge_d3"
    aisensy_nudge_d7_campaign: str = "redcity_nudge_d7"

    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]


settings = Settings()
