"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PAGE_SIZE_OPTIONS } from "@/lib/pagination";

import Dropdown from "./Dropdown";

export default function Pagination({
  page,
  totalCount,
  limit,
}: {
  page: number;
  totalCount: number;
  limit: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  function go(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  }

  function changePageSize(newLimit: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium">
          Page {page} of {totalPages} <span className="text-gray-400">({totalCount} total)</span>
        </span>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          Rows per page
          <Dropdown
            value={String(limit)}
            onChange={changePageSize}
            ariaLabel="Rows per page"
            options={PAGE_SIZE_OPTIONS.map((size) => ({ value: String(size), label: String(size) }))}
            triggerClassName="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => go(page - 1)}
          className="cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-1.5 font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
        >
          Prev
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => go(page + 1)}
          className="cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-1.5 font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
