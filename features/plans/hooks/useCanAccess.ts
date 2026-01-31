"use client";

import { usePlan } from "../context/PlanContext";
import { FeatureName } from "../types/plan.types";

/**
 * Hook for checking feature access
 *
 * @example
 * const canViewChart = useCanAccess("reportsChart");
 * const canExport = useCanAccess("exportCsv");
 *
 * if (canViewChart) {
 *   return <Chart />;
 * } else {
 *   return <LockedCard />;
 * }
 */
export function useCanAccess(feature: FeatureName): boolean {
  const { features, isLoading } = usePlan();

  if (isLoading) {
    return false;
  }

  return features[feature] === true;
}

/**
 * Check if a specific limit has been reached
 *
 * @example
 * const { canAdd, remaining } = useCheckLimit("users", currentUserCount);
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
