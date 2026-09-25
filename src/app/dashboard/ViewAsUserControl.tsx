"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ViewAsUserControl({
  mode,
  currentUserId,
}: {
  mode: "prompt" | "inline";
  currentUserId?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(currentUserId ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("user_id", trimmed);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-center gap-2">
      <label htmlFor="view-as-user" className="text-sm font-medium text-gray-500">
        Viewing user
      </label>
      <input
        id="view-as-user"
        type="number"
        min="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="user ID"
        className="w-28 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-cyan-200 transition hover:brightness-105"
      >
        {mode === "prompt" ? "View" : "Switch"}
      </button>
    </form>
  );
}
