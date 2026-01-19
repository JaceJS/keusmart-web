import { useState, useEffect, useCallback } from "react";
import { expenseService } from "../services/expense.service";
import type {
  Expense,
  ExpenseParams,
  GetExpensesResponse,
} from "../types/expense.types";

export function useExpenses(initialParams: ExpenseParams = {}) {
  const [data, setData] = useState<Expense[]>([]);
  const [meta, setMeta] = useState<GetExpensesResponse["meta"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async (params: ExpenseParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await expenseService.getExpenses(params);
      setData(res?.data || []);
      setMeta(res?.meta || null);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data pengeluaran");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch if params provided, or expose fetcher for manual triggering
  useEffect(() => {
    if (initialParams.startDate && initialParams.endDate) {
      fetchExpenses(initialParams);
    }
  }, [JSON.stringify(initialParams), fetchExpenses]);

  return { data, meta, isLoading, error, fetchExpenses };
}
