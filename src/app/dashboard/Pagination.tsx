"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <span>
        Page {page} of {totalPages} ({totalCount} total)
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => go(page - 1)}
          className="rounded border border-gray-300 px-3 py-1 disabled:opacity-40"
        >
          Prev
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => go(page + 1)}
          className="rounded border border-gray-300 px-3 py-1 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
