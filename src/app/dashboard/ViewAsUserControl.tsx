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
    <form onSubmit={submit} className="flex items-center gap-2">
      <label htmlFor="view-as-user" className="text-sm text-gray-600">
        Viewing user
      </label>
      <input
        id="view-as-user"
        type="number"
        min="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="user ID"
        className="w-28 rounded border border-gray-300 px-2 py-1 text-sm"
      />
      <button type="submit" className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
        {mode === "prompt" ? "View" : "Switch"}
      </button>
    </form>
  );
}
