from fastapi import APIRouter, Depends

from app.security import require_internal_secret
from app.services.dispatch import dispatch_doctor_note, send_due_nudges

router = APIRouter(
    prefix="/internal", tags=["internal"], dependencies=[Depends(require_internal_secret)]
)


@router.post("/dispatch-whatsapp")
async def dispatch_whatsapp(payload: dict):
    """Supabase Database Webhook target for INSERT on doctor_notes."""
    record = payload.get("record") or {}
    note_id = record.get("id")
    if not note_id:
        return {"status": "error", "detail": "Missing note id"}
    return await dispatch_doctor_note(note_id)


@router.post("/send-nudges")
async def send_nudges():
    """Call once daily (cron) to send D3/D7 WhatsApp follow-up nudges."""
    results = await send_due_nudges()
    return {"sent": len(results), "results": results}
