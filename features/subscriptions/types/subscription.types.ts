export interface Plan {
  id: string;
  name: string;
  displayName: string;
  price: number;
  yearlyPrice?: number;
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
  billingCycle: BillingCycle;
  autoRenew: boolean;
  startDate: string;
  endDate: string;
  trialEndDate: string;
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

// Billing cycle type
export type BillingCycle = "monthly" | "yearly";

// Checkout request/response
export interface CheckoutRequest {
  planSlug: string;
  billingCycle: BillingCycle;
}

export interface CheckoutResponse {
  snapToken: string;
  orderId: string;
}

// Payment history
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: "pending" | "success" | "failed" | "expired";
  paymentMethod?: string;
  planName?: string;
  billingCycle?: BillingCycle;
  paidAt?: string;
  createdAt: string;
}

// Auto-renew toggle
export interface AutoRenewRequest {
  autoRenew: boolean;
}

// Response types
export type GetPlansResponse = Plan[];
export type GetSubscriptionResponse = Subscription;
export type GetInvoicesResponse = Invoice[];
export type GetPaymentsResponse = Payment[];

export interface UpgradePlanRequest {
  planId: string;
}
