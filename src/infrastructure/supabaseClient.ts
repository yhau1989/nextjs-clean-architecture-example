import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

// Este cliente puede usarse tanto en server components como en route handlers.
// Para operaciones que requieran service role key, crea otro cliente con service role key y úsalo solo en servidor.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);