import { apiClient } from "@/core/api/client";
import {
  AnalyticsPeriod,
  DashboardSummaryResponse,
  SalesTrendResponse,
  TopProductsResponse,
  FinancialSummaryResponse,
  ExpenseBreakdownResponse,
} from "../types/analytics.types";
import { ANALYTICS_ENDPOINTS } from "../analytics.endpoints";

export const analyticsService = {
  getSummary: async (
    period: AnalyticsPeriod = "today",
  ): Promise<DashboardSummaryResponse> => {
    return apiClient.get<DashboardSummaryResponse>(
      `${ANALYTICS_ENDPOINTS.SUMMARY}?period=${period}`,
    );
  },

  getSalesTrend: async (
    period: AnalyticsPeriod = "week",
    groupBy: "day" | "week" | "month" = "day",
  ): Promise<SalesTrendResponse> => {
    return apiClient.get<SalesTrendResponse>(
      `${ANALYTICS_ENDPOINTS.SALES_TREND}?period=${period}&groupBy=${groupBy}`,
    );
  },

  getTopProducts: async (
    period: AnalyticsPeriod = "week",
    limit: number = 5,
  ): Promise<TopProductsResponse> => {
    return apiClient.get<TopProductsResponse>(
      `${ANALYTICS_ENDPOINTS.TOP_PRODUCTS}?period=${period}&limit=${limit}`,
    );
  },

  getFinancialSummary: async (
    startDate: string,
    endDate: string,
  ): Promise<FinancialSummaryResponse> => {
    return apiClient.get<FinancialSummaryResponse>(
      `${ANALYTICS_ENDPOINTS.FINANCIAL_SUMMARY}?startDate=${startDate}&endDate=${endDate}`,
    );
  },

  getExpenseBreakdown: async (
    startDate: string,
    endDate: string,
  ): Promise<ExpenseBreakdownResponse> => {
    return apiClient.get<ExpenseBreakdownResponse>(
      `${ANALYTICS_ENDPOINTS.EXPENSE_BREAKDOWN}?startDate=${startDate}&endDate=${endDate}`,
    );
  },
};
