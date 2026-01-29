"use client";

import React from "react";
import { useCanAccess } from "../hooks/useCanAccess";
import { FeatureName, TieredFeature, TIER_LEVELS } from "../types/plan.types";
import { UpgradeBanner } from "./UpgradeBanner";

type TierValue<T extends TieredFeature> = (typeof TIER_LEVELS)[T][number];

interface FeatureGateProps<T extends FeatureName> {
  feature: T;
  minLevel?: T extends TieredFeature ? TierValue<T> : never;
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
 * // Tiered feature with minimum level
 * <FeatureGate feature="reports" minLevel="advanced">
 *   <AdvancedReportsSection />
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
export function FeatureGate<T extends FeatureName>({
  feature,
  minLevel,
  children,
  fallback,
  hideWhenUnavailable = false,
}: FeatureGateProps<T>) {
  const hasAccess = useCanAccess(feature, minLevel as never);

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
