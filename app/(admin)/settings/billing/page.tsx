"use client";

import { useState } from "react";
import {
  CurrentPlanCard,
  PlanSelector,
  BillingHistory,
  usePlans,
  useCurrentSubscription,
  type Invoice,
} from "@/features/subscriptions";
import Loading from "./loading";

export default function BillingPage() {
  const { plans, isLoading: isLoadingPlans } = usePlans();
  const {
    subscription,
    isLoading: isLoadingSubscription,
    isUpgrading,
    upgradePlan,
  } = useCurrentSubscription();

  const [invoices] = useState<Invoice[]>([]);
  const [isLoadingInvoices] = useState(false);

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

  if (isLoadingPlans || isLoadingSubscription) {
    return <Loading />;
  }

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
        subscription={subscription}
        isLoading={isLoadingSubscription}
        onUpgradeClick={scrollToPlanSelector}
      />

      {/* Plan Selector */}
      <div id="plan-selector">
        <PlanSelector
          plans={plans}
          currentPlanId={subscription?.planId}
          isLoading={isLoadingPlans}
          isUpgrading={isUpgrading}
          onSelectPlan={handleSelectPlan}
        />
      </div>

      {/* Billing History */}
      <BillingHistory invoices={invoices} isLoading={isLoadingInvoices} />
    </div>
  );
}
