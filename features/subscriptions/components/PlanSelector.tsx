"use client";

import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import {
  PLANS,
  formatPlanPrice,
  type PlanDefinition,
} from "@/features/plans/constants/plans";
import { usePlan } from "@/features/auth";
import { Check, Zap, Star, Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface PlanSelectorProps {
  isUpgrading?: boolean;
  onSelectPlan: (planId: string) => void;
}

export function PlanSelector({
  isUpgrading = false,
  onSelectPlan,
}: PlanSelectorProps) {
  const { tier: currentTier } = usePlan();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Pilih Paket</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upgrade atau ubah paket sesuai kebutuhan bisnis Anda
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrentPlan = currentTier === plan.id;
          const isPopular = plan.isPopular;

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative p-6 flex flex-col transition-all",
                isPopular && "border-primary shadow-lg scale-[1.02]",
                isCurrentPlan && "bg-primary/5 border-primary/30",
              )}
            >
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-lg">
                    <Star className="w-3 h-3" />
                    Populer
                  </span>
                </div>
              )}

              {/* Current plan badge */}
              {isCurrentPlan && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    Paket Saat Ini
                  </span>
                </div>
              )}

              {/* Plan header with color indicator */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn("w-3 h-3 rounded-full", plan.color)} />
                  <h3 className="text-xl font-bold text-gray-900">
                    {plan.displayName}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-gray-500">Rp</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPlanPrice(plan.price)}
                  </span>
                  <span className="text-gray-500 text-sm">/bulan</span>
                </div>
              </div>

              {/* Limits info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-1">
                {/* <p className="text-xs text-gray-500">
                  Bisnis:{" "}
                  <span className="font-medium text-gray-700">
                    {plan.limits.tenants}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Outlet:{" "}
                  <span className="font-medium text-gray-700">
                    {plan.limits.outlets}
                  </span>
                </p> */}
                <p className="text-xs text-gray-500">
                  Pengguna:{" "}
                  <span className="font-medium text-gray-700">
                    {plan.limits.users}
                  </span>
                </p>
              </div>

              {/* Key Features */}
              <div className="flex-1 space-y-2 mb-6">
                <FeatureItem
                  label="Pencatatan Penjualan"
                  enabled={plan.features.pos}
                  highlight={isPopular}
                />
                <FeatureItem
                  label="Pencatatan Pengeluaran"
                  enabled={plan.features.expenseTracker}
                  highlight={isPopular}
                />
                <FeatureItem
                  label="Laporan Grafik"
                  enabled={plan.features.reportsChart}
                  highlight={isPopular}
                />
                <FeatureItem
                  label="Export CSV"
                  enabled={plan.features.exportCsv}
                  highlight={isPopular}
                />
                <FeatureItem
                  label="AI Insight"
                  enabled={plan.features.aiInsight}
                  highlight={isPopular}
                />
                <FeatureItem
                  label="WhatsApp Summary"
                  enabled={plan.features.whatsappSummary}
                  highlight={isPopular}
                />
                <FeatureItem
                  label="Custom Date Range"
                  enabled={plan.features.customDateRange}
                  highlight={isPopular}
                />
                {/* TODO: Uncomment if already implement multi selector */}
                {/* <FeatureItem
                  label="Multi Cabang"
                  enabled={plan.features.multiBranch}
                  highlight={isPopular}
                /> */}
                <FeatureItem
                  label="Prediksi Stok (AI)"
                  enabled={plan.features.stockPrediction}
                  highlight={isPopular}
                />
              </div>

              {/* Action button */}
              <Button
                variant={
                  isCurrentPlan
                    ? "secondary"
                    : isPopular
                      ? "primary"
                      : "secondary"
                }
                className="w-full"
                disabled={isCurrentPlan || isUpgrading}
                onClick={() => onSelectPlan(plan.id)}
              >
                {isUpgrading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : isCurrentPlan ? (
                  "Paket Saat Ini"
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    {plan.cta}
                  </>
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function FeatureItem({
  label,
  enabled,
  highlight,
}: {
  label: string;
  enabled: boolean;
  highlight: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <Check
        className={cn(
          "w-4 h-4 mt-0.5 shrink-0",
          enabled
            ? highlight
              ? "text-primary"
              : "text-green-500"
            : "text-gray-300",
        )}
      />
      <span
        className={cn("text-sm", enabled ? "text-gray-700" : "text-gray-400")}
      >
        {label}
      </span>
    </div>
  );
}
