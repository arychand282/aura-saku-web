import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL ?? "http://localhost:8081";

export class BackendError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function cookieHeader(): Promise<string> {
  const store = await cookies();
  const session = store.get(auth.sessionCookieName)?.value;
  return session ? `${auth.sessionCookieName}=${session}` : "";
}

/**
 * GETs a JSON `{"data": T}` envelope from the Go backend, forwarding the
 * session cookie server-to-server. Redirects to /login on 401 since every
 * caller is a Server Component rendering behind the dashboard route group.
 */
export async function backendGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BACKEND_BASE_URL}${path}`, {
    headers: { Cookie: await cookieHeader() },
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/login");
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new BackendError(res.status, body.error ?? `request failed: ${res.status}`);
  }

  const body = await res.json();
  return body.data as T;
}

/**
 * POSTs JSON to the Go backend. Does not redirect on 401 — callers are
 * anonymous entry points (login, verify) that need to show an inline error
 * instead of bouncing through /login again.
 */
export async function backendPost(
  path: string,
  body: unknown,
): Promise<{ res: Response; data?: unknown; error?: string }> {
  const res = await fetch(`${BACKEND_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: await cookieHeader() },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const parsed = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { res, error: parsed.error ?? `request failed: ${res.status}` };
  }
  return { res, data: parsed.data };
}

/** For the CSV/XLSX export proxy — no JSON parsing, streams the raw response through. */
export async function backendGetRaw(path: string): Promise<Response> {
  return fetch(`${BACKEND_BASE_URL}${path}`, {
    headers: { Cookie: await cookieHeader() },
    cache: "no-store",
  });
}
