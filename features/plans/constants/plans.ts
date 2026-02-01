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
      reportsChart: false,
      exportCsv: false,
      aiInsight: false,
      whatsappSummary: false,
      customDateRange: false,
      multiBranch: false,
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
      reportsChart: true,
      exportCsv: true,
      aiInsight: true,
      whatsappSummary: true,
      customDateRange: false,
      multiBranch: false,
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
      reportsChart: true,
      exportCsv: true,
      aiInsight: true,
      whatsappSummary: true,
      customDateRange: true,
      multiBranch: true,
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
    name: "Laporan Grafik Keuangan",
    key: "reportsChart",
    getValue: (plan) => plan.features.reportsChart,
  },
  {
    name: "Export CSV / PDF",
    key: "exportCsv",
    getValue: (plan) => plan.features.exportCsv,
  },
  {
    name: "AI Insight",
    key: "aiInsight",
    getValue: (plan) => plan.features.aiInsight,
  },
  {
    name: "WhatsApp Summary",
    key: "whatsappSummary",
    getValue: (plan) => plan.features.whatsappSummary,
  },
  {
    name: "Custom Date Range",
    key: "customDateRange",
    getValue: (plan) => plan.features.customDateRange,
  },
  // TODO: uncomment if already implement multi branch
  // {
  //   name: "Multi-Cabang Dashboard",
  //   key: "multiBranch",
  //   getValue: (plan) => plan.features.multiBranch,
  // },
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
