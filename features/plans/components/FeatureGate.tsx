"use client";

import React from "react";
import { useCanAccess } from "../hooks/useCanAccess";
import { FeatureName } from "../types/plan.types";
import { UpgradeBanner } from "./UpgradeBanner";

interface FeatureGateProps {
  feature: FeatureName;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  hideWhenUnavailable?: boolean;
}

/**
 * Component for conditional rendering based on plan features
 *
 * @example
 * // Boolean feature
 * <FeatureGate feature="exportCsv">
 *   <ExportButton />
 * </FeatureGate>
 *
 * // With custom fallback
 * <FeatureGate feature="aiInsight" fallback={<CustomUpgradeMessage />}>
 *   <AIInsightsPanel />
 * </FeatureGate>
 *
 * // Hide completely when unavailable
 * <FeatureGate feature="stockPrediction" hideWhenUnavailable>
 *   <StockPredictionWidget />
 * </FeatureGate>
 */
export function FeatureGate({
  feature,
  children,
  fallback,
  hideWhenUnavailable = false,
}: FeatureGateProps) {
  const hasAccess = useCanAccess(feature);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (hideWhenUnavailable) {
    return null;
  }

  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  return <UpgradeBanner feature={feature as string} />;
}
