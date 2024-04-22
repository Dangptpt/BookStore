from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Accessing environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

url: str = SUPABASE_URL
key: str = SUPABASE_SECRET_KEY

def get_supabase():
    supabase: Client = create_client(url, key)
    return supabase