"use client";

import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { usePlan } from "@/features/auth";
import { getPlanById, formatPlanPrice } from "@/features/plans/constants/plans";
import { useCurrentSubscription } from "../hooks/useCurrentSubscription";
import { Crown, CheckCircle, Zap, Users, Building2, Clock } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { formatDate } from "@/utils/date";
import { getTrialDaysRemaining } from "@/utils/subscription";

interface CurrentPlanCardProps {
  onUpgradeClick?: () => void;
  currentUsers?: number;
  currentOutlets?: number;
}

function UsageBar({
  used,
  limit,
  label,
  icon: Icon,
}: {
  used: number;
  limit: number;
  label: string;
  icon: React.ElementType;
}) {
  const percentage = Math.min(100, (used / limit) * 100);
  const isNearLimit = percentage >= 80;
  const isAtLimit = used >= limit;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </div>
        <span
          className={cn(
            "font-medium",
            isAtLimit
              ? "text-red-600"
              : isNearLimit
                ? "text-amber-600"
                : "text-gray-900",
          )}
        >
          {used}/{limit}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isAtLimit
              ? "bg-red-500"
              : isNearLimit
                ? "bg-amber-500"
                : "bg-primary",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function CurrentPlanCard({
  onUpgradeClick,
  currentUsers = 1,
  currentOutlets = 1,
}: CurrentPlanCardProps) {
  const { tier, limits, isLoading } = usePlan();
  const { subscription, isTrial, trialDaysRemaining } = useCurrentSubscription();
  const planDefinition = getPlanById(tier);

  if (isLoading) {
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

  if (!planDefinition) {
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
          <Button variant="primary" className="mt-6" onClick={onUpgradeClick}>
            <Zap className="w-4 h-4" />
            Pilih Paket
          </Button>
        </div>
      </Card>
    );
  }

  const isTopTier = tier === "smart";

  return (
    <Card className="p-6 bg-linear-to-br from-primary/5 to-white border-primary/20">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
              planDefinition.color.replace("bg-", "bg-linear-to-br from-") +
                " to-" +
                planDefinition.color.replace("bg-", ""),
            )}
          >
            <Crown className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Paket {planDefinition.displayName}
              {isTrial && (
                <span className="ml-2 text-sm font-normal text-blue-600">
                  (Trial)
                </span>
              )}
            </h3>
            <p className="text-gray-500 text-sm mt-0.5">
              {planDefinition.description}
            </p>
          </div>
        </div>
        {isTrial ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <Clock className="w-3.5 h-3.5" />
            {trialDaysRemaining} hari lagi
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <CheckCircle className="w-3.5 h-3.5" />
            Aktif
          </span>
        )}
      </div>

      {/* Pricing */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-sm text-gray-500">Rp</span>
        <span className="text-2xl font-bold text-gray-900">
          {formatPlanPrice(planDefinition.price)}
        </span>
        <span className="text-gray-500">/bulan</span>
      </div>

      {/* Trial End Date */}
      {isTrial && subscription?.endDate && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            Trial berakhir: {formatDate(subscription.endDate)}
          </p>
        </div>
      )}

      {/* Usage Meters */}
      <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Penggunaan</h4>
        <UsageBar
          used={currentUsers}
          limit={limits.users}
          label="Pengguna"
          icon={Users}
        />
        {/* <UsageBar
          used={currentOutlets}
          limit={limits.outlets}
          label="Outlet"
          icon={Building2}
        /> */}
      </div>

      {/* Key Features */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-500 mb-3">
          Fitur Termasuk
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {planDefinition.features.pos && (
            <FeatureChip label="Pencatatan Penjualan" />
          )}
          {planDefinition.features.expenseTracker && (
            <FeatureChip label="Pencatatan Pengeluaran" />
          )}
          {planDefinition.features.reportsChart && (
            <FeatureChip label="Laporan Grafik" />
          )}
          {planDefinition.features.exportCsv && (
            <FeatureChip label="Export CSV" />
          )}
          {planDefinition.features.aiInsight && (
            <FeatureChip label="AI Insight" />
          )}
          {planDefinition.features.whatsappSummary && (
            <FeatureChip label="WhatsApp Summary" />
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
        {!isTopTier && (
          <Button variant="primary" onClick={onUpgradeClick}>
            <Zap className="w-4 h-4" />
            Upgrade Paket
          </Button>
        )}
        <Button variant="primary">Perpanjang</Button>
      </div>
    </Card>
  );
}

function FeatureChip({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
