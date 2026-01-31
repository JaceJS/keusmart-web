import { KpiCard, useReportSummary } from "@/features/analytics";
import { FinancialSummaryChart } from "@/features/analytics/components/FinancialSummaryChart";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
} from "lucide-react";
import { useCanAccess } from "@/features/plans";
import { LockedFeatureCard } from "@/features/plans/components/LockedFeatureCard";
import { formatCurrency } from "@/utils/number";

type Period = "today" | "week" | "month" | "year";

interface SummaryViewProps {
  period: Period;
}

export function SummaryView({ period }: SummaryViewProps) {
  const { data, isLoading, error } = useReportSummary(period);
  const canViewChart = useCanAccess("reportsChart");

  if (error) {
    return <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>;
  }

  // Calculate margins
  const grossMargin = data?.summary?.totalRevenue
    ? ((data.summary.grossProfit || 0) / data.summary.totalRevenue) * 100
    : 0;
  const netMargin = data?.summary?.totalRevenue
    ? ((data.summary.netProfit || 0) / data.summary.totalRevenue) * 100
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Penjualan"
          value={formatCurrency(data?.summary?.totalRevenue ?? 0)}
          loading={isLoading}
          icon={DollarSign}
          iconColor="text-primary-dark"
          iconBgColor="bg-primary-light"
          trendLabel="vs periode lalu"
          change={data?.comparison?.revenueChange}
        />
        <KpiCard
          title="Total Pengeluaran"
          value={formatCurrency(data?.summary?.totalExpenses ?? 0)}
          loading={isLoading}
          icon={Wallet}
          iconColor="text-red-500"
          iconBgColor="bg-red-50"
          change={data?.comparison?.expenseChange}
          trendLabel="vs periode lalu"
        />
        <KpiCard
          title="Laba Kotor"
          value={formatCurrency(data?.summary?.grossProfit ?? 0)}
          loading={isLoading}
          icon={TrendingUp}
          iconColor="text-success-dark"
          iconBgColor="bg-success-light"
          trendLabel={`Margin: ${grossMargin.toFixed(1)}%`}
        />
        <KpiCard
          title="Laba Bersih"
          value={formatCurrency(data?.summary?.netProfit ?? 0)}
          loading={isLoading}
          icon={TrendingDown}
          iconColor="text-accent-purple-dark"
          iconBgColor="bg-accent-purple-light"
          trendLabel={`Margin: ${netMargin.toFixed(1)}%`}
        />
      </div>

      {/* Chart - locked for Starter */}
      <div className="h-[400px]">
        {canViewChart ? (
          <FinancialSummaryChart
            revenue={data?.summary?.totalRevenue || 0}
            expenses={data?.summary?.totalExpenses || 0}
            revenueChange={data?.comparison?.revenueChange}
            expenseChange={data?.comparison?.expenseChange}
            loading={isLoading}
          />
        ) : (
          <LockedFeatureCard
            title="Visualisasi Keuangan"
            icon={<BarChart3 className="w-5 h-5 text-primary" />}
            description="Upgrade ke Growth untuk melihat grafik perbandingan pendapatan dan pengeluaran secara visual."
          />
        )}
      </div>
    </div>
  );
}
