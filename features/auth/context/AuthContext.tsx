"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthState, JwtPayload, User, Tenant } from "../types/auth.types";
import { authService } from "../services/auth.service";
import {
  PlanConfig,
  PlanFeatures,
  PlanLimits,
  PlanTier,
} from "@/features/plans/types/plan.types";
import {
  planConfigUtils,
  DEFAULT_PLAN_CONFIG,
} from "../utils/planConfig.utils";

interface AuthContextValue extends AuthState {
  // Plan data
  tier: PlanTier;
  limits: PlanLimits;
  features: PlanFeatures;
  planConfig: PlanConfig;
  // Session refresh
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    tenant: null,
    tenants: [],
    isAuthenticated: false,
    isLoading: true,
  });

  const [planConfig, setPlanConfig] = useState<PlanConfig>(
    planConfigUtils.load(),
  );

  useEffect(() => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
        setPlanConfig(DEFAULT_PLAN_CONFIG);
        return;
      }

      const decoded = jwtDecode<JwtPayload>(accessToken);

      // Extract user data
      const user: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        phone: null,
        role: decoded.role,
      };

      // Extract tenant data
      const tenant: Tenant = {
        id: decoded.tenantId,
        name: decoded.tenantName || "KeuSmart Business",
        plan: decoded.tenantPlan || "free",
        logoUrl: decoded.tenantLogoUrl || "",
      };

      setPlanConfig(planConfigUtils.load());

      setAuthState({
        user,
        tenant,
        tenants: [],
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
      }));
      setPlanConfig(DEFAULT_PLAN_CONFIG);
    }
  }, []);

  const refreshSession = async () => {
    try {
      const data = await authService.getMe();

      setAuthState((prev) => ({
        ...prev,
        user: data.user,
        tenant: data.tenant,
        tenants: data.tenants,
      }));

      if (data.tenant?.planConfig) {
        planConfigUtils.save(data.tenant.planConfig);
        setPlanConfig(data.tenant.planConfig);
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
    }
  };

  const value: AuthContextValue = {
    ...authState,
    tier: planConfig.tier,
    limits: planConfig.limits,
    features: planConfig.features,
    planConfig,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Main auth hook - returns all auth and plan data
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

/**
 * Focused hook for user data only
 */
export function useUser() {
  const { user, isLoading, isAuthenticated } = useAuth();
  return { user, isLoading, isAuthenticated };
}

/**
 * Focused hook for tenant data only
 */
export function useTenant() {
  const { tenant, tenants, isLoading } = useAuth();
  return { tenant, tenants, isLoading };
}

/**
 * Focused hook for plan/subscription data only
 * Provides backward compatibility with usePlan from PlanContext
 */
export function usePlan() {
  const { tier, limits, features, planConfig, isLoading } = useAuth();
  return { tier, limits, features, planConfig, isLoading };
}
