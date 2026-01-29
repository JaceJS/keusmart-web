import { PlanConfig, PlanFeatures, PlanLimits } from "../types/plan.types";

export type PlanId = "starter" | "growth" | "smart";

export interface PlanDefinition {
  id: PlanId;
  name: string;
  displayName: string;
  price: number;
  description: string;
  color: string;
  cta: string;
  isPopular: boolean;
  limits: PlanLimits;
  features: PlanFeatures;
}

export interface FeatureDisplay {
  name: string;
  key: keyof PlanFeatures | "tenants" | "users";
  getValue: (plan: PlanDefinition) => boolean | string;
}

export const PLANS: PlanDefinition[] = [
  {
    id: "starter",
    name: "starter",
    displayName: "Starter",
    price: 39000,
    description: "Untuk UMKM yang baru memulai",
    color: "bg-emerald-500",
    cta: "Mulai Starter",
    isPopular: false,
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
  },
  {
    id: "growth",
    name: "growth",
    displayName: "Growth",
    price: 79000,
    description: "Untuk bisnis yang sedang berkembang",
    color: "bg-amber-500",
    cta: "Pilih Growth",
    isPopular: true,
    limits: {
      tenants: 2,
      outlets: 3,
      users: 5,
    },
    features: {
      pos: true,
      expenseTracker: true,
      reports: "advanced",
      dashboard: "standard",
      exportCsv: true,
      whatsappSummary: true,
      aiInsight: "basic",
      stockPrediction: false,
    },
  },
  {
    id: "smart",
    name: "smart",
    displayName: "Smart",
    price: 159000,
    description: "Untuk bisnis multi-cabang",
    color: "bg-blue-500",
    cta: "Pilih Smart",
    isPopular: false,
    limits: {
      tenants: 5,
      outlets: 10,
      users: 10,
    },
    features: {
      pos: true,
      expenseTracker: true,
      reports: "advanced",
      dashboard: "multi-branch",
      exportCsv: true,
      whatsappSummary: true,
      aiInsight: "advanced",
      stockPrediction: true,
    },
  },
];

// Feature comparison table configuration (MVP only)
export const FEATURE_COMPARISON: FeatureDisplay[] = [
  {
    name: "Jumlah User",
    key: "users",
    getValue: (plan) => `${plan.limits.users} user`,
  },
  {
    name: "Pencatatan Penjualan",
    key: "pos",
    getValue: (plan) => plan.features.pos,
  },
  {
    name: "Pencatatan Pengeluaran",
    key: "expenseTracker",
    getValue: (plan) => plan.features.expenseTracker,
  },
  {
    name: "Laporan Harian/Bulanan",
    key: "reports",
    getValue: (plan) =>
      plan.features.reports === "basic" ? "Ringkas" : "Lengkap",
  },
  {
    name: "Dashboard Ringkasan",
    key: "dashboard",
    getValue: (plan) => {
      switch (plan.features.dashboard) {
        case "basic":
          return "Basic";
        case "standard":
          return "Lengkap";
        case "multi-branch":
          return "Multi-cabang";
      }
    },
  },
  {
    name: "Export CSV / PDF",
    key: "exportCsv",
    getValue: (plan) => plan.features.exportCsv,
  },
  {
    name: "WhatsApp Summary",
    key: "whatsappSummary",
    getValue: (plan) => plan.features.whatsappSummary,
  },
  {
    name: "AI Insight",
    key: "aiInsight",
    getValue: (plan) => {
      if (plan.features.aiInsight === false) return false;
      return plan.features.aiInsight === "basic" ? "Basic" : "Advanced";
    },
  },
  {
    name: "Prediksi Stok (AI)",
    key: "stockPrediction",
    getValue: (plan) => plan.features.stockPrediction,
  },
];

// Helper to get plan by ID
export function getPlanById(id: PlanId): PlanDefinition | undefined {
  return PLANS.find((plan) => plan.id === id);
}

// Helper to format price
export function formatPlanPrice(price: number): string {
  return new Intl.NumberFormat("id-ID").format(price);
}
