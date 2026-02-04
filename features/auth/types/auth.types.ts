import { PlanConfig } from "@/features/plans/types/plan.types";

export type UserRole = "owner" | "admin" | "staff";

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
  plan: string;
  logoUrl?: string;
  planConfig?: PlanConfig;
}

export interface TenantWithRole extends Tenant {
  role: UserRole;
}

export interface Token {
  accessToken: string;
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
  login_id: string;
  password: string;
  verificationToken: string;
}

export interface SendOtpRequest {
  login_id: string;
  name: string;
  businessName: string;
}

export interface SendOtpResponse {
  expiresIn: number;
}

export interface VerifyOtpRequest {
  login_id: string;
  otp: string;
}

export interface VerifyOtpResponse {
  login_id: string;
  type: string;
  verificationToken: string;
  requiresPassword: boolean;
}

export type RegisterResponse = LoginResponse;

export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
  tenantName: string;
  tenantPlan: string;
  tenantLogoUrl?: string;
  exp: number;
  iat: number;
}

export interface GetOnboardingDataResponse {
  email: string;
  name: string;
  googleId: string;
  picture: string;
}

export interface GoogleRegisterRequest {
  token: string;
  businessName: string;
  phone?: string;
}

export type GoogleRegisterResponse = LoginResponse;

export interface GetMeResponse {
  user: User;
  tenant: Tenant;
  tenants: TenantWithRole[];
}
