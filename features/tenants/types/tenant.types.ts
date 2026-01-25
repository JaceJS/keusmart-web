import { UserRole } from "@/features/auth/types/auth.types";

export interface Tenant {
  id: string;
  name: string;
  plan: string;
  logoUrl?: string;
  role: UserRole;
}

export type SwitchTenantResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
  tenant: {
    id: string;
    name: string;
    plan: string;
  };
};

export type GetTenantsResponse = Tenant[];

// Profile detail (response from GET /tenants/me)
export interface TenantProfile {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  plan: string;
  subscriptionStatus: string;
  subscriptionEndDate?: string;
  logoUrl?: string;
  address?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Update request (for PUT /tenants/me)
export interface UpdateTenantRequest {
  name?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  address?: string;
  description?: string;
}
