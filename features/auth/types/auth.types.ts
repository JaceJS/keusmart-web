export type UserRole = "owner" | "admin" | "cashier";

export interface User {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

export interface Tenant {
  id: string;
  name: string;
  plan: "free" | "pro";
}

export interface TenantWithRole extends Tenant {
  role: UserRole;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tenant: Tenant;
  tenants: TenantWithRole[];
  tokens: Token;
}

export interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  tenants: TenantWithRole[];
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface SendOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}
