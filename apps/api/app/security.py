from fastapi import Header, HTTPException

from app.config import settings


def require_internal_secret(x_webhook_secret: str | None = Header(default=None)) -> None:
    if not settings.internal_webhook_secret or x_webhook_secret != settings.internal_webhook_secret:
        raise HTTPException(status_code=401, detail="Invalid webhook secret")
