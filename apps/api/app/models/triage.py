from pydantic import BaseModel, Field


class TriageResult(BaseModel):
    """Doctor-queue sort key only. Never serialize this to patient-facing code."""

    possible_flags: list[str] = Field(
        description=(
            "Short internal observation tags for the doctor's own review "
            "(e.g. 'visible-discoloration', 'possible-gap', 'photo-unclear'). "
            "Not a diagnosis and never shown to the patient."
        )
    )
    priority: int = Field(
        ge=0,
        le=10,
        description="0 = routine, 10 = doctor should review this case first.",
    )
