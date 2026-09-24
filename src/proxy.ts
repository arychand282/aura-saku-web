import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth";

// Presence-only check: avoids a flash of dashboard shell before redirecting.
// Not the real security boundary — the Go backend re-verifies the JWT+Redis
// session on every request regardless.
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(auth.sessionCookieName);
  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
