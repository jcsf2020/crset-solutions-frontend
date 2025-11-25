export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { getCORSHeaders } from '@/lib/cors';

export async function OPTIONS(req: Request) {
  const origin = new URL(req.url).origin;
  const headers = getCORSHeaders(origin);
  return new Response(null, {
    status: 204,
    headers,
  });
}

function withCORS(res: Response, origin: string | null) { 
  const headers = getCORSHeaders(origin);
  Object.entries(headers).forEach(([key, value]) => {
    if (value) res.headers.set(key, value);
  });
  return res; 
}

import { embed } from "../_shared/embeddings";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { z } from 'zod';
import { apiErrorHandler } from '@/lib/apiErrorHandler';

const QuerySchema = z.object({
  message: z.string().min(1).max(1000),
  match_count: z.number().min(1).max(10).default(3),
  similarity_threshold: z.number().min(0).max(1).default(0.2),
});

export async function POST(req: Request) {
  try {
    const origin = new URL(req.url).origin;
    const body = await req.json();
    const { message, match_count, similarity_threshold } = QuerySchema.parse(body);
    
    if (!message) {
      return withCORS(new Response(
        JSON.stringify({ error: "message is required" }), 
        { status: 400 }
      ), origin);
    }

    // Generate embedding for the query
    const queryEmbedding = await embed(message);
    
    // Search in Supabase using RPC function
    const supabase = getSupabaseAdmin();
    const { data: matches, error } = await supabase.rpc('match_documents', {
      query_embedding: JSON.stringify(queryEmbedding),
      match_threshold: similarity_threshold,
      match_count: match_count
    });

    if (error) {
      // console.error('Supabase RPC error:', error);
      
      // If function doesn't exist, return helpful error
      if (error.message.includes('function') && error.message.includes('does not exist')) {
      return withCORS(new Response(
        JSON.stringify({ 
          ok: false,
          error: "database_not_configured",
          message: "RAG database not configured. Please run setup-supabase.sql first.",
          hint: "See scripts/rag-ingestion/setup-supabase.sql"
        }), 
        { status: 500 }
      ), origin);
    }
      
    return withCORS(new Response(
      JSON.stringify({ 
        ok: false,
        error: "query_failed",
        message: error.message 
      }), 
        { status: 500 }
      ), origin);
    }

    return withCORS(new Response(
      JSON.stringify({ 
        ok: true, 
        dim: queryEmbedding.length,
        match_count,
        similarity_threshold,
        matches: matches || []
      }), 
      { status: 200 }
    ), origin);
} catch (e: unknown) {
    return apiErrorHandler(e);
  }
}

