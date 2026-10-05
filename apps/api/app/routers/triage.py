from fastapi import APIRouter, Depends, HTTPException

from app.security import require_internal_secret
from app.services.supabase_admin import get_service_client
from app.services.triage import triage_case

router = APIRouter(prefix="/internal", tags=["internal"])


@router.post("/case-photo-uploaded", dependencies=[Depends(require_internal_secret)])
async def case_photo_uploaded(payload: dict):
    """Supabase Database Webhook target for INSERT on case_photos.

    Fires on every photo upload; only runs triage once all 3 photos for a
    case exist. `case_triage` is a doctor-queue sort key only -- nothing
    computed here is ever returned to patient-facing code.
    """
    record = payload.get("record") or {}
    case_id = record.get("case_id")
    if not case_id:
        raise HTTPException(status_code=400, detail="Missing case_id in payload")

    admin = get_service_client()
    photo_count = (
        admin.table("case_photos")
        .select("id", count="exact")
        .eq("case_id", case_id)
        .execute()
    ).count

    if photo_count is None or photo_count < 3:
        return {"status": "waiting_for_more_photos", "case_id": case_id}

    result = await triage_case(case_id)
    return {"status": "triaged", "case_id": case_id, "priority": result.priority}
