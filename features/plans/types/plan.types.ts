export type PlanTier = "starter" | "growth" | "smart";

export interface PlanLimits {
  tenants: number;
  outlets: number;
  users: number;
}

export interface PlanFeatures {
  pos: boolean;
  expenseTracker: boolean;
  reportsChart: boolean;
  exportCsv: boolean;
  customDateRange: boolean;
  multiBranch: boolean;
  aiInsight: boolean;
  whatsappSummary: boolean;
  stockPrediction: boolean;
}

export interface PlanConfig {
  tier: PlanTier;
  limits: PlanLimits;
  features: PlanFeatures;
}

export type FeatureName = keyof PlanFeatures;
export type LimitName = keyof PlanLimits;
