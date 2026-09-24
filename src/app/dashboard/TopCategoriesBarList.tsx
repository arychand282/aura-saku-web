import type { TopCategoryRow } from "@/lib/types";

export default function TopCategoriesBarList({ categories }: { categories: TopCategoryRow[] | null }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-900">Top Categories</h2>
        <p className="text-sm text-gray-500">No expenses recorded for this period yet.</p>
      </div>
    );
  }

  const max = Math.max(...categories.map((c) => c.total));

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">Top Categories</h2>
      <div className="space-y-3">
        {categories.map((c) => {
          const pct = max > 0 ? (c.total / max) * 100 : 0;
          return (
            <div key={c.category_name || "uncategorized"}>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{c.category_name || "Uncategorized"}</span>
                <span>{c.total.toLocaleString()}</span>
              </div>
              <div className="mt-1 h-3 rounded-full bg-gray-100">
                <div className="h-3 rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
