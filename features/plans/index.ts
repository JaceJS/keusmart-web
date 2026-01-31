// Types
export type {
  PlanConfig,
  PlanLimits,
  PlanFeatures,
  PlanTier,
  FeatureName,
  LimitName,
} from "./types/plan.types";

// Constants
export {
  PLANS,
  FEATURE_COMPARISON,
  getPlanById,
  formatPlanPrice,
  type PlanId,
  type PlanDefinition,
  type FeatureDisplay,
} from "./constants/plans";

// Context - re-export from auth for backward compatibility
export { usePlan } from "@/features/auth";

// Legacy PlanProvider - kept for reference but should migrate to AuthProvider
export { PlanProvider } from "./context/PlanContext";

// Hooks
export { useCanAccess, useCheckLimit } from "./hooks/useCanAccess";

// Components
export { FeatureGate } from "./components/FeatureGate";
export { UpgradeBanner } from "./components/UpgradeBanner";
export { LockedFeatureCard } from "./components/LockedFeatureCard";
