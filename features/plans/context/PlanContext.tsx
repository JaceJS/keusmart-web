"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  PlanConfig,
  PlanFeatures,
  PlanLimits,
  PlanTier,
} from "../types/plan.types";
import { planConfigUtils, DEFAULT_PLAN_CONFIG } from "@/features/auth/utils/planConfig.utils";

interface PlanContextValue {
  tier: PlanTier;
  limits: PlanLimits;
  features: PlanFeatures;
  planConfig: PlanConfig;
  isLoading: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [planConfig, setPlanConfig] = useState<PlanConfig>(DEFAULT_PLAN_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const config = planConfigUtils.load();
      setPlanConfig(config);
    } catch (error) {
      console.error("Failed to load plan config:", error);
      setPlanConfig(DEFAULT_PLAN_CONFIG);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: PlanContextValue = {
    tier: planConfig.tier,
    limits: planConfig.limits,
    features: planConfig.features,
    planConfig,
    isLoading,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return context;
}
