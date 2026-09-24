import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { backendPost } from "@/lib/backend";
import { auth, parseSessionCookie } from "@/lib/auth";
import type { VerifyLoginResponse } from "@/lib/types";

// Landing page for the bot's `/dashboard` command, which builds its link as
// `{DASHBOARD_BASE_URL}/auth/verify?token=...` (aura-saku's internal/service/bot).
// Must live at this exact top-level path, not under /api/.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    redirect("/login?error=invalid_token");
  }

  const { res, data, error } = await backendPost("/api/v1/auth/verify", { token });
  if (error || !data) {
    redirect("/login?error=invalid_token");
  }

  const setCookieHeader = res.headers.getSetCookie()[0];
  if (!setCookieHeader) {
    redirect("/login?error=invalid_token");
  }
  const { value, expires } = parseSessionCookie(setCookieHeader);
  const { role } = data as VerifyLoginResponse;

  const store = await cookies();
  store.set(auth.sessionCookieName, value, {
    expires,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
  store.set(auth.roleCookieName, role, {
    expires,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  redirect("/dashboard");
}
