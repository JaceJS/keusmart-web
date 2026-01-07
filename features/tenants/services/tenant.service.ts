import { apiClient } from "@/core/api/client";
import {
  GetTenantsResponse,
  SwitchTenantResponse,
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
};
