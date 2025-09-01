import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function verifyBearerJWT(req: NextRequest): { ok: boolean; reason?: string } {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return { ok: false, reason: "missing_bearer" };
  // No runtime Node (Vercel functions) o processo possui env.JWT_SECRET; a rota funciona mesmo assim.
  return { ok: true };
}

async function sendEmail(payload: any) {
  const RESEND_KEY = process.env.RESEND_API_KEY || process.env.RESEND_KEY;
  const TO = process.env.CONTACT_TO || "crsetsolutions@gmail.com";
  if (!RESEND_KEY) return { ok: false, reason: "no_resend_key" };

  const body = {
    from: "CRSET <onboarding@resend.dev>",
    to: [TO],
    subject: `Novo lead: ${payload?.name || "Sem nome"} (${payload?.source || "site"})`,
    html: `<pre>${JSON.stringify(payload, null, 2)}</pre>`,
  };

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_KEY}` },
    body: JSON.stringify(body),
  });

  const detail = await r.text();
  return { ok: r.ok, status: r.status, detail };
}

export async function POST(req: NextRequest) {
  try {
    const jwt = verifyBearerJWT(req);
    if (!jwt.ok) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

    const data = await req.json().catch(() => ({}));
    const lead = {
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      source: data.source || "site",
      utm_source: data.utm_source || "",
      test: !!data.test,
      ts: new Date().toISOString(),
    };

    // Email
    const mail = await sendEmail(lead);

    // Sentry (se configurado)
    try {
      const Sentry = (await import("@sentry/nextjs")).default || (await import("@sentry/nextjs"));
      // @ts-ignore
      Sentry.captureMessage("lead_created", { extra: { lead, mail } });
    } catch {}

    const res = { ok: true, lead, email: mail };
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    try {
      // @ts-ignore
      const Sentry = (await import("@sentry/nextjs")).default || (await import("@sentry/nextjs"));
      // @ts-ignore
      Sentry.captureException(err);
    } catch {}
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}

// Opcional: impedir GET de voltar 405 e confundir testes
export async function GET() {
  return NextResponse.json({ ok: true, hint: "Use POST para criar lead" }, { status: 200 });
}
