import { apiClient, ApiResponse } from "@/core/api/client";
import {
  GetTenantsResponse,
  SwitchTenantResponse,
  TenantProfile,
  UpdateTenantRequest,
} from "../types/tenant.types";
import { TENANT_ENDPOINTS } from "../tenant.endpoints";

export const tenantService = {
  getMyTenants: async (): Promise<GetTenantsResponse> => {
    const response = await apiClient.get<ApiResponse<GetTenantsResponse>>(
      TENANT_ENDPOINTS.LIST,
    );
    return response.data;
  },

  switchTenant: async (tenantId: string): Promise<SwitchTenantResponse> => {
    const response = await apiClient.post<ApiResponse<SwitchTenantResponse>>(
      TENANT_ENDPOINTS.SWITCH,
      { tenantId },
    );
    return response.data;
  },

  getCurrentTenant: async (): Promise<TenantProfile> => {
    const response = await apiClient.get<ApiResponse<TenantProfile>>(
      TENANT_ENDPOINTS.ME,
    );
    return response.data;
  },

  updateTenant: async (data: UpdateTenantRequest): Promise<TenantProfile> => {
    const response = await apiClient.put<ApiResponse<TenantProfile>>(
      TENANT_ENDPOINTS.ME,
      data,
    );
    return response.data;
  },
};
