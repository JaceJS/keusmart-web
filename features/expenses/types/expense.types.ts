export interface Expense {
  id: string;
  tenant_id: string;
  user_id: string;
  category_id: string;
  name: string;
  amount: number;
  payment_method: string;
  is_recurring: boolean;
  date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseRequest {
  name: string;
  amount: number;
  category_id: string;
  payment_method: string;
  is_recurring?: boolean;
  date: string;
  notes?: string;
}

export interface ExpenseParams {
  [key: string]: string | number | undefined;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  search?: string;
}

export interface GetExpensesResponse {
  data: Expense[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
