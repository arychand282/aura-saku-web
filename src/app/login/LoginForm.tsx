"use client";

import { useActionState } from "react";

import { adminLoginAction, type LoginState } from "@/app/actions/login";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(adminLoginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white/70 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white/70 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
        />
      </div>
      {state.error && (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-amber-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-300/40 transition hover:brightness-105 hover:shadow-cyan-300/60 disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
