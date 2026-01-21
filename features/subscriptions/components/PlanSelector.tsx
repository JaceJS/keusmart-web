"use client";

import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Plan } from "../types/subscription.types";
import { Check, Zap, Star, Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface PlanSelectorProps {
  plans: Plan[];
  currentPlanId?: string;
  isLoading: boolean;
  isUpgrading: boolean;
  onSelectPlan: (planId: string) => void;
}

// Skeleton for loading
function PlansSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[400px] bg-gray-100 rounded-2xl animate-pulse"
        />
      ))}
    </div>
  );
}

// Format price to IDR
function formatPrice(price: number): string {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function PlanSelector({
  plans,
  currentPlanId,
  isLoading,
  isUpgrading,
  onSelectPlan,
}: PlanSelectorProps) {
  if (isLoading) {
    return <PlansSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Pilih Paket</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upgrade atau ubah paket sesuai kebutuhan bisnis Anda
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlanId === plan.id;
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

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {plan.displayName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500 text-sm">/bulan</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check
                      className={cn(
                        "w-4 h-4 mt-0.5 shrink-0",
                        isPopular ? "text-primary" : "text-green-500",
                      )}
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limits info */}
              {plan.limits && (
                <div className="mb-6 p-3 bg-gray-50 rounded-lg space-y-1">
                  {plan.limits.tenants && (
                    <p className="text-xs text-gray-500">
                      Tenant:{" "}
                      <span className="font-medium text-gray-700">
                        {plan.limits.tenants}
                      </span>
                    </p>
                  )}
                  {plan.limits.users && (
                    <p className="text-xs text-gray-500">
                      Pengguna:{" "}
                      <span className="font-medium text-gray-700">
                        {plan.limits.users}
                      </span>
                    </p>
                  )}
                </div>
              )}

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
                    {plan.price === 0 ? "Pilih Paket" : "Upgrade"}
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
