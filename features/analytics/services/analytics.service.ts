import { apiClient, ApiResponse } from "@/core/api/client";
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
    const response = await apiClient.get<ApiResponse<DashboardSummaryResponse>>(
      `${ANALYTICS_ENDPOINTS.SUMMARY}?period=${period}`,
    );
    return response.data;
  },

  getSalesTrend: async (
    period: AnalyticsPeriod = "week",
    groupBy: "hour" | "day" | "week" | "month" = "day",
  ): Promise<SalesTrendResponse> => {
    const response = await apiClient.get<ApiResponse<SalesTrendResponse>>(
      `${ANALYTICS_ENDPOINTS.SALES_TREND}?period=${period}&groupBy=${groupBy}`,
    );
    return response.data;
  },

  getTopProducts: async (
    period: AnalyticsPeriod = "week",
    limit: number = 5,
  ): Promise<TopProductsResponse> => {
    const response = await apiClient.get<ApiResponse<TopProductsResponse>>(
      `${ANALYTICS_ENDPOINTS.TOP_PRODUCTS}?period=${period}&limit=${limit}`,
    );
    return response.data;
  },

  getReportSummary: async (
    period: AnalyticsPeriod = "month",
  ): Promise<ReportSummaryResponse> => {
    const response = await apiClient.get<ApiResponse<ReportSummaryResponse>>(
      `${ANALYTICS_ENDPOINTS.REPORT_SUMMARY}?period=${period}`,
    );
    return response.data;
  },

  getExpenseBreakdown: async (
    startDate: string,
    endDate: string,
  ): Promise<ExpenseBreakdownResponse> => {
    const response = await apiClient.get<ApiResponse<ExpenseBreakdownResponse>>(
      `${ANALYTICS_ENDPOINTS.EXPENSE_BREAKDOWN}?startDate=${startDate}&endDate=${endDate}`,
    );
    return response.data;
  },
};
