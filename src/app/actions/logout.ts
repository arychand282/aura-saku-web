"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { backendPost } from "@/lib/backend";
import { auth } from "@/lib/auth";

export async function logoutAction(): Promise<void> {
  await backendPost("/api/v1/auth/logout", {});

  const store = await cookies();
  store.delete(auth.sessionCookieName);
  store.delete(auth.roleCookieName);

  redirect("/login");
}
