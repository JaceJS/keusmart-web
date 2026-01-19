"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AnalyticsPeriod,
  DashboardSummaryResponse,
  SalesTrendResponse,
  TopProductsResponse,
} from "../types/analytics.types";
import { analyticsService } from "../services/analytics.service";

interface UseDashboardDataResult {
  summary: DashboardSummaryResponse | null;
  salesTrend: SalesTrendResponse | null;
  topProducts: TopProductsResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDashboardData = (
  period: AnalyticsPeriod = "today",
): UseDashboardDataResult => {
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

    try {
      const [summaryData, trendData, productsData] = await Promise.all([
        analyticsService.getSummary(period),
        analyticsService.getSalesTrend(period === "today" ? "week" : period),
        analyticsService.getTopProducts(period),
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
  }, [period]);

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
