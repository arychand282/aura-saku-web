import { cookies } from "next/headers";

import { logoutAction } from "@/app/actions/logout";
import { auth } from "@/lib/auth";
import type { Role } from "@/lib/types";

const ROLE_BADGE: Record<Role, string> = {
  user: "bg-sky-100 text-sky-700",
  admin: "bg-blue-100 text-blue-700",
  superadmin: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const role = (store.get(auth.roleCookieName)?.value ?? "user") as Role;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/60 bg-white/70 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, no next/image benefit */}
          <img src="/logo-icon.png" alt="" className="h-9 w-auto" />
          <h1 className="text-lg font-extrabold text-gray-900">Aura-Saku</h1>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${ROLE_BADGE[role] ?? ROLE_BADGE.user}`}>
            {role}
          </span>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="cursor-pointer rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-semibold text-gray-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          >
            Log out
          </button>
        </form>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
