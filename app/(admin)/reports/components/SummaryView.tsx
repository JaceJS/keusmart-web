import { KpiCard, useReportSummary } from "@/features/analytics";
import { FinancialSummaryChart } from "@/features/analytics/components/FinancialSummaryChart";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import type { Period } from "@/app/components/ui/PeriodSelector";

interface SummaryViewProps {
  period: Period;
}

export function SummaryView({ period }: SummaryViewProps) {
  const { data, isLoading, error } = useReportSummary(period);

  if (error) {
    return <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>;
  }

  // Helper to format currency
  const fmt = (n?: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Penjualan"
          value={fmt(data?.summary?.totalRevenue)}
          loading={isLoading}
          icon={DollarSign}
          iconColor="text-primary-dark"
          iconBgColor="bg-primary-light"
          trendLabel="vs periode lalu"
          change={data?.comparison?.revenueChange}
        />
        <KpiCard
          title="Total Pengeluaran"
          value={fmt(data?.summary?.totalExpenses)}
          loading={isLoading}
          icon={Wallet}
          iconColor="text-red-500"
          iconBgColor="bg-red-50"
          change={data?.comparison?.expenseChange}
          trendLabel="vs periode lalu"
        />
        <KpiCard
          title="Laba Kotor"
          value={fmt(data?.summary?.grossProfit)}
          loading={isLoading}
          icon={TrendingUp}
          iconColor="text-primary-dark"
          iconBgColor="bg-primary-light"
        />
        <KpiCard
          title="Laba Bersih"
          value={fmt(data?.summary?.netProfit)}
          loading={isLoading}
          icon={TrendingDown}
          iconColor="text-primary-dark"
          iconBgColor="bg-primary-light"
          trendLabel="margin bersih"
        />
      </div>

      <div className="h-[400px]">
        <FinancialSummaryChart
          revenue={data?.summary?.totalRevenue || 0}
          expenses={data?.summary?.totalExpenses || 0}
          revenueChange={data?.comparison?.revenueChange}
          expenseChange={data?.comparison?.expenseChange}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
