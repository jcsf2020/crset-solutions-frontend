import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SRV = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(URL, SRV, {
  auth: { persistSession: false },
});
