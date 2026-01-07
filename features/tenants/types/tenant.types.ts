import { UserRole } from "@/features/auth/types/auth.types";

export interface Tenant {
  id: string;
  name: string;
  plan: string;
  logo?: string;
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
