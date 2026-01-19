import { KpiCard } from "@/features/analytics/components/KpiCard";
import { useReportSummary } from "@/features/analytics";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface SummaryViewProps {
  startDate: string;
  endDate: string;
}

export function SummaryView({ startDate, endDate }: SummaryViewProps) {
  const { data, isLoading, error } = useReportSummary(startDate, endDate);

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
          value={fmt(data?.totalRevenue)}
          loading={isLoading}
          icon={DollarSign}
          // trend={{ value: 0, label: "vs periode lalu", direction: "neutral" }} // Comparison data not yet available
          trendLabel="vs periode lalu"
        />
        <KpiCard
          title="Total Pengeluaran"
          value={fmt(data?.totalExpenses)}
          loading={isLoading}
          icon={Wallet}
        />
        <KpiCard
          title="Laba Kotor"
          value={fmt(data?.grossProfit)}
          loading={isLoading}
          icon={TrendingUp}
        />
        <KpiCard
          title="Laba Bersih"
          value={fmt(data?.netProfit)}
          loading={isLoading}
          icon={TrendingDown}
          trendLabel="margin bersih"
        />
      </div>

      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Analisa Laba Rugi
        </h3>
        <div className="min-h-[300px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p>Grafik Sales vs Expense akan muncul di sini</p>
          {/* TODO: Add SalesTrendChart here with correct props */}
        </div>
      </div>
    </div>
  );
}
