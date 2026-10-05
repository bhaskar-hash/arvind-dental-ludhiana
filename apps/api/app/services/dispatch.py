from datetime import datetime, timezone

from app.config import settings
from app.services.supabase_admin import get_service_client
from app.services.whatsapp import WhatsAppDispatchError, send_whatsapp_template

NUDGE_THRESHOLDS = {"nudge_d3": 3, "nudge_d7": 7}


async def dispatch_doctor_note(note_id: str) -> dict:
    """Send the doctor's voice note to the patient over WhatsApp and log it.

    Triggered by a Supabase Database Webhook on doctor_notes INSERT.
    """
    admin = get_service_client()

    note = (
        admin.table("doctor_notes")
        .select(
            "*, cases(id, patients(phone), family_members(full_name))",
        )
        .eq("id", note_id)
        .single()
        .execute()
    ).data

    case = note["cases"]
    phone = case["patients"]["phone"]
    family_name = case["family_members"]["full_name"]

    try:
        message_id = await send_whatsapp_template(
            phone=phone,
            campaign_name=settings.aisensy_doctor_note_campaign,
            user_name=family_name,
            template_params=[family_name],
            media_url=note["audio_url"],
        )
        status = "sent"
    except WhatsAppDispatchError:
        message_id = None
        status = "failed"

    admin.table("whatsapp_log").insert(
        {
            "case_id": case["id"],
            "message_type": "doctor_note",
            "status": status,
            "provider_message_id": message_id,
            "sent_at": datetime.now(timezone.utc).isoformat(),
        }
    ).execute()

    if status == "sent":
        admin.table("cases").update({"status": "sent"}).eq("id", case["id"]).execute()

    return {"case_id": case["id"], "status": status}


async def send_due_nudges() -> list[dict]:
    """Send D3/D7 WhatsApp follow-up nudges for cases still awaiting booking.

    Meant to be called once daily by an external cron hitting
    /internal/send-nudges -- there's no scheduler running inside this API.
    """
    admin = get_service_client()

    sent_cases = (
        admin.table("cases")
        .select("id, patients(phone), family_members(full_name)")
        .eq("status", "sent")
        .execute()
    ).data

    if not sent_cases:
        return []

    case_ids = [c["id"] for c in sent_cases]

    dispatch_logs = (
        admin.table("whatsapp_log")
        .select("case_id, message_type, sent_at")
        .in_("case_id", case_ids)
        .execute()
    ).data

    logs_by_case: dict[str, list[dict]] = {}
    for log in dispatch_logs:
        logs_by_case.setdefault(log["case_id"], []).append(log)

    now = datetime.now(timezone.utc)
    results: list[dict] = []

    for case in sent_cases:
        case_logs = logs_by_case.get(case["id"], [])
        dispatch_log = next(
            (log for log in case_logs if log["message_type"] == "doctor_note"), None
        )
        if not dispatch_log:
            continue

        dispatched_at = datetime.fromisoformat(dispatch_log["sent_at"])
        days_elapsed = (now - dispatched_at).days

        for message_type, threshold in NUDGE_THRESHOLDS.items():
            already_sent = any(log["message_type"] == message_type for log in case_logs)
            if days_elapsed < threshold or already_sent:
                continue

            phone = case["patients"]["phone"]
            family_name = case["family_members"]["full_name"]
            campaign = getattr(settings, f"aisensy_{message_type}_campaign")

            try:
                message_id = await send_whatsapp_template(
                    phone=phone,
                    campaign_name=campaign,
                    user_name=family_name,
                    template_params=[family_name],
                )
                status = "sent"
            except WhatsAppDispatchError:
                message_id = None
                status = "failed"

            admin.table("whatsapp_log").insert(
                {
                    "case_id": case["id"],
                    "message_type": message_type,
                    "status": status,
                    "provider_message_id": message_id,
                    "sent_at": now.isoformat(),
                }
            ).execute()

            results.append(
                {"case_id": case["id"], "message_type": message_type, "status": status}
            )

    return results
