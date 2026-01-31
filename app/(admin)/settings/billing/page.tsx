"use client";

import {
  CurrentPlanCard,
  PlanSelector,
  useCurrentSubscription,
} from "@/features/subscriptions";

export default function BillingPage() {
  const { subscription, isUpgrading, upgradePlan } = useCurrentSubscription();

  const handleSelectPlan = async (planId: string) => {
    const success = await upgradePlan(planId);
    if (success) {
      console.log("Plan upgraded successfully");
    }
  };

  const scrollToPlanSelector = () => {
    document.getElementById("plan-selector")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Langganan & Tagihan
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola paket langganan dan lihat riwayat pembayaran Anda.
        </p>
      </div>

      {/* Current Plan */}
      <CurrentPlanCard
        onUpgradeClick={scrollToPlanSelector}
        currentUsers={subscription?.usage?.users || 1}
        // currentOutlets={1} // TODO: Get from API
      />

      {/* Plan Selector */}
      <div id="plan-selector">
        <PlanSelector
          isUpgrading={isUpgrading}
          onSelectPlan={handleSelectPlan}
        />
      </div>
    </div>
  );
}
