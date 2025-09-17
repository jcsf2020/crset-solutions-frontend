import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { Resend } from "resend";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : undefined;

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

// Função para normalizar UTM (objeto/string)
function parseUtm(utm: string | object | undefined): object | null {
  if (!utm) return null;
  
  if (typeof utm === 'string') {
    try {
      return JSON.parse(utm);
    } catch {
      return { raw: utm };
    }
  }
  
  if (typeof utm === 'object') {
    return utm;
  }
  
  return null;
}

export async function POST(req: Request) {
  try {
    const { name, email, message, phone, source, utm, metadata }: Body = await req.json().catch(() => ({} as any));
    if (!name || !email || !message) return bad("bad_request");

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) return bad("supabase_unconfigured", 503);

    // Processar UTM - aceitar string JSON ou objeto
    const utmProcessed = parseUtm(utm);

    // Embeber metadata em utm._metadata se ambos existirem
    let finalUtm = utmProcessed;
    if (utmProcessed && metadata) {
      finalUtm = { ...utmProcessed, _metadata: metadata };
    } else if (!utmProcessed && metadata) {
      finalUtm = { _metadata: metadata };
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
    if (finalUtm) supabaseData.utm = finalUtm;

    // Preencher colunas UTM individuais se existirem no objeto UTM (defensivo)
    if (finalUtm && typeof finalUtm === 'object') {
      const utmObj = finalUtm as any;
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
        await Sentry.flush(2000);
        // Sempre retornar {"ok": true} mesmo em falhas
        return NextResponse.json({ ok: true });
      }
    } catch (supabaseError: any) {
      Sentry.captureException(supabaseError);
      await Sentry.flush(2000);
      // Sempre retornar {"ok": true} mesmo em falhas
      return NextResponse.json({ ok: true });
    }

    // 2) Email via Resend
    const from = process.env.RESEND_FROM || "CRSET <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO || process.env.ALERT_TO || "crsetsolutions@gmail.com";
    const key = process.env.RESEND_API_KEY;
    if (!key || !from || !to) {
      // Sem email, mas lead gravado: responder 200
      return NextResponse.json({ ok: true });
    }

    try {
      // Formatar UTM e Source para o email (JSON pretty)
      let utmFormatted = "N/A";
      if (finalUtm) {
        utmFormatted = JSON.stringify(finalUtm, null, 2);
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
${message}`,
      });
    } catch (resendError: any) {
      Sentry.captureException(resendError);
      await Sentry.flush(2000);
      // Email falhou mas lead foi gravado - ainda é sucesso
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    Sentry.captureException(e);
    await Sentry.flush(2000);
    // Sempre retornar {"ok": true} mesmo em erros gerais
    return NextResponse.json({ ok: true });
  }
}

// Opcional: health check
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "contact" });
}
