import type { Sale } from "../types/sale.types";
import { formatCurrency, formatDate } from "@/utils";
import {
  Badge,
  getPaymentStatusVariant,
  getPaymentStatusLabel,
} from "@/app/components/ui/Badge";
import { Pagination } from "@/app/components/ui/Pagination";
import type { PaginatedMeta } from "@/core/api/client";

interface SalesReportTableProps {
  data: Sale[];
  isLoading: boolean;
  emptyMessage?: string;
  meta?: PaginatedMeta | null;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

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
  meta,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
}: SalesReportTableProps) {
  return (
    <div>
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
                    <Badge
                      variant={getPaymentStatusVariant(item.paymentStatus)}
                    >
                      {getPaymentStatusLabel(item.paymentStatus)}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta.totalPages}
          totalItems={meta.total}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
