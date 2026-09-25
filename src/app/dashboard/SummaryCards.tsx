import type { ReactNode } from "react";

import type { SummaryResponse, TransactionType } from "@/lib/types";

const LABELS: Record<TransactionType, string> = {
  income: "Income",
  expense: "Expense",
  investment: "Investment",
  transfer: "Transfer",
};

const STYLES: Record<TransactionType, { gradient: string; icon: ReactNode }> = {
  income: {
    gradient: "from-emerald-500 to-teal-500",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0-6 6m6-6 6 6" />,
  },
  expense: {
    gradient: "from-rose-500 to-orange-500",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0 6-6m-6 6-6-6" />,
  },
  investment: {
    gradient: "from-blue-500 to-indigo-600",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="m3 17 6-6 4 4 8-8M21 7v6M21 7h-6" />,
  },
  transfer: {
    gradient: "from-sky-500 to-blue-600",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7h13m0 0-4-4m4 4-4 4M17 17H4m0 0 4 4m-4-4 4-4"
      />
    ),
  },
};

export default function SummaryCards({ totals }: { totals: SummaryResponse["totals"] }) {
  const entries = Object.entries(totals) as [TransactionType, number][];

  if (entries.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-blue-200 bg-white/70 p-6 text-center text-sm text-gray-500 backdrop-blur">
        No transactions recorded for this period yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {entries.map(([type, total]) => {
        const style = STYLES[type] ?? STYLES.transfer;
        return (
          <div
            key={type}
            className={`rounded-3xl bg-gradient-to-br ${style.gradient} p-4 text-white shadow-lg shadow-black/5`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="mb-3 h-6 w-6 opacity-90"
            >
              {style.icon}
            </svg>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">{LABELS[type] ?? type}</p>
            <p className="mt-1 text-xl font-extrabold">{total.toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
}
