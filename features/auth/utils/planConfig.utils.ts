import Cookies from "js-cookie";
import { config } from "@/core/config";
import type { PlanConfig } from "@/features/plans/types/plan.types";

const DEFAULT_PLAN_CONFIG: PlanConfig = {
  tier: "starter",
  limits: { tenants: 1, outlets: 1, users: 2 },
  features: {
    pos: true,
    expenseTracker: true,
    reportsChart: false,
    exportCsv: false,
    customDateRange: false,
    multiBranch: false,
    aiInsight: false,
    whatsappSummary: false,
    stockPrediction: false,
  },
};

export const planConfigUtils = {
  save(planConfig: PlanConfig): void {
    try {
      Cookies.set(config.auth.planConfigKey, JSON.stringify(planConfig), {
        expires: 7,
      });
    } catch (error) {
      console.error("Failed to save planConfig:", error);
    }
  },

  load(): PlanConfig {
    try {
      const stored = Cookies.get(config.auth.planConfigKey);
      return stored ? JSON.parse(stored) : DEFAULT_PLAN_CONFIG;
    } catch (error) {
      console.error("Failed to parse planConfig:", error);
      return DEFAULT_PLAN_CONFIG;
    }
  },

  remove(): void {
    Cookies.remove(config.auth.planConfigKey);
  },

  getDefault(): PlanConfig {
    return DEFAULT_PLAN_CONFIG;
  },
};

export { DEFAULT_PLAN_CONFIG };
