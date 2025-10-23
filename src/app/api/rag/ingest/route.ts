export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'content-type,user-agent',
    },
  });
}

function withCORS(res: Response) { 
  res.headers.set('Access-Control-Allow-Origin','*'); 
  return res; 
}

import { embed } from "../_shared/embeddings";
import { rateLimiters, checkRateLimit, createRateLimitHeaders } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    // Check rate limit (10 req/min per IP)
    const rateLimitResult = await checkRateLimit(req, rateLimiters.rag);
    
    if (rateLimitResult && !rateLimitResult.success) {
      const headers = createRateLimitHeaders(rateLimitResult);
      return withCORS(new Response(
        JSON.stringify({ 
          ok: false,
          error: "rate_limit_exceeded", 
          message: "Too many requests. Please try again later.",
          ...headers
        }), 
        { status: 429, headers }
      ));
    }

    const { id, source, text } = await req.json();
    if (!text) {
      return withCORS(new Response(
        JSON.stringify({ error: "text is required" }), 
        { status: 400 }
      ));
    }

    const v = await embed(text);
    
    const response = withCORS(new Response(
      JSON.stringify({ ok: true, id, source, dim: v.length }), 
      { status: 200 }
    ));

    // Add rate limit headers to successful response
    if (rateLimitResult) {
      const headers = createRateLimitHeaders(rateLimitResult);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }

    return response;
  } catch (e: any) {
    return withCORS(new Response(
      JSON.stringify({ error: e.message || "ingest failed" }), 
      { status: 500 }
    ));
  }
}

