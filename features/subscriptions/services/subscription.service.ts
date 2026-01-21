import { apiClient } from "@/core/api/client";
import {
  GetPlansResponse,
  GetSubscriptionResponse,
  GetInvoicesResponse,
  UpgradePlanRequest,
} from "../types/subscription.types";
import { SUBSCRIPTION_ENDPOINTS } from "../subscription.endpoints";

export const subscriptionService = {
  getPlans: async (): Promise<GetPlansResponse> => {
    return apiClient.get<GetPlansResponse>(SUBSCRIPTION_ENDPOINTS.PLANS);
  },

  getCurrentSubscription: async (): Promise<GetSubscriptionResponse> => {
    return apiClient.get<GetSubscriptionResponse>(
      SUBSCRIPTION_ENDPOINTS.CURRENT,
    );
  },

  upgradePlan: async (
    data: UpgradePlanRequest,
  ): Promise<GetSubscriptionResponse> => {
    return apiClient.post<GetSubscriptionResponse>(
      SUBSCRIPTION_ENDPOINTS.UPGRADE,
      data,
    );
  },

  getInvoices: async (): Promise<GetInvoicesResponse> => {
    return apiClient.get<GetInvoicesResponse>(SUBSCRIPTION_ENDPOINTS.INVOICES);
  },
};
