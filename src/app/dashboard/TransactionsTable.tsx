import type { TransactionRow } from "@/lib/types";

export default function TransactionsTable({ transactions }: { transactions: TransactionRow[] | null }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
        No transactions to show.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr className="text-left text-xs font-medium uppercase text-gray-500">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Original Chat</th>
            <th className="px-4 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="px-4 py-2 text-gray-600">{new Date(t.occurred_at).toLocaleDateString()}</td>
              <td className="px-4 py-2 capitalize text-gray-600">{t.type}</td>
              <td className="px-4 py-2 text-gray-600">{t.category_name || "—"}</td>
              <td className="px-4 py-2 text-gray-600">{t.description}</td>
              <td
                title={t.raw_input}
                className="max-w-[220px] truncate px-4 py-2 text-gray-500 italic"
              >
                {t.raw_input || "—"}
              </td>
              <td
                className={`px-4 py-2 text-right font-medium ${
                  t.type === "expense" ? "text-red-600" : "text-green-600"
                }`}
              >
                {t.converted_amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
