/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type, authorization, x-agi-api-key",
};

const getAuth = () => (process.env.AGI_API_KEY || "").trim();

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
  // Read auth at request-time (preview env fix)
  const AUTH = getAuth();

  let key =
    req.headers.get("authorization") ||
    req.headers.get("x-agi-api-key") ||
    "";

  key = key.toString();
  if (key.toLowerCase().startsWith("bearer ")) key = key.slice(7);
  key = key.trim();

  if (!AUTH || key !== AUTH) return unauthorized();

  // Keep simple PONG response
  let input = "";
  try {
    const j = await req.json();
    input = (j?.input ?? "").toString();
  } catch {}

  return withCorsJson({
    ok: true,
    backend: "openai",
    gated: true,
    model: process.env.AGI_OPENAI_MODEL || "llama-3.3-70b-versatile",
    message: "PONG",
  });
}
