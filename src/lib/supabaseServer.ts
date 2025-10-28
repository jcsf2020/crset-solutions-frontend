import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

let adminClient: SupabaseClient | null = null;

/** 
 * Creates Supabase admin client with service role key
 * For server-side operations that bypass RLS
 */
export function getSupabaseAdmin() {
  if (adminClient) return adminClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const srv = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !srv) {
    throw new Error("Supabase envs em falta em runtime (URL/SERVICE_ROLE).");
  }
  adminClient = createSupabaseClient(url, srv, { auth: { persistSession: false } });
  return adminClient;
}

/**
 * Creates Supabase client for SSR with Next.js cookies
 * For user-authenticated operations respecting RLS
 */
export function createClient() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !anonKey) {
    throw new Error("Supabase envs em falta (URL/ANON_KEY).");
  }
  
  return createSupabaseClient(url, anonKey, {
    auth: {
      persistSession: false,
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
}

// Export createClient as default as well
export default createClient;
