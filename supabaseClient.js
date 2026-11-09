// Connection to our Supabase database, shared by every page.
// Find these in Supabase: Project Settings -> API Keys (and Data API for the URL).
// Only use the publishable / anon key here. NEVER put the secret / service_role key in this file.
const SUPABASE_URL = "https://tonbbyywtpzduvjdudly.supabase.co";
const SUPABASE_KEY = "sb_publishable_xiZD9gjScOqPLjBOYKPigg_jFqXci65";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
