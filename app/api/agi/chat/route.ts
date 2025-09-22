import { NextRequest, NextResponse } from "next/server";

import { ChatFlag } from "../../../lib/chatFlag";
export const runtime = "nodejs";
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

const JSON_UTF8 = { "content-type": "application/json; charset=utf-8" } as const;

function gate(req: NextRequest) {
  try {
    const allow=(process.env.CHAT_ALLOWLIST_IPS||"").split(",").map(s=>s.trim()).filter(Boolean);
    const ip=(req.headers.get("x-forwarded-for")||"").split(",")[0].trim() || (req as any).ip || req.headers.get("x-real-ip") || "";
    if(ip && allow.includes(ip)) return null;
    const tok=req.cookies.get(ChatFlag.COOKIE_NAME)?.value || "";
    const v=ChatFlag.verifyToken(tok);
    if(!v || !v.ok) return NextResponse.json({ok:false,error:"unauthorized"},{status:401,headers:JSON_UTF8});
    return null;
  } catch {
    return NextResponse.json({ok:false,error:"forbidden"},{status:403,headers:JSON_UTF8});
  }
}

export async function POST(req: NextRequest) {
  const __gate = gate(req); if (__gate) return __gate;
  let body: any = {};
  try {
    if (req.headers.get("content-type")?.includes("application/json")) {
      body = await req.json();
    }
  } catch {
    body = {};
  }

  const text = extractText(body);
  if (!text || !String(text).trim()) {
    return NextResponse.json({ error: "empty_input" }, { status: 400, headers: JSON_UTF8 });
  }

  // TODO: integrar com backend AGI real
  return NextResponse.json(
    { ok: true, reply: `👋 Olá! Recebi: ${String(text).slice(0, 200)}` },
    { headers: JSON_UTF8 }
  );
}

export function GET() {
  return NextResponse.json(
    { error: "method_not_allowed" },
    { status: 405, headers: JSON_UTF8 }
  );
}
