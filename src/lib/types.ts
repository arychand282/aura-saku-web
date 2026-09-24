export type Role = "user" | "admin" | "superadmin";

export type TransactionType = "expense" | "income" | "investment" | "transfer";

export type Period = "daily" | "weekly" | "monthly" | "yearly";

export interface TransactionRow {
  id: number;
  occurred_at: string;
  type: TransactionType;
  category_name: string;
  description: string;
  original_amount: number;
  original_currency: string;
  exchange_rate: number;
  converted_amount: number;
  source: string;
}

export interface TransactionsListResponse {
  transactions: TransactionRow[] | null;
  page: number;
  limit: number;
  total_count: number;
}

export interface SummaryResponse {
  period: Period;
  range_start: string;
  range_end: string;
  totals: Partial<Record<TransactionType, number>>;
}

export interface TopCategoryRow {
  category_name: string;
  total: number;
}

export interface TopCategoriesResponse {
  period: Period;
  top_categories: TopCategoryRow[] | null;
}

export interface BudgetStatus {
  needs_spent: number;
  needs_limit: number;
  wants_spent: number;
  wants_limit: number;
  savings_spent: number;
  savings_limit: number;
  warnings: string[] | null;
}

export interface BudgetProgressResponse {
  status: BudgetStatus;
  rollover_suggestion: string;
}

export interface VerifyLoginResponse {
  role: "user";
  user_id: number;
}

export interface AdminLoginResponse {
  role: "admin" | "superadmin";
  name: string;
}
