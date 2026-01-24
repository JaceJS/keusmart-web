import { apiClient, ApiResponse, PaginatedResponse } from "@/core/api/client";
import type { Sale, SaleParams } from "../types/sale.types";
import { SALES_ENDPOINTS } from "../sales.endpoints";

export const saleService = {
  getSales: async (
    params: SaleParams = {},
  ): Promise<PaginatedResponse<Sale>> => {
    const response = await apiClient.get<ApiResponse<Sale[]>>(
      SALES_ENDPOINTS.LIST,
      {
        params,
      },
    );

    return {
      data: response.data || [],
      meta: response.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  },
};
