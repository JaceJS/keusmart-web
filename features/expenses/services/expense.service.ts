import { apiClient, ApiResponse, PaginatedResponse } from "@/core/api/client";
import { Expense, ExpenseParams } from "../types/expense.types";
import { EXPENSE_ENDPOINTS } from "../expenses.endpoints";

export const expenseService = {
  getExpenses: async (
    params: ExpenseParams = {},
  ): Promise<PaginatedResponse<Expense>> => {
    const response = await apiClient.get<ApiResponse<Expense[]>>(
      EXPENSE_ENDPOINTS.LIST,
      { params },
    );
    // Extract from ApiResponse and return clean paginated response
    return {
      data: response.data || [],
      meta: response.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  },
};
