// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";
// const ALLOWED_IPS = (process.env.MAINTENANCE_ALLOWED_IPS || "").split(",");

export function middleware(req: NextRequest) {
  // const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (
    MAINTENANCE_MODE &&
    // !ALLOWED_IPS.includes(ip ?? "") &&
    !req.nextUrl.pathname.startsWith("/maintenance") &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/maintenance";
    // Rewrite keeps the visitor's URL; 503 + Retry-After tells Google it is temporary (spec A 08 C4).
    return NextResponse.rewrite(url, {
      status: 503,
      headers: { "Retry-After": "3600" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
