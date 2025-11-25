import OpenAI from "openai";
import { NextResponse } from "next/server";
import { checkChatGate } from "@/lib/chat/gate";
import { captureException } from "@sentry/nextjs";
import { CRSET_SYSTEM_PROMPT } from "@/lib/prompts/crset-assistant";

export async function POST(req: Request) {
  const gate = await checkChatGate(req);
  if (!gate?.allowed) {
    return NextResponse.json(
      { ok: false, error: "forbidden", reason: gate?.reason || "no_cookie" },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const message = body.message || body.text || body.messages?.[0]?.content;
  if (!message) {
    return NextResponse.json(
      { ok: false, error: "bad_request", message: "Missing message/text" },
      { status: 400 }
    );
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
    baseURL: process.env.AGI_OPENAI_BASE_URL || "https://api.openai.com/v1",
  });

  try {
    const completion = await client.chat.completions.create({
      model: process.env.AGI_OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: CRSET_SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content || "";
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    captureException(err);
    // console.error("chat_error", err);
    return NextResponse.json(
      { ok: false, error: "internal_server_error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/chat" });
}
