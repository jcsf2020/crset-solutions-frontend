import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function bad(msg: string, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

function esc(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const name = String(body?.name ?? "").slice(0, 200);
    const email = String(body?.email ?? "").slice(0, 320);
    const message = String(body?.message ?? "").slice(0, 5000);
    const utm = body?.utm ?? null;
    const meta = body?.meta ?? null;
    const source = String(body?.source ?? "contact-form").slice(0, 120);

    if (!name || !email || !message) return bad("missing_fields");

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_FROM = process.env.CONTACT_FROM || "no-reply@crsetsolutions.com";
    const CONTACT_TO = process.env.CONTACT_TO || "crsetsolutions@gmail.com";
    if (!RESEND_API_KEY) return bad("missing_resend_key", 500);

    const subject = `Novo contacto CRSET • ${name}`;
    const text =
`Nome: ${name}
Email: ${email}
Fonte: ${source}

Mensagem:
${message}

UTM: ${JSON.stringify(utm)}
Meta: ${JSON.stringify(meta)}`;

    const html =
`<h2>Novo contacto CRSET</h2>
<p><b>Nome:</b> ${esc(name)}</p>
<p><b>Email:</b> ${esc(email)}</p>
<p><b>Fonte:</b> ${esc(source)}</p>
<pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${esc(message)}</pre>
<hr/>
<pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">UTM: ${esc(JSON.stringify(utm))}</pre>
<pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">Meta: ${esc(JSON.stringify(meta))}</pre>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `CRSET <${CONTACT_FROM}>`,
        to: [CONTACT_TO],
        reply_to: [email],
        subject,
        text,
        html,
        tags: [{ name: "source", value: source }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return bad(`resend_error:${err}`, 502);
    }
    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e: any) {
    return bad(`unexpected:${e?.message ?? "error"}`, 500);
  }
}
