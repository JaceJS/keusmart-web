"use client";

import { useState, useCallback } from "react";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import {
  useDashboardData,
  KpiCard,
  SalesTrendChart,
  TopProductsList,
  AIInsightWidget,
  WhatsAppSummaryCard,
} from "@/features/analytics";
import {
  TimeRangeSelector,
  PresetPeriod,
  DateRange,
} from "@/app/components/ui/TimeRangeSelector";
import { usePlan } from "@/features/plans";

// Format currency helper
const formatCurrency = (value: number): string => {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)}M`;
  }
  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)}Jt`;
  }
  if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(0)}Rb`;
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
};

// Map preset to period for API
const presetToPeriod = (
  preset: PresetPeriod,
): "today" | "week" | "month" | "year" => {
  return preset;
};

export default function DashboardPage() {
  const { features } = usePlan();
  const isSmartPlan = features.dashboard === "multi-branch";

  const [timeRange, setTimeRange] = useState<PresetPeriod | DateRange>("today");

  // Determine period for API call
  const period =
    typeof timeRange === "string" ? presetToPeriod(timeRange) : "month";

  const { summary, salesTrend, topProducts, isLoading, error } =
    useDashboardData(period);

  const handleTimeRangeChange = useCallback(
    (value: PresetPeriod | DateRange) => {
      setTimeRange(value);
      // TODO: If custom DateRange, integrate with backend using startDate/endDate
    },
    [],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">Overview performa bisnis Anda</p>
        </div>
        <TimeRangeSelector
          value={timeRange}
          onChange={handleTimeRangeChange}
          showCustomRange={isSmartPlan}
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Omzet"
          value={formatCurrency(summary?.summary.totalRevenue ?? 0)}
          change={summary?.comparison?.revenueChange}
          icon={DollarSign}
          iconColor="text-success-dark"
          iconBgColor="bg-success-light"
          loading={isLoading}
        />
        <KpiCard
          title="Transaksi"
          value={summary?.summary.totalTransactions ?? 0}
          change={summary?.comparison?.transactionChange}
          icon={ShoppingCart}
          iconColor="text-info-dark"
          iconBgColor="bg-info-light"
          loading={isLoading}
        />
        <KpiCard
          title="Produk Terjual"
          value={summary?.summary.totalItemsSold ?? 0}
          change={summary?.comparison?.itemsSoldChange}
          icon={Package}
          iconColor="text-accent-purple-dark"
          iconBgColor="bg-accent-purple-light"
          loading={isLoading}
        />
        <KpiCard
          title="Laba Kotor"
          value={formatCurrency(summary?.summary.grossProfit ?? 0)}
          change={summary?.comparison?.profitChange}
          icon={TrendingUp}
          iconColor="text-accent-orange-dark"
          iconBgColor="bg-accent-orange-light"
          loading={isLoading}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[320px]">
          <div className="flex-3 min-w-0 h-[280px] lg:h-full">
            <SalesTrendChart
              data={salesTrend}
              loading={isLoading}
              period={period}
            />
          </div>
          <div className="flex-1 min-w-0 lg:max-w-[280px] h-auto lg:h-full">
            <AIInsightWidget loading={isLoading} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:h-[280px]">
          <div className="flex-3 min-w-0 h-auto lg:h-full">
            <TopProductsList data={topProducts} loading={isLoading} />
          </div>
          <div className="flex-1 min-w-0 lg:max-w-[280px] h-auto lg:h-full">
            <WhatsAppSummaryCard period={period} />
          </div>
        </div>
      </div>
    </div>
  );
}
