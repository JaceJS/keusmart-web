"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { PlanConfig, PlanFeatures, PlanLimits } from "../types/plan.types";
import { JwtPayload } from "@/features/auth/types/auth.types";

// Default plan config for unauthenticated or free users
const DEFAULT_PLAN_CONFIG: PlanConfig = {
  limits: {
    tenants: 1,
    outlets: 1,
    users: 2,
  },
  features: {
    pos: true,
    expenseTracker: true,
    reports: "basic",
    dashboard: "basic",
    exportCsv: false,
    whatsappSummary: false,
    aiInsight: false,
    stockPrediction: false,
  },
};

interface PlanContextValue {
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
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setPlanConfig(DEFAULT_PLAN_CONFIG);
        setIsLoading(false);
        return;
      }

      const decoded = jwtDecode<JwtPayload>(accessToken);

      if (decoded.planConfig) {
        setPlanConfig(decoded.planConfig);
      } else {
        // Fallback if planConfig not in token
        setPlanConfig(DEFAULT_PLAN_CONFIG);
      }
    } catch (error) {
      console.error("Failed to decode plan config from token:", error);
      setPlanConfig(DEFAULT_PLAN_CONFIG);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: PlanContextValue = {
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
