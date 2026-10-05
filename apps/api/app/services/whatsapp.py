import httpx

from app.config import settings


class WhatsAppDispatchError(Exception):
    pass


async def send_whatsapp_template(
    *,
    phone: str,
    campaign_name: str,
    user_name: str,
    template_params: list[str],
    media_url: str | None = None,
) -> str | None:
    """Send a pre-approved WhatsApp template message via the AiSensy BSP.

    Returns the provider's message id when available, for whatsapp_log.
    """
    payload: dict = {
        "apiKey": settings.aisensy_api_key,
        "campaignName": campaign_name,
        "destination": phone,
        "userName": user_name,
        "templateParams": template_params,
        "source": "api",
    }
    if media_url:
        payload["media"] = {"url": media_url, "filename": "voice-note.mp3"}

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(
            f"{settings.aisensy_base_url}/campaign/t1/api/v2",
            json=payload,
        )

    if response.status_code >= 400:
        raise WhatsAppDispatchError(f"AiSensy error {response.status_code}: {response.text}")

    data = response.json()
    return data.get("submitted_message_id") or data.get("messageId")
