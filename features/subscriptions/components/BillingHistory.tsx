"use client";

import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Invoice } from "../types/subscription.types";
import {
  Receipt,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

interface BillingHistoryProps {
  invoices: Invoice[];
  isLoading: boolean;
}

// Skeleton for loading
function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

// Status badge
function InvoiceStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode; label: string }
  > = {
    paid: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      label: "Lunas",
    },
    pending: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      icon: <Clock className="w-3.5 h-3.5" />,
      label: "Menunggu",
    },
    failed: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      label: "Gagal",
    },
    refunded: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      label: "Refund",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        config.bg,
        config.text,
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

// Format price to IDR
function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BillingHistory({ invoices, isLoading }: BillingHistoryProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Riwayat Tagihan
          </h2>
        </div>
        <TableSkeleton />
      </Card>
    );
  }

  // Empty state
  if (!invoices || invoices.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Riwayat Tagihan
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium">Belum Ada Tagihan</h3>
          <p className="text-sm text-gray-500 mt-1">
            Riwayat pembayaran akan muncul di sini
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Riwayat Tagihan
          </h2>
        </div>
        <span className="text-sm text-gray-500">{invoices.length} tagihan</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-2">
                  <span className="font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-600">
                    {formatDate(invoice.createdAt)}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className="font-medium text-gray-900">
                    {formatPrice(invoice.amount)}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>
                <td className="py-4 px-2 text-right">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
