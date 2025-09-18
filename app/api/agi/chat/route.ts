import { NextRequest, NextResponse } from "next/server";

function extractText(body: any) {
  if (!body) return null;
  if (typeof body === "string") return body;

  const fromMessages =
    Array.isArray(body.messages)
      ? body.messages
          .map((m: any) => (typeof m === "string" ? m : (m?.content ?? "")))
          .filter(Boolean)
          .join("\n")
      : null;

  return body.text ?? body.message ?? body.prompt ?? fromMessages ?? null;
}

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    if (req.headers.get("content-type")?.includes("application/json")) {
      body = await req.json();
    }
  } catch { body = {}; }

  const text = extractText(body);
  if (!text || !String(text).trim()) {
    return NextResponse.json({ error: "empty_input" }, { status: 400 });
  }

  // TODO: integrar com backend AGI real
  return NextResponse.json({
    ok: true,
    reply: `👋 Olá! Recebi: ${String(text).slice(0, 200)}`
  });
}

export function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 });
}
