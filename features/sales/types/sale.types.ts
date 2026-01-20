export interface Sale {
  id: string;
  tenantId: string;
  userId: string;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items?: SaleItem[];
}

export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  productName?: string;
  quantity: number;
  price: number;
  costPriceAtSale: number;
  subtotal: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleParams {
  [key: string]: string | number | undefined;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  paymentStatus?: string;
  paymentMethod?: string;
}

export interface GetSalesResponse {
  data: Sale[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
