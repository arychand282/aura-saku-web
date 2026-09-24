/**
 * Cookie names and the Set-Cookie parsing shared by everything that touches
 * a Go backend session: the two literal names must match `auth.SessionCookieName`
 * (aura_session) in aura-saku/internal/auth/auth.go exactly, and `aura_role`
 * is a UX-only sibling cookie this frontend invents — never read by the Go side.
 */
export const auth = {
  sessionCookieName: "aura_session",
  roleCookieName: "aura_role",
};

/**
 * Parses a `Set-Cookie: aura_session=<value>; Path=/; Expires=<date>; HttpOnly; SameSite=Lax`
 * header (exact shape from setSessionCookie in aura-saku/internal/api/handlers/auth_handler.go)
 * into the value and its real expiry. Naively forwarding just the value would drop the
 * intended multi-day expiry and downgrade the session to browser-session-only.
 */
export function parseSessionCookie(setCookieHeader: string): { value: string; expires?: Date } {
  const parts = setCookieHeader.split(";").map((p) => p.trim());
  const [, value] = parts[0].split("=");

  let expires: Date | undefined;
  for (const part of parts.slice(1)) {
    const [key, val] = part.split("=");
    if (key.toLowerCase() === "expires" && val) {
      const parsed = new Date(val);
      if (!Number.isNaN(parsed.getTime())) {
        expires = parsed;
      }
    }
  }

  return { value, expires };
}
