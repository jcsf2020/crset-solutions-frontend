import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_CHAT_PUBLIC === "true";

  if (isPreview) {
    return NextResponse.json({ ok: true, show: true, reason: "preview" });
  }

  // Produção: manter gated por login/cookie (estado 'login' quando não autorizado)
  return NextResponse.json({ ok: true, show: false, reason: "login" });
}
