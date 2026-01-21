"use client";

import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Subscription } from "../types/subscription.types";
import {
  Crown,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

interface CurrentPlanCardProps {
  subscription: Subscription | null;
  isLoading: boolean;
  onUpgradeClick?: () => void;
}

// Skeleton for loading state
function CardSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </Card>
  );
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode; label: string }
  > = {
    active: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      label: "Aktif",
    },
    trial: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      icon: <Clock className="w-3.5 h-3.5" />,
      label: "Uji Coba",
    },
    expired: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      label: "Kadaluarsa",
    },
    cancelled: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      label: "Dibatalkan",
    },
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
        config.bg,
        config.text,
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

export function CurrentPlanCard({
  subscription,
  isLoading,
  onUpgradeClick,
}: CurrentPlanCardProps) {
  if (isLoading) {
    return <CardSkeleton />;
  }

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate?: string) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = getDaysRemaining(subscription?.endDate);
  const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 7;

  // Default/no subscription state
  if (!subscription) {
    return (
      <Card className="p-6 bg-linear-to-br from-gray-50 to-white">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Belum Ada Langganan
          </h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda untuk
            mendapatkan fitur lengkap.
          </p>
          <Button className="mt-6" onClick={onUpgradeClick}>
            <Zap className="w-4 h-4" />
            Pilih Paket
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-linear-to-br from-primary/5 to-white border-primary/20">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Paket {subscription.plan.displayName}
            </h3>
            <p className="text-gray-500 text-sm mt-0.5">
              {subscription.plan.description}
            </p>
          </div>
        </div>
        <StatusBadge status={subscription.status} />
      </div>

      {/* Warning if expiring soon */}
      {isExpiringSoon && subscription.status === "active" && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            Langganan Anda akan berakhir dalam{" "}
            <strong>{daysRemaining} hari</strong>. Perpanjang sekarang!
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            Mulai
          </div>
          <p className="mt-1 font-semibold text-gray-900">
            {formatDate(subscription.startDate)}
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            Berakhir
          </div>
          <p className="mt-1 font-semibold text-gray-900">
            {formatDate(subscription.endDate)}
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Sisa Waktu
          </div>
          <p
            className={cn(
              "mt-1 font-semibold",
              isExpiringSoon ? "text-amber-600" : "text-gray-900",
            )}
          >
            {daysRemaining} hari
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-500 mb-3">
          Fitur Termasuk
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {subscription.plan.features.slice(0, 6).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
        <Button variant="primary" onClick={onUpgradeClick}>
          <Zap className="w-4 h-4" />
          Upgrade Paket
        </Button>
        <Button variant="ghost">Perpanjang</Button>
      </div>
    </Card>
  );
}
