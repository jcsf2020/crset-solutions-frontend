import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import * as Sentry from "@sentry/nextjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { 
  name?: string; 
  email?: string; 
  message?: string; 
  phone?: string;
  source?: string;
  utm?: string | object; 
  metadata?: object;
};

function bad(msg: string, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

export async function POST(req: Request) {
  try {
    const { name, email, message, phone, source, utm, metadata }: Body = await req.json().catch(() => ({} as any));
    if (!name || !email || !message) return bad("bad_request");

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) return bad("supabase_unconfigured", 503);

    // Processar UTM - aceitar string JSON ou objeto
    let utmProcessed: object | null = null;
    if (utm) {
      if (typeof utm === 'string') {
        try {
          utmProcessed = JSON.parse(utm);
        } catch {
          // Se não conseguir fazer parse, manter como string
          utmProcessed = { raw: utm };
        }
      } else if (typeof utm === 'object') {
        utmProcessed = utm;
      }
    }

    // Preparar dados para Supabase - defensivo para colunas que podem existir
    const supabaseData: any = {
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    };

    // Adicionar campos opcionais se fornecidos
    if (phone) supabaseData.phone = phone;
    if (source) supabaseData.source = source;
    if (utmProcessed) supabaseData.utm = utmProcessed;
    if (metadata) supabaseData.metadata = metadata;

    // Preencher colunas UTM individuais se existirem no objeto UTM
    if (utmProcessed && typeof utmProcessed === 'object') {
      const utmObj = utmProcessed as any;
      if (utmObj.utm_source) supabaseData.utm_source = utmObj.utm_source;
      if (utmObj.utm_medium) supabaseData.utm_medium = utmObj.utm_medium;
      if (utmObj.utm_campaign) supabaseData.utm_campaign = utmObj.utm_campaign;
      if (utmObj.utm_content) supabaseData.utm_content = utmObj.utm_content;
    }

    // 1) Insert em Supabase (REST) com Service Role
    try {
      const ins = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(supabaseData),
        cache: "no-store",
      });

      if (!ins.ok) {
        const detail = await ins.text().catch(() => "");
        Sentry.captureException(new Error(`Supabase insert failed: ${ins.status} ${detail}`));
        return NextResponse.json({ ok: false, error: "supabase_insert_failed", detail }, { status: 500 });
      }
    } catch (supabaseError: any) {
      Sentry.captureException(supabaseError);
      return NextResponse.json({ ok: false, error: "supabase_error", detail: String(supabaseError?.message || supabaseError) }, { status: 500 });
    }

    // 2) Email via Resend
    const from = process.env.RESEND_FROM;
    const to = process.env.CONTACT_TO;
    const key = process.env.RESEND_API_KEY;
    if (!key || !from || !to) {
      // Sem email, mas lead gravado: responder 200 com nota
      return NextResponse.json({ ok: true, note: "resend_unconfigured" });
    }

    try {
      // Formatar UTM e Source para o email
      let utmFormatted = "N/A";
      if (utmProcessed) {
        utmFormatted = JSON.stringify(utmProcessed, null, 2);
      }

      const sourceFormatted = source || "N/A";
      const phoneFormatted = phone || "N/A";

      await resend?.emails.send({
        from,
        to,
        subject: `Novo lead: ${name}`,
        text: `Nome: ${name}
Email: ${email}
Telefone: ${phoneFormatted}
Source: ${sourceFormatted}

UTM Data:
${utmFormatted}

Mensagem:
${message}

${metadata ? `\nMetadata:\n${JSON.stringify(metadata, null, 2)}` : ''}`,
      });
    } catch (resendError: any) {
      Sentry.captureException(resendError);
      // Email falhou mas lead foi gravado - ainda é sucesso
      return NextResponse.json({ ok: true, note: "email_failed" });
    }

    // Flush Sentry para garantir que eventos são enviados
    await Sentry.flush(2000);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    Sentry.captureException(e);
    await Sentry.flush(2000);
    return NextResponse.json({ ok: false, error: "contact_error", detail: String(e?.message || e) }, { status: 500 });
  }
}

// Opcional: health check
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "contact" });
}
