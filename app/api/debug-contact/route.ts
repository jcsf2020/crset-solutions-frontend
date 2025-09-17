import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;
  const contactTo = process.env.CONTACT_TO;
  
  return NextResponse.json({
    ok: true,
    debug: {
      resend_api_key_configured: !!resendKey,
      resend_from_configured: !!resendFrom,
      contact_to_configured: !!contactTo,
      resend_from_value: resendFrom ? resendFrom.substring(0, 10) + "..." : null,
      contact_to_value: contactTo ? contactTo.substring(0, 10) + "..." : null,
    }
  });
}

