"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AnalyticsPeriod,
  DashboardSummaryResponse,
  DateRangeParams,
  SalesTrendResponse,
  TopProductsResponse,
} from "../types/analytics.types";
import { analyticsService } from "../services/analytics.service";

interface UseDashboardDataOptions {
  period?: AnalyticsPeriod;
  startDate?: string;
  endDate?: string;
}

interface UseDashboardDataResult {
  summary: DashboardSummaryResponse | null;
  salesTrend: SalesTrendResponse | null;
  topProducts: TopProductsResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDashboardData = (
  periodOrOptions: AnalyticsPeriod | UseDashboardDataOptions = "today",
): UseDashboardDataResult => {
  const options: UseDashboardDataOptions =
    typeof periodOrOptions === "string"
      ? { period: periodOrOptions }
      : periodOrOptions;

  const { period = "today", startDate, endDate } = options;

  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [salesTrend, setSalesTrend] = useState<SalesTrendResponse | null>(null);
  const [topProducts, setTopProducts] = useState<TopProductsResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const getGroupByForPeriod = (
      p: AnalyticsPeriod,
    ): "hour" | "day" | "week" | "month" => {
      switch (p) {
        case "today":
          return "hour";
        case "week":
          return "day";
        case "month":
          return "week";
        case "year":
          return "month";
        default:
          return "day";
      }
    };

    const dateRange: DateRangeParams | undefined =
      startDate && endDate ? { startDate, endDate } : undefined;

    try {
      const [summaryData, trendData, productsData] = await Promise.all([
        analyticsService.getSummary(period, dateRange),
        analyticsService.getSalesTrend(
          period,
          getGroupByForPeriod(period),
          dateRange,
        ),
        analyticsService.getTopProducts(period, 5, dateRange),
      ]);

      setSummary(summaryData);
      setSalesTrend(trendData);
      setTopProducts(productsData);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
      setError("Gagal memuat data dashboard");
    } finally {
      setIsLoading(false);
    }
  }, [period, startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    summary,
    salesTrend,
    topProducts,
    isLoading,
    error,
    refetch: fetchData,
  };
};
