"use client";

import { useState } from "react";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import {
  useDashboardData,
  KpiCard,
  SalesTrendChart,
  TopProductsList,
} from "@/features/analytics";
import { PeriodSelector, Period } from "@/app/components/ui/PeriodSelector";

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

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("today");
  const { summary, salesTrend, topProducts, isLoading, error } =
    useDashboardData(period);

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
        <PeriodSelector value={period} onChange={setPeriod} />
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
          iconColor="text-primary-dark"
          iconBgColor="bg-primary-light"
          loading={isLoading}
        />
        <KpiCard
          title="Transaksi"
          value={summary?.summary.totalTransactions ?? 0}
          change={summary?.comparison?.transactionChange}
          icon={ShoppingCart}
          iconColor="text-primary-dark"
          iconBgColor="bg-primary-light"
          loading={isLoading}
        />
        <KpiCard
          title="Produk Terjual"
          value={summary?.summary.totalItemsSold ?? 0}
          change={summary?.comparison?.itemsSoldChange}
          icon={Package}
          iconColor="text-primary-dark"
          iconBgColor="bg-primary-light"
          loading={isLoading}
        />
        <KpiCard
          title="Laba Kotor"
          value={formatCurrency(summary?.summary.grossProfit ?? 0)}
          change={summary?.comparison?.profitChange}
          icon={TrendingUp}
          iconColor="text-primary-dark"
          iconBgColor="bg-primary-light"
          loading={isLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full">
          <SalesTrendChart
            data={salesTrend}
            loading={isLoading}
            period={period}
          />
        </div>

        <div className="h-full">
          <TopProductsList data={topProducts} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}
