import { apiClient } from "@/core/api/client";
import type { GetSalesResponse, SaleParams } from "../types/sale.types";
import { SALES_ENDPOINTS } from "../sales.endpoints";

export const saleService = {
  getSales: async (params: SaleParams = {}): Promise<GetSalesResponse> => {
    return apiClient.get<GetSalesResponse>(SALES_ENDPOINTS.LIST, {
      params,
    });
  },
};
