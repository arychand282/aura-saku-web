import { cookies } from "next/headers";

import { logoutAction } from "@/app/actions/logout";
import { auth } from "@/lib/auth";
import type { Role } from "@/lib/types";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const role = (store.get(auth.roleCookieName)?.value ?? "user") as Role;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Aura-Saku</h1>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium capitalize text-blue-800">
            {role}
          </span>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-gray-600 hover:text-gray-900">
            Log out
          </button>
        </form>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
