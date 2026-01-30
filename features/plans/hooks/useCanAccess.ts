"use client";

import { usePlan } from "../context/PlanContext";
import { FeatureName, TieredFeature, TIER_LEVELS } from "../types/plan.types";

type TierValue<T extends TieredFeature> = (typeof TIER_LEVELS)[T][number];

/**
 * Hook for programmatic feature access checks
 *
 * @example
 * // Boolean feature check
 * const canExport = useCanAccess("exportCsv");
 *
 * // Tiered feature check - checks if current level >= minLevel
 * const hasAdvancedReports = useCanAccess("reports", "advanced");
 */
export function useCanAccess<T extends FeatureName>(
  feature: T,
  minLevel?: T extends TieredFeature ? TierValue<T> : never,
): boolean {
  const { features, isLoading } = usePlan();

  if (isLoading) {
    return false;
  }

  const featureValue = features[feature];

  if (typeof featureValue === "boolean") {
    return featureValue;
  }

  if (featureValue === false) {
    return false;
  }

  if (minLevel !== undefined && feature in TIER_LEVELS) {
    const levels = TIER_LEVELS[feature as TieredFeature] as readonly unknown[];
    const currentLevel = featureValue;
    const currentIndex = levels.indexOf(currentLevel);
    const requiredIndex = levels.indexOf(minLevel);

    return currentIndex >= requiredIndex && currentIndex !== -1;
  }

  return true;
}

/**
 * Check if a specific limit has been reached
 *
 * @example
 * const { limits } = usePlan();
 * const canAddUser = currentUserCount < limits.users;
 */
export function useCheckLimit(
  limitName: keyof ReturnType<typeof usePlan>["limits"],
  currentCount: number,
): { canAdd: boolean; remaining: number; limit: number } {
  const { limits } = usePlan();
  const limit = limits[limitName];
  const remaining = Math.max(0, limit - currentCount);

  return {
    canAdd: currentCount < limit,
    remaining,
    limit,
  };
}
