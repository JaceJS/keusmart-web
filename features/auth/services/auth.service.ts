import { apiClient } from "@/core/api/client";
import { AUTH_ENDPOINTS } from "../auth.endpoints";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendOtpRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types/auth.types";

export const authService = {
  login: (data: LoginRequest) => {
    return apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data, {
      credentials: "include",
    });
  },

  register: (data: RegisterRequest) => {
    return apiClient.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, data);
  },

  sendOtp: (data: SendOtpRequest) => {
    return apiClient.post<{ message: string }>(AUTH_ENDPOINTS.SEND_OTP, data);
  },

  verifyOtp: (data: VerifyOtpRequest) => {
    return apiClient.post<VerifyOtpResponse>(AUTH_ENDPOINTS.VERIFY_OTP, data);
  },

  refreshToken: () => {
    return apiClient.post<LoginResponse>(AUTH_ENDPOINTS.REFRESH, undefined, {
      credentials: "include",
    });
  },

  logout: (refreshToken?: string) => {
    // Send refreshToken in body if provided, also include credentials for HttpOnly cookies
    return apiClient.post<void>(
      AUTH_ENDPOINTS.LOGOUT,
      refreshToken ? { refreshToken } : undefined,
      { credentials: "include" },
    );
  },
};
