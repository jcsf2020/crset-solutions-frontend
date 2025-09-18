import { NextRequest, NextResponse } from "next/server";

const COOKIE = "crset-chat";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const on = url.searchParams.get("on");
  const token = url.searchParams.get("token") || "";
  const admin = process.env.CRSET_ADMIN_TOKEN || "";

  if (!admin || token !== admin) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const res = NextResponse.json({ ok: true, mode: on ? "on" : "off" });

  if (on === "1" || on === "true") {
    res.headers.append(
      "Set-Cookie",
      `${COOKIE}=on; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`
    );
  } else {
    res.headers.append(
      "Set-Cookie",
      `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
    );
  }

  return res;
}
