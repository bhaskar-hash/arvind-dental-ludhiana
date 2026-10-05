from pydantic_ai import Agent, BinaryContent
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

from app.config import settings
from app.models.triage import TriageResult
from app.services.supabase_admin import get_service_client

TRIAGE_MODEL_NAME = "gemini-2.0-flash"

SYSTEM_PROMPT = """
You are assisting a licensed dentist (Dr. Arvind Sahu, MDS Prosthodontics) by
pre-sorting incoming patient photo submissions into his personal review
queue. You are NOT diagnosing anything, and this output is never shown to
patients -- it only helps the doctor decide which cases to look at first.

You will be shown three photos of a patient's mouth: upper arch, lower arch,
and front bite. Produce:
- possible_flags: short, plain, non-clinical observation tags for the
  doctor's own attention (e.g. "visible-discoloration", "possible-gap",
  "photo-unclear", "visible-plaque"). These are sorting hints, not findings.
- priority: an integer 0-10, where higher means the doctor should look at
  this case sooner (e.g. visible swelling or pain-adjacent cues would be
  higher; a routine-looking check-in would be lower).

Never use the words "diagnosis" or name a dental condition with clinical
certainty. If a photo is blurry, dark, or unusable, include "photo-unclear"
and keep priority low.
"""


def _build_agent() -> Agent[None, TriageResult]:
    model = GoogleModel(
        TRIAGE_MODEL_NAME,
        provider=GoogleProvider(api_key=settings.gemini_api_key),
    )
    return Agent(model, output_type=TriageResult, system_prompt=SYSTEM_PROMPT)


def _media_type_for(storage_path: str) -> str:
    ext = storage_path.rsplit(".", 1)[-1].lower()
    return "image/png" if ext == "png" else "image/jpeg"


async def triage_case(case_id: str) -> TriageResult:
    admin = get_service_client()

    photos = (
        admin.table("case_photos")
        .select("photo_type, storage_path")
        .eq("case_id", case_id)
        .execute()
    ).data

    if len(photos) < 3:
        raise ValueError(f"Case {case_id} does not have all 3 photos yet")

    contents: list[str | BinaryContent] = ["Review these three photos:"]
    for photo in photos:
        file_bytes = admin.storage.from_("case-photos").download(photo["storage_path"])
        contents.append(
            BinaryContent(
                data=file_bytes,
                media_type=_media_type_for(photo["storage_path"]),
            )
        )

    agent = _build_agent()
    result = await agent.run(contents)

    admin.table("case_triage").upsert(
        {
            "case_id": case_id,
            "possible_flags": result.output.possible_flags,
            "priority": result.output.priority,
            "model": TRIAGE_MODEL_NAME,
        }
    ).execute()

    return result.output
