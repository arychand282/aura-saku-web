import type { BudgetProgressResponse } from "@/lib/types";

// Only Wants gets the danger treatment: overspending on discretionary wants
// is the actual impulse-control signal this dashboard cares about. Needs is
// non-negotiable spending (rent, food) and Savings/Investment going over its
// target is a good outcome, not a warning — neither should ever read as red.
function Bar({
  label,
  spent,
  limit,
  warnOnHigh = false,
}: {
  label: string;
  spent: number;
  limit: number;
  warnOnHigh?: boolean;
}) {
  const pct = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  const over = warnOnHigh && spent > limit;
  const gradient = !warnOnHigh
    ? "from-blue-500 to-cyan-500"
    : over
      ? "from-red-500 to-red-700"
      : "from-yellow-400 to-amber-500";
  return (
    <div>
      <div className="flex justify-between text-xs font-medium text-gray-600">
        <span>{label}</span>
        <span className="font-semibold text-gray-900">
          {spent.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div className="mt-1.5 h-2.5 rounded-full bg-blue-100">
        <div className={`h-2.5 rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function BudgetProgressBars({ data }: { data: BudgetProgressResponse }) {
  const { status, rollover_suggestion } = data;

  return (
    <div className="space-y-4 rounded-3xl bg-white/80 p-5 shadow-lg shadow-blue-100/40 backdrop-blur">
      <h2 className="text-sm font-bold text-gray-900">Budget (50/30/20)</h2>
      <Bar label="Needs" spent={status.needs_spent} limit={status.needs_limit} />
      <Bar label="Wants" spent={status.wants_spent} limit={status.wants_limit} warnOnHigh />
      <Bar label="Savings" spent={status.savings_spent} limit={status.savings_limit} />
      {status.warnings && status.warnings.length > 0 && (
        <div className="space-y-2">
          {status.warnings.map((w) => (
            <p key={w} className="rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-xs font-medium text-amber-800">
              {w}
            </p>
          ))}
        </div>
      )}
      {rollover_suggestion && (
        <p className="rounded-xl border border-sky-200 bg-sky-50 p-2.5 text-xs font-medium text-sky-800">
          {rollover_suggestion}
        </p>
      )}
    </div>
  );
}
