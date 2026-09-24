import type { SummaryResponse, TransactionType } from "@/lib/types";

const LABELS: Record<TransactionType, string> = {
  income: "Income",
  expense: "Expense",
  investment: "Investment",
  transfer: "Transfer",
};

export default function SummaryCards({ totals }: { totals: SummaryResponse["totals"] }) {
  const entries = Object.entries(totals) as [TransactionType, number][];

  if (entries.length === 0) {
    return (
      <div className="rounded border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
        No transactions recorded for this period yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {entries.map(([type, total]) => (
        <div key={type} className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase text-gray-500">{LABELS[type] ?? type}</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{total.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
