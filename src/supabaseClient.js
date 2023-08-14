import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const ANON_KEY =import.meta.env.VITE_ANON_KEY

const client = createClient(SUPABASE_URL, ANON_KEY)

export { client as supabaseClient }
