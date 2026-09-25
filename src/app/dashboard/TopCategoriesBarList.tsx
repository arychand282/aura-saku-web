import type { TopCategoryRow } from "@/lib/types";

export default function TopCategoriesBarList({ categories }: { categories: TopCategoryRow[] | null }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-blue-100/40 backdrop-blur">
        <h2 className="mb-3 text-sm font-bold text-gray-900">Top Categories</h2>
        <p className="text-sm text-gray-500">No expenses recorded for this period yet.</p>
      </div>
    );
  }

  const max = Math.max(...categories.map((c) => c.total));

  return (
    <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-blue-100/40 backdrop-blur">
      <h2 className="mb-4 text-sm font-bold text-gray-900">Top Categories</h2>
      <div className="space-y-4">
        {categories.map((c) => {
          const pct = max > 0 ? (c.total / max) * 100 : 0;
          return (
            <div key={c.category_name || "uncategorized"}>
              <div className="flex justify-between text-xs font-medium text-gray-600">
                <span>{c.category_name || "Uncategorized"}</span>
                <span className="font-semibold text-gray-900">{c.total.toLocaleString()}</span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-blue-100">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
