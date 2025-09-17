import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    debug: {
      // Variáveis para /api/contact
      resend_api_key_configured: !!process.env.RESEND_API_KEY,
      resend_from_configured: !!process.env.RESEND_FROM,
      contact_to_configured: !!process.env.CONTACT_TO,
      resend_from_value: process.env.RESEND_FROM || "NOT_SET",
      contact_to_value: process.env.CONTACT_TO || "NOT_SET",
      
      // Variáveis para /api/test-email (para comparação)
      alert_to_configured: !!process.env.ALERT_TO,
      alert_to_value: process.env.ALERT_TO || "NOT_SET",
    }
  });
}

