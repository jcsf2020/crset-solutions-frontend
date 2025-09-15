import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // Bloqueia qualquer pedido a source maps e devolve vazio
  if (req.nextUrl.pathname.endsWith(".map")) {
    return NextResponse.json({}, { status: 200 })
  }

  // Bloqueia o devtools.json chato
  if (req.nextUrl.pathname === "/.well-known/appspecific/com.chrome.devtools.json") {
    return NextResponse.json({ status: "ok" }, { status: 200 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/_next/:path*", "/.well-known/:path*"],
}
