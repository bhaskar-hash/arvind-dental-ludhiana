from fastapi import APIRouter, Depends

from app.security import require_internal_secret
from app.services.transcription import transcribe_doctor_note

router = APIRouter(prefix="/internal", tags=["internal"], dependencies=[Depends(require_internal_secret)])


@router.post("/transcribe")
async def transcribe(payload: dict):
    """Called by the doctor dashboard after a voice note upload completes.

    Downloads the audio from the private `doctor-audio` bucket and returns
    a Whisper transcript for the doctor to review before it's attached to
    the case and dispatched over WhatsApp.
    """
    storage_path = payload["storage_path"]
    transcript = transcribe_doctor_note(storage_path)
    return {"transcript": transcript}
