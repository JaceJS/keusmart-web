export type AnalyticsPeriod = "today" | "week" | "month" | "year";

export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalTransactions: number;
  totalItemsSold: number;
  grossProfit: number;
  averageOrderValue: number;
}

export interface AnalyticsComparison {
  revenueChange: number;
  transactionChange: number;
  itemsSoldChange: number;
  profitChange: number;
}

export interface DashboardSummaryResponse {
  summary: AnalyticsSummary;
  comparison: AnalyticsComparison;
}

export interface SalesTrendItem {
  date: string;
  revenue: number;
  transactions: number;
}

export type SalesTrendResponse = SalesTrendItem[];

export interface TopProductItem {
  productId: string;
  name: string;
  quantitySold: number;
  revenue: number;
  category?: string;
  stockRemaining?: number;
}

export type TopProductsResponse = TopProductItem[];

export interface ReportSummaryResponse {
  summary: {
    totalRevenue: number;
    totalExpenses: number;
    grossProfit: number;
    netProfit: number;
    transactionCount: number;
    expenseCount: number;
  };
  comparison: {
    revenueChange: number;
    expenseChange: number;
  };
}

export interface ExpenseBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
}

export type ExpenseBreakdownResponse = ExpenseBreakdownItem[];
