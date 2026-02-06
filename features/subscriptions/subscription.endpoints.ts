export const SUBSCRIPTION_ENDPOINTS = {
  PLANS: "/plans",
  CURRENT: "/subscriptions/current",
  UPGRADE: "/subscriptions/upgrade",
  INVOICES: "/invoices",
  // Midtrans checkout
  CHECKOUT: "/subscriptions/checkout",
  PAYMENTS: "/subscriptions/payments",
  CANCEL: "/subscriptions/cancel",
  AUTO_RENEW: "/subscriptions/auto-renew",
  RENEW: "/subscriptions/renew",
} as const;
