import { useState, useEffect, useCallback } from "react";
import { saleService } from "../services/sale.service";
import type { Sale, SaleParams } from "../types/sale.types";
import type { PaginatedMeta } from "@/core/api/client";

export function useSales(initialParams: SaleParams = {}) {
  const [data, setData] = useState<Sale[]>([]);
  const [meta, setMeta] = useState<PaginatedMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = useCallback(async (params: SaleParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, meta } = await saleService.getSales(params);

      setData(data);
      setMeta(meta);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data penjualan");
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
      fetchSales(initialParams);
    }
  }, [JSON.stringify(initialParams), fetchSales]);

  return { data, meta, isLoading, error, fetchSales };
}
