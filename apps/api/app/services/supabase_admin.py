from functools import lru_cache

from supabase import Client, create_client

from app.config import settings


@lru_cache
def get_service_client() -> Client:
    """Service-role client. Bypasses RLS -- only used by internal/doctor-side code."""
    return create_client(settings.supabase_url, settings.supabase_service_role_key)
