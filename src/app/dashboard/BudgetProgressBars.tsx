import type { BudgetProgressResponse } from "@/lib/types";

function Bar({ label, spent, limit }: { label: string; spent: number; limit: number }) {
  const pct = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  const over = spent > limit;
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span>
          {spent.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div className="mt-1 h-3 rounded-full bg-gray-100">
        <div
          className={`h-3 rounded-full ${over ? "bg-red-500" : "bg-blue-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function BudgetProgressBars({ data }: { data: BudgetProgressResponse }) {
  const { status, rollover_suggestion } = data;

  return (
    <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">Budget (50/30/20)</h2>
      <Bar label="Needs" spent={status.needs_spent} limit={status.needs_limit} />
      <Bar label="Wants" spent={status.wants_spent} limit={status.wants_limit} />
      <Bar label="Savings" spent={status.savings_spent} limit={status.savings_limit} />
      {status.warnings && status.warnings.length > 0 && (
        <div className="space-y-2">
          {status.warnings.map((w) => (
            <p key={w} className="rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-800">
              {w}
            </p>
          ))}
        </div>
      )}
      {rollover_suggestion && (
        <p className="rounded border border-blue-200 bg-blue-50 p-2 text-xs text-blue-800">
          {rollover_suggestion}
        </p>
      )}
    </div>
  );
}
