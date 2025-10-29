export const runtime = "edge";

type ChatBody = { message?: string; system?: string };

function pick<T>(...vals: (T | undefined)[]) {
  for (const v of vals) if (v) return v;
  return undefined;
}

export async function POST(req: Request) {
  let body: ChatBody = {};
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return Response.json({ ok: false, error: "bad_request", message: "Invalid JSON body" }, { status: 400 });
  }

  const message = body?.message?.toString().trim();
  if (!message) {
    return Response.json({ ok: false, error: "bad_request", message: "Missing 'message'" }, { status: 400 });
  }

  const apiKey =
    pick<string>(
      process.env.OPENAI_API_KEY,
      process.env.GROQ_API_KEY,
      process.env.AGI_OPENAI_KEY
    ) || "";

  if (!apiKey) {
    return Response.json({ ok: false, error: "missing_api_key" }, { status: 500 });
  }

  const base =
    pick<string>(
      process.env.OPENAI_BASE_URL,
      process.env.AGI_OPENAI_BASE_URL,
      process.env.AGI_UPSTREAM_BASE
    ) || "https://api.groq.com/openai/v1";

  const model =
    pick<string>(
      process.env.OPENAI_MODEL,
      process.env.AGI_OPENAI_MODEL
    ) || "llama-3.3-70b-versatile";

  try {
    const r = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: body.system || "You are the CRSET Assistant. Be concise and helpful in PT-PT by default.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const rawText = await r.text();
    let json: any;
    try {
      json = JSON.parse(rawText);
    } catch {
      return Response.json(
        { ok: false, error: "upstream_invalid_json", status: r.status, body: rawText.slice(0, 500) },
        { status: 502 }
      );
    }

    if (!r.ok) {
      return Response.json(
        { ok: false, error: "upstream_error", status: r.status, body: json },
        { status: 502 }
      );
    }

    const content =
      json?.choices?.[0]?.message?.content ??
      json?.choices?.[0]?.text ?? "";

    return Response.json({ ok: true, content });
  } catch (e: any) {
    return Response.json(
      { ok: false, error: "exception", message: e?.message ?? "unknown_error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ ok: true, route: "/api/chat" });
}
