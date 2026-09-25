import type { TransactionRow, TransactionType } from "@/lib/types";

import OriginalChatCell from "./OriginalChatCell";

const TYPE_BADGE: Record<TransactionType, string> = {
  expense: "bg-rose-100 text-rose-700",
  income: "bg-emerald-100 text-emerald-700",
  investment: "bg-blue-100 text-blue-700",
  transfer: "bg-sky-100 text-sky-700",
};

const AMOUNT_COLOR: Record<TransactionType, string> = {
  expense: "text-rose-600",
  income: "text-emerald-600",
  investment: "text-blue-600",
  transfer: "text-sky-600",
};

export default function TransactionsTable({ transactions }: { transactions: TransactionRow[] | null }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="rounded-3xl bg-white/80 p-6 text-center text-sm text-gray-500 shadow-lg shadow-blue-100/40 backdrop-blur">
        No transactions to show.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl bg-white/80 shadow-lg shadow-blue-100/40 backdrop-blur">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead>
          <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-400">
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Original Chat</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {transactions.map((t) => (
            <tr key={t.id} className="transition hover:bg-blue-50/50">
              <td className="px-4 py-3 text-gray-500">{new Date(t.occurred_at).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                    TYPE_BADGE[t.type] ?? TYPE_BADGE.transfer
                  }`}
                >
                  {t.type}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">{t.category_name || "—"}</td>
              <td className="px-4 py-3 text-gray-700">{t.description}</td>
              <OriginalChatCell text={t.raw_input} />
              <td className={`px-4 py-3 text-right font-bold ${AMOUNT_COLOR[t.type] ?? "text-gray-900"}`}>
                {t.converted_amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
