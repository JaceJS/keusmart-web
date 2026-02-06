"use client";

import { useState, useEffect, useCallback } from "react";
import { Payment } from "../types/subscription.types";
import { subscriptionService } from "../services/subscription.service";

interface UsePaymentHistoryReturn {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePaymentHistory = (): UsePaymentHistoryReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await subscriptionService.getPayments();
      setPayments(data);
    } catch (err) {
      console.error("Failed to fetch payment history:", err);
      setError("Gagal memuat riwayat pembayaran");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    isLoading,
    error,
    refetch: fetchPayments,
  };
};
