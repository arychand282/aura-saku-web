"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Period } from "@/lib/types";

const PERIODS: Period[] = ["daily", "weekly", "monthly", "yearly"];

export default function PeriodSelector({ current }: { current: Period }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", e.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded border border-gray-300 px-3 py-1.5 text-sm capitalize"
    >
      {PERIODS.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </select>
  );
}
