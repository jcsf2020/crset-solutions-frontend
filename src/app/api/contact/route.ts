import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/validators";
import { apiErrorHandler } from "@/lib/apiErrorHandler";
import { requiredEnv } from "@/lib/env";

export const dynamic = "force-dynamic";



function esc(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, phone } = ContactFormSchema.parse(body);
    
    const RESEND_API_KEY = requiredEnv("RESEND_API_KEY");
    const CONTACT_FROM = process.env.CONTACT_FROM || "no-reply@crsetsolutions.com";
    const CONTACT_TO = process.env.CONTACT_TO || "crsetsolutions@gmail.com";

    const subject = `Novo contacto CRSET • ${name}`;
    const text = `Nome: ${name}
Email: ${email}
Telefone: ${phone || "N/A"}
Mensagem:
${message}`;

    const html = `<h2>Novo contacto CRSET</h2>
<p><b>Nome:</b> ${esc(name)}</p>
<p><b>Email:</b> ${esc(email)}</p>
<p><b>Telefone:</b> ${esc(phone || "N/A")}</p>
<hr/>
<pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${esc(message)}</pre>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { ok: false, error: "email_failed", detail: error },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e: unknown) {
    return apiErrorHandler(e);
  }
}
