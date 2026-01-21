import { apiClient } from "@/core/api/client";
import {
  AnalyticsPeriod,
  DashboardSummaryResponse,
  SalesTrendResponse,
  TopProductsResponse,
  ReportSummaryResponse,
  ExpenseBreakdownResponse,
} from "../types/analytics.types";
import { ANALYTICS_ENDPOINTS } from "../analytics.endpoints";

export const analyticsService = {
  getSummary: async (
    period: AnalyticsPeriod = "today",
  ): Promise<DashboardSummaryResponse> => {
    const response = await apiClient.get<{
      message: string;
      data: DashboardSummaryResponse;
    }>(`${ANALYTICS_ENDPOINTS.SUMMARY}?period=${period}`);
    return response.data;
  },

  getSalesTrend: async (
    period: AnalyticsPeriod = "week",
    groupBy: "day" | "week" | "month" = "day",
  ): Promise<SalesTrendResponse> => {
    const response = await apiClient.get<{
      message: string;
      data: SalesTrendResponse["data"];
    }>(
      `${ANALYTICS_ENDPOINTS.SALES_TREND}?period=${period}&groupBy=${groupBy}`,
    );
    return { data: response.data };
  },

  getTopProducts: async (
    period: AnalyticsPeriod = "week",
    limit: number = 5,
  ): Promise<TopProductsResponse> => {
    const response = await apiClient.get<{
      message: string;
      data: TopProductsResponse["data"];
    }>(`${ANALYTICS_ENDPOINTS.TOP_PRODUCTS}?period=${period}&limit=${limit}`);
    return { data: response.data };
  },

  getReportSummary: async (
    startDate: string,
    endDate: string,
  ): Promise<ReportSummaryResponse> => {
    const response = await apiClient.get<{
      message: string;
      data: ReportSummaryResponse;
    }>(
      `${ANALYTICS_ENDPOINTS.REPORT_SUMMARY}?startDate=${startDate}&endDate=${endDate}`,
    );
    return response.data;
  },

  getExpenseBreakdown: async (
    startDate: string,
    endDate: string,
  ): Promise<ExpenseBreakdownResponse> => {
    const response = await apiClient.get<{
      message: string;
      data: ExpenseBreakdownResponse["data"];
    }>(
      `${ANALYTICS_ENDPOINTS.EXPENSE_BREAKDOWN}?startDate=${startDate}&endDate=${endDate}`,
    );
    return { data: response.data };
  },
};
