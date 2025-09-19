import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function send({ to, subject, text }: { to: string; subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "CRSET <crsetsolutions@gmail.com>";
  if (!apiKey) return NextResponse.json({ error: "resend_key_missing" }, { status: 500 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text }),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return NextResponse.json({ ok: false, status: res.status, error: err || "send_failed" }, { status: 502 });
  }

  const json = await res.json().catch(() => ({}));
  return NextResponse.json({ ok: true, id: json?.id ?? null });
}

export async function POST(req: Request) {
  const { to, subject, text } = await req.json().catch(() => ({} as any));
  if (!to || !subject || !text) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  return send({ to, subject, text });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to") || "";
  const subject = searchParams.get("subject") || "";
  const text = searchParams.get("text") || "";
  if (!to || !subject || !text) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  return send({ to, subject, text });
}
