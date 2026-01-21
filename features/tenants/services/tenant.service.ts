import { apiClient } from "@/core/api/client";
import {
  GetTenantsResponse,
  SwitchTenantResponse,
  TenantProfile,
  UpdateTenantRequest,
} from "../types/tenant.types";
import { TENANT_ENDPOINTS } from "../tenant.endpoints";

export const tenantService = {
  getMyTenants: async (): Promise<GetTenantsResponse> => {
    return apiClient.get<GetTenantsResponse>(TENANT_ENDPOINTS.LIST);
  },

  switchTenant: async (tenantId: string): Promise<SwitchTenantResponse> => {
    return apiClient.post<SwitchTenantResponse>(TENANT_ENDPOINTS.SWITCH, {
      tenantId,
    });
  },

  getCurrentTenant: async (): Promise<TenantProfile> => {
    return apiClient.get<TenantProfile>(TENANT_ENDPOINTS.ME);
  },

  updateTenant: async (data: UpdateTenantRequest): Promise<TenantProfile> => {
    return apiClient.put<TenantProfile>(TENANT_ENDPOINTS.ME, data);
  },
};
