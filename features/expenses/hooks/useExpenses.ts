import { useState, useEffect, useCallback } from "react";
import { expenseService } from "../services/expense.service";
import type { Expense, ExpenseParams } from "../types/expense.types";
import type { PaginatedMeta } from "@/core/api/client";

export function useExpenses(initialParams: ExpenseParams = {}) {
  const [data, setData] = useState<Expense[]>([]);
  const [meta, setMeta] = useState<PaginatedMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async (params: ExpenseParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, meta } = await expenseService.getExpenses(params);

      setData(data);
      setMeta(meta);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data pengeluaran");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      initialParams.period ||
      (initialParams.startDate && initialParams.endDate)
    ) {
      fetchExpenses(initialParams);
    }
  }, [JSON.stringify(initialParams), fetchExpenses]);

  return { data, meta, isLoading, error, fetchExpenses };
}
