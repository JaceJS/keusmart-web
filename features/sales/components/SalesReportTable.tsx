import type { Sale } from "../types/sale.types";

interface SalesReportTableProps {
  data: Sale[];
  isLoading: boolean;
  emptyMessage?: string;
}

// Helper to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

// Helper to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Payment status badge colors
const getStatusBadge = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower === "paid" || statusLower === "lunas") {
    return "bg-green-50 text-green-700";
  }
  if (statusLower === "pending") {
    return "bg-yellow-50 text-yellow-700";
  }
  if (statusLower === "cancelled" || statusLower === "batal") {
    return "bg-red-50 text-red-700";
  }
  return "bg-gray-50 text-gray-700";
};

// Payment method display
const getPaymentMethodLabel = (method: string): string => {
  const labels: Record<string, string> = {
    cash: "💵 Tunai",
    transfer: "🏦 Transfer",
    qris: "📱 QRIS",
    card: "💳 Kartu",
    ewallet: "📲 E-Wallet",
  };
  return labels[method.toLowerCase()] || method;
};

export function SalesReportTable({
  data,
  isLoading,
  emptyMessage = "Tidak ada penjualan pada periode ini.",
}: SalesReportTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b border-border text-xs uppercase text-text-secondary font-semibold">
          <tr>
            <th className="px-6 py-4">Tanggal</th>
            <th className="px-6 py-4">Invoice</th>
            <th className="px-6 py-4 text-right">Subtotal</th>
            <th className="px-6 py-4 text-right">Diskon</th>
            <th className="px-6 py-4 text-right">Total</th>
            <th className="px-6 py-4">Metode</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isLoading ? (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-8 text-center text-text-tertiary"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Memuat data penjualan...
                </div>
              </td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-8 text-center text-text-tertiary"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data?.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-text-secondary">
                  {formatDate(item.transactionDate)}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-text-secondary">
                  #{item.id.slice(-8).toUpperCase()}
                </td>
                <td className="px-6 py-4 text-right text-text-secondary">
                  {formatCurrency(item.subtotal)}
                </td>
                <td className="px-6 py-4 text-right text-orange-600">
                  {item.discount > 0
                    ? `-${formatCurrency(item.discount)}`
                    : "-"}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-green-600">
                  {formatCurrency(item.total)}
                </td>
                <td className="px-6 py-4 text-sm">
                  {getPaymentMethodLabel(item.paymentMethod)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(item.paymentStatus)}`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
