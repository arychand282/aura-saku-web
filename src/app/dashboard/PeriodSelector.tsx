"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Period } from "@/lib/types";

import Dropdown from "./Dropdown";

const PERIODS: Period[] = ["daily", "weekly", "monthly", "yearly"];

export default function PeriodSelector({ current }: { current: Period }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", next);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Dropdown
      value={current}
      onChange={handleChange}
      options={PERIODS.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))}
      triggerClassName="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-300"
    />
  );
}
