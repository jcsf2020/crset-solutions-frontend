import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    step: "start",
    errors: []
  };

  try {
    // 1. Parse body
    debug.step = "parsing_body";
    const body = await req.json().catch((e) => {
      debug.errors.push(`Body parse error: ${e.message}`);
      return {};
    });
    debug.body_received = body;

    // 2. Check required fields
    debug.step = "validating_fields";
    const { name, email, message } = body;
    if (!name || !email || !message) {
      debug.errors.push("Missing required fields");
      return NextResponse.json({ debug, ok: false, error: "bad_request" });
    }

    // 3. Check Supabase env vars
    debug.step = "checking_supabase_env";
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    debug.supabase_configured = {
      url: !!supabaseUrl,
      key: !!serviceKey,
      url_preview: supabaseUrl ? supabaseUrl.substring(0, 30) + "..." : "NOT_SET"
    };

    if (!supabaseUrl || !serviceKey) {
      debug.errors.push("Supabase not configured");
      return NextResponse.json({ debug, ok: false, error: "supabase_unconfigured" });
    }

    // 4. Try Supabase insert
    debug.step = "inserting_supabase";
    const supabaseData = {
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    };

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

      debug.supabase_response = {
        status: ins.status,
        ok: ins.ok,
        statusText: ins.statusText
      };

      if (!ins.ok) {
        const detail = await ins.text().catch(() => "");
        debug.supabase_error = detail;
        debug.errors.push(`Supabase insert failed: ${ins.status}`);
      } else {
        debug.supabase_success = true;
      }
    } catch (supabaseError: any) {
      debug.errors.push(`Supabase exception: ${supabaseError.message}`);
    }

    // 5. Check Resend env vars
    debug.step = "checking_resend_env";
    const from = process.env.RESEND_FROM || "CRSET <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO || process.env.ALERT_TO || "crsetsolutions@gmail.com";
    const key = process.env.RESEND_API_KEY;

    debug.resend_configured = {
      key: !!key,
      from: from,
      to: to,
      key_preview: key ? key.substring(0, 10) + "..." : "NOT_SET"
    };

    if (!key) {
      debug.errors.push("RESEND_API_KEY not configured");
      return NextResponse.json({ debug, ok: false, error: "resend_unconfigured" });
    }

    // 6. Try Resend email
    debug.step = "sending_email";
    try {
      const resend = new Resend(key);
      const result = await resend.emails.send({
        from,
        to,
        subject: `DEBUG lead: ${name}`,
        text: `DEBUG EMAIL TEST\n\nNome: ${name}\nEmail: ${email}\nMensagem: ${message}\n\nTimestamp: ${debug.timestamp}`,
      });

      debug.resend_response = result;
      debug.resend_success = true;
    } catch (resendError: any) {
      debug.errors.push(`Resend exception: ${resendError.message}`);
      debug.resend_error = resendError.message;
    }

    debug.step = "completed";
    return NextResponse.json({ debug, ok: debug.errors.length === 0 });

  } catch (e: any) {
    debug.errors.push(`General exception: ${e.message}`);
    debug.step = "failed";
    return NextResponse.json({ debug, ok: false, error: "general_error" });
  }
}

