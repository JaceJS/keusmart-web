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

export interface UpdateTenantRequest {
  name?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  address?: string;
  description?: string;
}

export interface CreateTenantRequest {
  name: string;
  phone?: string;
  address?: string;
  description?: string;
  logoUrl?: string;
}

export interface CreateTenantResponse {
  id: string;
  name: string;
  role: UserRole;
  plan: string;
}
