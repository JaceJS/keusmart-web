import { apiClient, ApiResponse } from "@/core/api/client";
import {
  AnalyticsPeriod,
  DashboardSummaryResponse,
  SalesTrendResponse,
  TopProductsResponse,
  ReportSummaryResponse,
  ExpenseBreakdownResponse,
  DateRangeParams,
} from "../types/analytics.types";
import { ANALYTICS_ENDPOINTS } from "../analytics.endpoints";

export const analyticsService = {
  getSummary: async (
    period: AnalyticsPeriod = "today",
    dateRange?: DateRangeParams,
  ): Promise<DashboardSummaryResponse> => {
    const params = new URLSearchParams({ period });
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const response = await apiClient.get<ApiResponse<DashboardSummaryResponse>>(
      `${ANALYTICS_ENDPOINTS.SUMMARY}?${params.toString()}`,
    );
    return response.data;
  },

  getSalesTrend: async (
    period: AnalyticsPeriod = "week",
    groupBy: "hour" | "day" | "week" | "month" = "day",
    dateRange?: DateRangeParams,
  ): Promise<SalesTrendResponse> => {
    const params = new URLSearchParams({ period, groupBy });
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const response = await apiClient.get<ApiResponse<SalesTrendResponse>>(
      `${ANALYTICS_ENDPOINTS.SALES_TREND}?${params.toString()}`,
    );
    return response.data;
  },

  getTopProducts: async (
    period: AnalyticsPeriod = "week",
    limit: number = 5,
    dateRange?: DateRangeParams,
  ): Promise<TopProductsResponse> => {
    const params = new URLSearchParams({ period, limit: limit.toString() });
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const response = await apiClient.get<ApiResponse<TopProductsResponse>>(
      `${ANALYTICS_ENDPOINTS.TOP_PRODUCTS}?${params.toString()}`,
    );
    return response.data;
  },

  getReportSummary: async (
    period: AnalyticsPeriod = "month",
    dateRange?: DateRangeParams,
  ): Promise<ReportSummaryResponse> => {
    const params = new URLSearchParams({ period });
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const response = await apiClient.get<ApiResponse<ReportSummaryResponse>>(
      `${ANALYTICS_ENDPOINTS.REPORT_SUMMARY}?${params.toString()}`,
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
