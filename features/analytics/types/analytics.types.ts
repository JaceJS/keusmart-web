export type AnalyticsPeriod = "today" | "week" | "month" | "year";

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
  profit: number;
}

export interface SalesTrendResponse {
  data: SalesTrendItem[];
}

export interface TopProductItem {
  productId: string;
  name: string;
  quantitySold: number;
  revenue: number;
}

export interface TopProductsResponse {
  data: TopProductItem[];
}
