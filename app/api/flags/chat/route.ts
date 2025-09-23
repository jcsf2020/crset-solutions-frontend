import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { ChatFlag } from "../../../lib/chatFlag";

export const dynamic = "force-dynamic";

function getIP(): string | null {
  const h = headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || null;
  const cf = h.get("cf-connecting-ip");
  if (cf) return cf;
  const real = h.get("x-real-ip");
  if (real) return real;
  return null;
}

function inAllowlistIP(ip: string | null): boolean {
  if (!ip) return false;
  const raw = process.env.CHAT_ALLOWLIST_IPS || "";
  const list = raw.split(",").map(s => s.trim()).filter(Boolean);
  return list.includes(ip);
}

export async function GET() {
  const resInit: ResponseInit = {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  // 1) Preview / público: liberar SEM login
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_CHAT_PUBLIC === "true" ||
    process.env.CHAT_PUBLIC === "true";

  if (isPreview) {
    return new NextResponse(JSON.stringify({ ok: true, allowed: true, reason: "preview" }), resInit);
  }

  // 2) Produção: allowlist de IP opcional
  const ip = getIP();
  if (inAllowlistIP(ip)) {
    return new NextResponse(JSON.stringify({ ok: true, allowed: true, reason: "allowlist_ip" }), resInit);
  }

  // 3) Produção: exigir segredo + cookie assinado
  if (!process.env.CHAT_FLAG_SECRET) {
    return new NextResponse(JSON.stringify({ ok: true, allowed: false, reason: "secret_missing" }), resInit);
  }

  const tok = cookies().get(ChatFlag.COOKIE_NAME)?.value;
  if (!tok) {
    return new NextResponse(JSON.stringify({ ok: true, allowed: false, reason: "no_cookie" }), resInit);
  }

  const v = ChatFlag.verifyToken(tok);
  if (!v.ok) {
    return new NextResponse(JSON.stringify({ ok: true, allowed: false, reason: v.reason }), resInit);
  }

  return new NextResponse(JSON.stringify({ ok: true, allowed: true, reason: "valid" }), resInit);
}
