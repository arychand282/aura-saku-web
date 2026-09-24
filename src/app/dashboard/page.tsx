import { cookies } from "next/headers";

import { backendGet } from "@/lib/backend";
import { auth } from "@/lib/auth";
import type {
  BudgetProgressResponse,
  Period,
  Role,
  SummaryResponse,
  TopCategoriesResponse,
  TransactionsListResponse,
} from "@/lib/types";

import BudgetProgressBars from "./BudgetProgressBars";
import ExportButton from "./ExportButton";
import Pagination from "./Pagination";
import PeriodSelector from "./PeriodSelector";
import SummaryCards from "./SummaryCards";
import TopCategoriesBarList from "./TopCategoriesBarList";
import TransactionsTable from "./TransactionsTable";
import ViewAsUserControl from "./ViewAsUserControl";

const PAGE_LIMIT = 20;

const isElevatedRole = (role: Role) => role === "admin" || role === "superadmin";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; page?: string; user_id?: string }>;
}) {
  const { period: periodParam, page: pageParam, user_id: viewUserId } = await searchParams;
  const period = (periodParam ?? "monthly") as Period;
  const page = Number(pageParam ?? "1") || 1;

  const store = await cookies();
  const role = (store.get(auth.roleCookieName)?.value ?? "user") as Role;
  const elevated = isElevatedRole(role);

  if (elevated && !viewUserId) {
    return (
      <div className="rounded border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
        <p className="mb-4">Enter a user ID to view their dashboard.</p>
        <div className="flex justify-center">
          <ViewAsUserControl mode="prompt" />
        </div>
      </div>
    );
  }

  const qs = new URLSearchParams({ period, ...(viewUserId ? { user_id: viewUserId } : {}) });
  const budgetQs = viewUserId ? `?user_id=${viewUserId}` : "";
  const txQs = new URLSearchParams({
    page: String(page),
    limit: String(PAGE_LIMIT),
    ...(viewUserId ? { user_id: viewUserId } : {}),
  });

  const [summary, topCategories, budgetProgress, transactions] = await Promise.all([
    backendGet<SummaryResponse>(`/api/v1/reports/summary?${qs}`),
    backendGet<TopCategoriesResponse>(`/api/v1/reports/top-categories?${qs}`),
    backendGet<BudgetProgressResponse>(`/api/v1/reports/budget-progress${budgetQs}`),
    backendGet<TransactionsListResponse>(`/api/v1/transactions?${txQs}`),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PeriodSelector current={period} />
          {elevated && <ViewAsUserControl mode="inline" currentUserId={viewUserId} />}
        </div>
        <ExportButton userId={viewUserId} />
      </div>
      <SummaryCards totals={summary.totals} />
      <div className="grid gap-6 md:grid-cols-2">
        <TopCategoriesBarList categories={topCategories.top_categories} />
        <BudgetProgressBars data={budgetProgress} />
      </div>
      <TransactionsTable transactions={transactions.transactions} />
      <Pagination page={transactions.page} totalCount={transactions.total_count} limit={transactions.limit} />
    </div>
  );
}
