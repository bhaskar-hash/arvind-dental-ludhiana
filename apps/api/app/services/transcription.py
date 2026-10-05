import io

from openai import OpenAI

from app.config import settings
from app.services.supabase_admin import get_service_client

WHISPER_MODEL = "whisper-1"


def transcribe_doctor_note(storage_path: str) -> str:
    admin = get_service_client()
    audio_bytes = admin.storage.from_("doctor-audio").download(storage_path)

    file_obj = io.BytesIO(audio_bytes)
    file_obj.name = storage_path.rsplit("/", 1)[-1]

    client = OpenAI(api_key=settings.openai_api_key)
    transcript = client.audio.transcriptions.create(
        model=WHISPER_MODEL,
        file=file_obj,
    )
    return transcript.text
