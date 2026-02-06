"use client";

import { Card } from "@/app/components/ui/Card";
import { usePaymentHistory } from "../hooks/usePaymentHistory";
import { Payment } from "../types/subscription.types";
import {
  Receipt,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

function PaymentStatusBadge({ status }: { status: Payment["status"] }) {
  const statusConfig: Record<
    Payment["status"],
    { bg: string; text: string; icon: React.ReactNode; label: string }
  > = {
    success: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      label: "Berhasil",
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
    expired: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      icon: <XCircle className="w-3.5 h-3.5" />,
      label: "Kadaluarsa",
    },
  };

  const config = statusConfig[status];

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

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BillingHistory() {
  const { payments, isLoading, error } = usePaymentHistory();

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Riwayat Pembayaran
          </h2>
        </div>
        <TableSkeleton />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Riwayat Pembayaran
          </h2>
        </div>
        <p className="text-sm text-red-600">{error}</p>
      </Card>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Riwayat Pembayaran
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium">Belum Ada Pembayaran</h3>
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
            Riwayat Pembayaran
          </h2>
        </div>
        <span className="text-sm text-gray-500">
          {payments.length} pembayaran
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Paket
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-2">
                  <span className="font-medium text-gray-900 font-mono text-sm">
                    {payment.orderId}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-700">
                    {payment.planName || "-"}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-600">
                    {formatDate(payment.createdAt)}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className="font-medium text-gray-900">
                    {formatPrice(payment.amount)}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <PaymentStatusBadge status={payment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
