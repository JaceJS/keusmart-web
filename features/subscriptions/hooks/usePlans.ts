"use client";

import { useState, useEffect, useCallback } from "react";
import { Plan } from "../types/subscription.types";
import { subscriptionService } from "../services/subscription.service";

// Default plans based on actual pricing
const DEFAULT_PLANS: Plan[] = [
  {
    id: "starter",
    name: "starter",
    displayName: "Starter",
    price: 39000,
    description: "Untuk bisnis yang baru memulai",
    features: [
      "1 Tenant",
      "2 Pengguna",
      "Pencatatan Penjualan",
      "Pencatatan Pengeluaran",
      "Laporan Harian/Bulanan (Ringkas)",
      "Dashboard Ringkasan (Basic)",
    ],
    limits: {
      tenants: 1,
      users: 2,
    },
    isPopular: false,
  },
  {
    id: "growth",
    name: "growth",
    displayName: "Growth",
    price: 79000,
    description: "Untuk bisnis yang sedang berkembang",
    features: [
      "2 Tenant",
      "5 Pengguna",
      "Pencatatan Penjualan",
      "Pencatatan Pengeluaran",
      "Laporan Harian/Bulanan (Lengkap)",
      "Dashboard Ringkasan (Lengkap)",
      "Export CSV / PDF",
      "WhatsApp Summary",
      "AI Insight (Basic)",
    ],
    limits: {
      tenants: 2,
      users: 5,
    },
    isPopular: true,
  },
  {
    id: "smart",
    name: "smart",
    displayName: "Smart",
    price: 159000,
    description: "Untuk bisnis dengan kebutuhan tinggi",
    features: [
      "5 Tenant",
      "10 Pengguna",
      "Pencatatan Penjualan",
      "Pencatatan Pengeluaran",
      "Laporan Harian/Bulanan (Advanced)",
      "Dashboard Ringkasan (Multi-tenant)",
      "Export CSV / PDF",
      "WhatsApp Summary",
      "AI Insight (Advanced)",
      "Prediksi Stok (AI)",
      "Insight Lintas Tenant",
      "Perbandingan Tenant",
      "Priority Support",
      "Custom Role Permission",
      "Backup Prioritas",
    ],
    limits: {
      tenants: 5,
      users: 10,
    },
    isPopular: false,
  },
];

interface UsePlansReturn {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePlans = (): UsePlansReturn => {
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await subscriptionService.getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Failed to fetch plans, using defaults:", err);
      // Use default plans if API fails
      setPlans(DEFAULT_PLANS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    isLoading,
    error,
    refetch: fetchPlans,
  };
};
