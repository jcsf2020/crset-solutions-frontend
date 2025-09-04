import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { name?: string; email?: string; message?: string; utm?: string };

function bad(msg: string, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

export async function POST(req: Request) {
  try {
    const { name, email, message, utm }: Body = await req.json().catch(() => ({} as any));
    if (!name || !email || !message) return bad("bad_request");

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) return bad("supabase_unconfigured", 503);

    // 1) Insert em Supabase (REST) com Service Role
    const ins = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        utm: utm || null,
        created_at: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!ins.ok) {
      const detail = await ins.text().catch(() => "");
      return NextResponse.json({ ok: false, error: "supabase_insert_failed", detail }, { status: 500 });
    }

    // 2) Email via Resend
    const from = process.env.RESEND_FROM;
    const to = process.env.CONTACT_TO;
    const key = process.env.RESEND_API_KEY;
    if (!key || !from || !to) {
      // Sem email, mas lead gravado: responder 200 com nota
      return NextResponse.json({ ok: true, note: "resend_unconfigured" });
    }

    await resend?.emails.send({
      from,
      to,
      subject: `Novo lead: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nUTM: ${utm || "-"}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: "contact_error", detail: String(e?.message || e) }, { status: 500 });
  }
}

// Opcional: health check
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "contact" });
}
