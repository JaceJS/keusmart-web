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

// API Calls
export const authService = {
  /**
   * Login with email and password
   */
  login: (data: LoginRequest) => {
    return apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
  },

  /**
   * Register new account
   */
  register: (data: RegisterRequest) => {
    return apiClient.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, data);
  },

  /**
   * Send OTP to email for verification
   */
  sendOtp: (data: SendOtpRequest) => {
    return apiClient.post<{ message: string }>(AUTH_ENDPOINTS.SEND_OTP, data);
  },

  /**
   * Verify OTP code
   */
  verifyOtp: (data: VerifyOtpRequest) => {
    return apiClient.post<VerifyOtpResponse>(AUTH_ENDPOINTS.VERIFY_OTP, data);
  },

  /**
   * Logout (invalidate tokens)
   */
  logout: () => {
    return apiClient.post<void>(AUTH_ENDPOINTS.LOGOUT);
  },

  /**
   * Get current user profile
   */
  getMe: () => {
    return apiClient.get<LoginResponse["user"]>(AUTH_ENDPOINTS.ME);
  },
};
