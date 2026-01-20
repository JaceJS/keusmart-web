import { useState, useEffect, useCallback } from "react";
import { saleService } from "../services/sale.service";
import type { Sale, SaleParams, GetSalesResponse } from "../types/sale.types";

export function useSales(initialParams: SaleParams = {}) {
  const [data, setData] = useState<Sale[]>([]);
  const [meta, setMeta] = useState<GetSalesResponse["meta"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = useCallback(async (params: SaleParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await saleService.getSales(params);
      setData(res?.data || []);
      setMeta(res?.meta || null);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data penjualan");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialParams.startDate && initialParams.endDate) {
      fetchSales(initialParams);
    }
  }, [JSON.stringify(initialParams), fetchSales]);

  return { data, meta, isLoading, error, fetchSales };
}
