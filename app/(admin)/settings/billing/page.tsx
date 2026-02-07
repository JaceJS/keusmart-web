"use client";

import { useState } from "react";
import {
  CurrentPlanCard,
  PlanSelector,
  BillingHistory,
  BillingCycleToggle,
  SubscriptionSettings,
  SubscriptionStatusBanner,
  useCurrentSubscription,
  useMidtransCheckout,
  BillingCycle,
} from "@/features/subscriptions";
import { useAuth } from "@/features/auth";

export default function BillingPage() {
  const { subscription, refetch } = useCurrentSubscription();
  const { refreshSession } = useAuth();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const { checkout, isLoading: isCheckingOut } = useMidtransCheckout({
    onSuccess: async () => {
      await refetch();
      await refreshSession();
    },
    onPending: async () => {
      await refetch();
    },
  });

  const handleSelectPlan = (planId: string) => {
    checkout(planId, billingCycle);
  };

  const handleRenew = () => {
    if (subscription?.planId) {
      checkout(subscription.planId, billingCycle);
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

      {/* Status Banner */}
      <SubscriptionStatusBanner
        onUpgrade={scrollToPlanSelector}
        onRenew={handleRenew}
      />

      {/* Current Plan */}
      <CurrentPlanCard
        onUpgradeClick={scrollToPlanSelector}
        currentUsers={subscription?.usage?.users || 1}
      />

      {/* Subscription Settings */}
      <SubscriptionSettings onRenew={handleRenew} />

      {/* Plan Selector */}
      <div id="plan-selector" className="space-y-4">
        <BillingCycleToggle value={billingCycle} onChange={setBillingCycle} />
        <PlanSelector
          isUpgrading={isCheckingOut}
          billingCycle={billingCycle}
          onSelectPlan={handleSelectPlan}
        />
      </div>

      {/* Payment History */}
      <BillingHistory />
    </div>
  );
}
