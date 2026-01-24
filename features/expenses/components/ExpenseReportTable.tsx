import type { Expense } from "../types/expense.types";
import { formatCurrency, formatDate } from "@/utils";
import { Badge } from "@/app/components/ui/Badge";
import { Pagination } from "@/app/components/ui/Pagination";
import type { PaginatedMeta } from "@/core/api/client";

interface ExpenseReportTableProps {
  data: Expense[];
  isLoading: boolean;
  emptyMessage?: string;
  // Pagination props
  meta?: PaginatedMeta | null;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export function ExpenseReportTable({
  data,
  isLoading,
  emptyMessage = "Tidak ada pengeluaran pada periode ini.",
  meta,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
}: ExpenseReportTableProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-border text-xs uppercase text-text-secondary font-semibold">
            <tr>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Nama Pengeluaran</th>
              <th className="px-6 py-4 text-right">Jumlah</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-text-tertiary"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Memuat data pengeluaran...
                  </div>
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-text-tertiary"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-text-secondary">
                    {formatDate(item.date)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="info">Operasional</Badge>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-red-600">
                    -{formatCurrency(item.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="success">Lunas</Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
