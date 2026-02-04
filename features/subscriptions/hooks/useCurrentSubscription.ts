"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Subscription, UpgradePlanRequest } from "../types/subscription.types";
import { subscriptionService } from "../services/subscription.service";
import { getTrialDaysRemaining } from "@/utils/subscription";

interface UseCurrentSubscriptionReturn {
  subscription: Subscription | null;
  isLoading: boolean;
  isUpgrading: boolean;
  error: string | null;
  isTrial: boolean;
  trialDaysRemaining: number;
  upgradePlan: (planId: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export const useCurrentSubscription = (): UseCurrentSubscriptionReturn => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
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
      const data: UpgradePlanRequest = { planId };
      const updated = await subscriptionService.upgradePlan(data);
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
    error,
    isTrial,
    trialDaysRemaining,
    upgradePlan,
    refetch: fetchSubscription,
  };
};
