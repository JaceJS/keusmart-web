export interface PlanLimits {
  tenants: number;
  outlets: number;
  users: number;
}

export interface PlanFeatures {
  pos: boolean;
  expenseTracker: boolean;
  reports: "basic" | "advanced";
  dashboard: "basic" | "standard" | "multi-branch";
  exportCsv: boolean;
  whatsappSummary: boolean;
  aiInsight: false | "basic" | "advanced";
  stockPrediction: boolean;
  // MVP: Commented out for now
  // crossBranchInsight: boolean;
  // branchComparison: boolean;
  // prioritySupport: boolean;
  // customRole: boolean;
  // priorityBackup: boolean;
}

export interface PlanConfig {
  limits: PlanLimits;
  features: PlanFeatures;
}

// Feature name type for type-safe access
export type FeatureName = keyof PlanFeatures;
export type LimitName = keyof PlanLimits;

// Tiered feature levels for comparison
export const TIER_LEVELS = {
  reports: ["basic", "advanced"] as const,
  dashboard: ["basic", "standard", "multi-branch"] as const,
  aiInsight: [false, "basic", "advanced"] as const,
} as const;

export type TieredFeature = keyof typeof TIER_LEVELS;
