/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";

const AUTH = process.env.AGI_API_KEY || "";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type, authorization, x-agi-api-key",
};

function unauthorized() {
  return new NextResponse("unauthorized", { status: 401, headers: CORS_HEADERS });
}

function withCorsJson(body: any, init?: ResponseInit) {
  const headers = new Headers(init?.headers || {});
  Object.entries(CORS_HEADERS).forEach(([k, v]) => headers.set(k, v));
  return NextResponse.json(body, { ...init, headers });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  // Same policy as /api/agi/stream
  let key =
    req.headers.get("authorization") ||
    req.headers.get("x-agi-api-key") ||
    "";

  // Support "Bearer <token>" or raw token
  key = key.toString();
  if (key.toLowerCase().startsWith("bearer ")) key = key.slice(7).trim();

  if (!AUTH || key !== AUTH) return unauthorized();

  // Keep current behavior: respond PONG (non-stream)
  let input = "";
  try {
    const j = await req.json();
    input = (j?.input ?? "").toString();
  } catch {}

  const message = /pong/i.test(input) ? "PONG" : "PONG";

  return withCorsJson({
    ok: true,
    backend: "openai",
    gated: true,
    model: process.env.AGI_OPENAI_MODEL || "llama-3.3-70b-versatile",
    message,
  });
}
