import { apiClient, ApiResponse } from "@/core/api/client";
import {
  GetPlansResponse,
  GetSubscriptionResponse,
  GetInvoicesResponse,
  UpgradePlanRequest,
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
};
