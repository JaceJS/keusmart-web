import { apiClient, ApiResponse } from "@/core/api/client";
import {
  GetPlansResponse,
  GetSubscriptionResponse,
  GetInvoicesResponse,
  GetPaymentsResponse,
  UpgradePlanRequest,
  CheckoutRequest,
  CheckoutResponse,
  AutoRenewRequest,
} from "../types/subscription.types";
import { SUBSCRIPTION_ENDPOINTS } from "../subscription.endpoints";

export const subscriptionService = {
  getPlans: async (): Promise<GetPlansResponse> => {
    const response = await apiClient.get<ApiResponse<GetPlansResponse>>(
      SUBSCRIPTION_ENDPOINTS.PLANS,
    );
    return response.data;
  },

  getCurrentSubscription: async (): Promise<GetSubscriptionResponse> => {
    const response = await apiClient.get<ApiResponse<GetSubscriptionResponse>>(
      SUBSCRIPTION_ENDPOINTS.CURRENT,
    );
    return response.data;
  },

  upgradePlan: async (
    data: UpgradePlanRequest,
  ): Promise<GetSubscriptionResponse> => {
    const response = await apiClient.post<ApiResponse<GetSubscriptionResponse>>(
      SUBSCRIPTION_ENDPOINTS.UPGRADE,
      data,
    );
    return response.data;
  },

  getInvoices: async (): Promise<GetInvoicesResponse> => {
    const response = await apiClient.get<ApiResponse<GetInvoicesResponse>>(
      SUBSCRIPTION_ENDPOINTS.INVOICES,
    );
    return response.data;
  },

  createCheckout: async (data: CheckoutRequest): Promise<CheckoutResponse> => {
    const response = await apiClient.post<ApiResponse<CheckoutResponse>>(
      SUBSCRIPTION_ENDPOINTS.CHECKOUT,
      data,
    );
    return response.data;
  },

  getPayments: async (): Promise<GetPaymentsResponse> => {
    const response = await apiClient.get<ApiResponse<GetPaymentsResponse>>(
      SUBSCRIPTION_ENDPOINTS.PAYMENTS,
    );
    return response.data;
  },

  cancelSubscription: async (): Promise<GetSubscriptionResponse> => {
    const response = await apiClient.post<ApiResponse<GetSubscriptionResponse>>(
      SUBSCRIPTION_ENDPOINTS.CANCEL,
    );
    return response.data;
  },

  toggleAutoRenew: async (
    data: AutoRenewRequest,
  ): Promise<GetSubscriptionResponse> => {
    const response = await apiClient.patch<
      ApiResponse<GetSubscriptionResponse>
    >(SUBSCRIPTION_ENDPOINTS.AUTO_RENEW, data);
    return response.data;
  },

  renewSubscription: async (): Promise<CheckoutResponse> => {
    const response = await apiClient.post<ApiResponse<CheckoutResponse>>(
      SUBSCRIPTION_ENDPOINTS.RENEW,
    );
    return response.data;
  },
};
