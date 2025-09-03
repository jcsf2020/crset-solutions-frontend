import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SRV = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!URL) throw new Error('NEXT_PUBLIC_SUPABASE_URL ausente');
if (!SRV) throw new Error('SUPABASE_SERVICE_ROLE_KEY/SECRET ausente');

export function supabaseAdmin() {
  return createClient(URL, SRV, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: fetch as any },
  });
}
