import { apiClient } from "@/core/api/client";
import {
  Expense,
  CreateExpenseRequest,
  GetExpensesResponse,
  ExpenseParams,
} from "../types/expense.types";
import { EXPENSE_ENDPOINTS } from "../expenses.endpoints";

export const expenseService = {
  getExpenses: async (
    params: ExpenseParams = {},
  ): Promise<GetExpensesResponse> => {
    return apiClient.get<GetExpensesResponse>(EXPENSE_ENDPOINTS.LIST, {
      params,
    });
  },

  createExpense: async (data: CreateExpenseRequest): Promise<Expense> => {
    return apiClient.post<Expense>(EXPENSE_ENDPOINTS.CREATE, data);
  },

  deleteExpense: async (id: string): Promise<void> => {
    return apiClient.delete(`${EXPENSE_ENDPOINTS.DELETE}/${id}`);
  },
};
