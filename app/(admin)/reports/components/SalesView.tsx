import { useSales, SalesReportTable } from "@/features/sales";

interface SalesViewProps {
  startDate: string;
  endDate: string;
}

// Helper to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export function SalesView({ startDate, endDate }: SalesViewProps) {
  const { data, meta, isLoading, error } = useSales({
    startDate,
    endDate,
    page: 1,
    limit: 100,
  });

  // Calculate summary stats
  const totalTransactions = meta?.total ?? data.length;
  const totalRevenue = data.reduce((sum, sale) => sum + sale.total, 0);
  const avgTransaction =
    totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Summary Stats */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase font-medium">
                Total Transaksi
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {isLoading ? "..." : totalTransactions}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase font-medium">
                Total Penjualan
              </p>
              <p className="text-lg font-semibold text-green-600">
                {isLoading ? "..." : formatCurrency(totalRevenue)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="text-lg">📈</span>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase font-medium">
                Rata-rata
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {isLoading ? "..." : formatCurrency(avgTransaction)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <SalesReportTable data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
