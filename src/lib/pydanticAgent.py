from typing import List, Optional
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext

# Define structured output models for clinical triage
class DentalTriageResult(BaseModel):
  symptoms_summary: str = Field(description="Summary of the patient's dental complaints")
  preliminary_assessment: str = Field(description="Potential dental issues, e.g., root canal, pulpitis, sensitivity")
  suggested_treatment: str = Field(description="Name of the treatment recommended from the clinic's offering")
  estimated_cost_inr: str = Field(description="Price range in Rupees (INR) for the treatment in Ludhiana")
  patient_name: Optional[str] = Field(None, description="Extracted name of the patient")
  patient_phone: Optional[str] = Field(None, description="Extracted phone number of the patient")
  urgency_level: str = Field(description="Triage urgency: Low, Medium, High (e.g. high for swelling or bleeding)")

# Define the Agent's dependencies (e.g. database connections, config)
class ClinicInfo(BaseModel):
  clinic_name: str = "Arvind Dental Clinic"
  location: str = "Model Town, Ludhiana, Punjab"
  hours: str = "Mon-Fri: 9:30 AM - 7:30 PM, Sat: 9:30 AM - 5:00 PM"
  contact_number: str = "+91 88476-51364"

# Initialize the PydanticAI Agent
# We use gemini-1.5-pro or gemini-2.0-flash as the model.
dental_triage_agent = Agent(
  'google-gla:gemini-1.5-pro',
  deps_type=ClinicInfo,
  result_type=DentalTriageResult,
  system_prompt=(
    "You are the senior digital clinical coordinator for Arvind Dental Clinic in Ludhiana, Punjab. "
    "Your objective is to converse with patients reporting dental symptoms, analyze their complaints, "
    "provide friendly education about treatments (like laser root canals, titanium implants, veneers), "
    "state the estimated local pricing in Rupees, and collect their name and phone to book a callback. "
    "Be reassuring, professional, and emphasize the presence of MDS specialists. "
    "Always return the structured output matching DentalTriageResult once symptoms and contact details are collected."
  )
)

# Tool 1: Retrieve pricing and specialist guidelines
@dental_triage_agent.tool
def get_treatment_pricing(ctx: RunContext[ClinicInfo], treatment_name: str) -> str:
  """Get local pricing ranges and specialist details for a given treatment."""
  treatments = {
    "root canal": "₹3,500 - ₹6,500 (completed in single sitting of 45 mins by MDS Endodontist)",
    "implant": "₹15,000 - ₹35,000 per implant post (Korean Osstem / Swiss Straumann by MDS Prosthodontist)",
    "veneers": "₹8,000 - ₹12,000 per tooth (IPS E-Max porcelain veneers by MDS Aesthetic Specialist)",
    "aligners": "₹45,000 - ₹1,20,000 (Certified invisible braces by MDS Orthodontist)"
  }
  
  treatment_key = treatment_name.lower()
  for key, details in treatments.items():
    if key in treatment_key:
      return f"At {ctx.deps.clinic_name} in {ctx.deps.location}, the cost for {key} is {details}."
  
  return f"Consultation fee is ₹0 for first-time website bookings. Please contact us at {ctx.deps.contact_number} for specific quotes."

# Tool 2: Check operating schedule
@dental_triage_agent.tool
def get_clinic_hours(ctx: RunContext[ClinicInfo]) -> str:
  """Get the opening hours and address of the Ludhiana facility."""
  return f"{ctx.deps.clinic_name} is located at {ctx.deps.location}. Hours: {ctx.deps.hours}."

# Tool 3: Register lead in database
@dental_triage_agent.tool
def save_appointment_lead(ctx: RunContext[ClinicInfo], name: str, phone: str, treatment: str) -> str:
  """Saves a lead booking directly to the local clinical database."""
  # In production, this writes to Supabase, Firebase, or an API database.
  print(f"[DATABASE] Saved lead: {name} | {phone} | Treatment: {treatment}")
  return f"Lead successfully booked for {name} ({phone}). A coordinator will call back within 15 minutes."

# Example Usage (How to invoke the agent in FastAPI/Python):
"""
if __name__ == "__main__":
  clinic_deps = ClinicInfo()
  
  # Patient query simulation
  user_message = (
    "My back molar has a sharp pain when drinking cold water. "
    "My name is Sukhwinder Singh and my phone is 98765-43210. "
    "How much does a root canal cost at your clinic?"
  )
  
  result = dental_triage_agent.run_sync(user_message, deps=clinic_deps)
  print("Preliminary Diagnostic Report:")
  print(result.data.model_dump_json(indent=2))
"""
