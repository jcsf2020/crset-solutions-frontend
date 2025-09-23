import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

/** Em PREVIEW (ou se a env pública estiver ativa) não exigimos login */
export async function GET() {
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
  const chatPublic =
    process.env.NEXT_PUBLIC_CHAT_PUBLIC === "true" ||
    process.env.CHAT_PUBLIC === "true";

  return NextResponse.json({ requireLogin: !(isPreview || chatPublic) });
}
