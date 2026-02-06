"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Subscription } from "../types/subscription.types";
import { subscriptionService } from "../services/subscription.service";
import { getTrialDaysRemaining } from "@/utils/subscription";

interface UseCurrentSubscriptionReturn {
  subscription: Subscription | null;
  isLoading: boolean;
  isUpgrading: boolean;
  isCancelling: boolean;
  isTogglingAutoRenew: boolean;
  error: string | null;
  isTrial: boolean;
  trialDaysRemaining: number;
  upgradePlan: (planId: string) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  toggleAutoRenew: (autoRenew: boolean) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export const useCurrentSubscription = (): UseCurrentSubscriptionReturn => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isTogglingAutoRenew, setIsTogglingAutoRenew] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await subscriptionService.getCurrentSubscription();
      setSubscription(data);
    } catch (err) {
      console.error("Failed to fetch subscription:", err);
      setError("Gagal memuat informasi langganan");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const upgradePlan = async (planId: string): Promise<boolean> => {
    setIsUpgrading(true);
    setError(null);
    try {
      const updated = await subscriptionService.upgradePlan({ planId });
      setSubscription(updated);
      return true;
    } catch (err) {
      console.error("Failed to upgrade plan:", err);
      setError("Gagal mengubah paket");
      return false;
    } finally {
      setIsUpgrading(false);
    }
  };

  const cancelSubscription = async (): Promise<boolean> => {
    setIsCancelling(true);
    setError(null);
    try {
      const updated = await subscriptionService.cancelSubscription();
      setSubscription(updated);
      return true;
    } catch (err) {
      console.error("Failed to cancel subscription:", err);
      setError("Gagal membatalkan langganan");
      return false;
    } finally {
      setIsCancelling(false);
    }
  };

  const toggleAutoRenew = async (autoRenew: boolean): Promise<boolean> => {
    setIsTogglingAutoRenew(true);
    setError(null);
    try {
      const updated = await subscriptionService.toggleAutoRenew({ autoRenew });
      setSubscription(updated);
      return true;
    } catch (err) {
      console.error("Failed to toggle auto-renew:", err);
      setError("Gagal mengubah pengaturan perpanjangan otomatis");
      return false;
    } finally {
      setIsTogglingAutoRenew(false);
    }
  };

  const isTrial = useMemo(
    () => subscription?.status === "trial",
    [subscription?.status],
  );

  const trialDaysRemaining = useMemo(
    () => getTrialDaysRemaining(subscription?.trialEndDate),
    [subscription?.trialEndDate],
  );

  return {
    subscription,
    isLoading,
    isUpgrading,
    isCancelling,
    isTogglingAutoRenew,
    error,
    isTrial,
    trialDaysRemaining,
    upgradePlan,
    cancelSubscription,
    toggleAutoRenew,
    refetch: fetchSubscription,
  };
};
