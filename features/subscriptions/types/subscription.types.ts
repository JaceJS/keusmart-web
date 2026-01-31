export interface Plan {
  id: string;
  name: string;
  displayName: string;
  price: number;
  description: string;
  features: string[];
  limits: {
    tenants?: number;
    users?: number;
  };
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  plan: Plan;
  status: "active" | "expired" | "cancelled" | "trial";
  startDate: string;
  endDate: string;
  usage: {
    users: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  subscriptionId: string;
  invoiceNumber: string;
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  paidAt?: string;
  dueDate: string;
  createdAt: string;
}

export type GetPlansResponse = Plan[];
export type GetSubscriptionResponse = Subscription;
export type GetInvoicesResponse = Invoice[];

export interface UpgradePlanRequest {
  planId: string;
}
