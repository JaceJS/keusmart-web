export const EXPENSE_ENDPOINTS = {
  LIST: "/expenses",
  CREATE: "/expenses",
  DELETE: "/expenses", // usually /expenses/:id
  CATEGORIES: "/expenses/categories", // Assumed for category dropdown
} as const;
