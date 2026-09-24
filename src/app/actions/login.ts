"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { backendPost } from "@/lib/backend";
import { auth, parseSessionCookie } from "@/lib/auth";
import type { AdminLoginResponse } from "@/lib/types";

export interface LoginState {
  error?: string;
}

export async function adminLoginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { res, data, error } = await backendPost("/api/v1/auth/admin-login", { email, password });
  if (error || !data) {
    return { error: error ?? "Login failed." };
  }

  const setCookieHeader = res.headers.getSetCookie()[0];
  if (!setCookieHeader) {
    return { error: "Login succeeded but no session was issued." };
  }
  const { value, expires } = parseSessionCookie(setCookieHeader);
  const { role } = data as AdminLoginResponse;

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
