import { apiClient, ApiResponse } from "@/core/api/client";
import { AUTH_ENDPOINTS } from "../auth.endpoints";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  GetOnboardingDataResponse,
} from "../types/auth.types";
import { config } from "@/core/config";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      AUTH_ENDPOINTS.LOGIN,
      data,
      { credentials: "include" },
    );
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      AUTH_ENDPOINTS.REGISTER,
      data,
    );
    return response.data;
  },

  sendOtp: async (data: SendOtpRequest): Promise<SendOtpResponse> => {
    const response = await apiClient.post<ApiResponse<SendOtpResponse>>(
      AUTH_ENDPOINTS.SEND_OTP,
      data,
    );
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await apiClient.post<ApiResponse<VerifyOtpResponse>>(
      AUTH_ENDPOINTS.VERIFY_OTP,
      data,
    );
    return response.data;
  },

  refreshToken: async (): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      AUTH_ENDPOINTS.REFRESH,
      undefined,
      { credentials: "include" },
    );
    return response.data;
  },

  logout: async (refreshToken?: string): Promise<void> => {
    await apiClient.post<ApiResponse<void>>(
      AUTH_ENDPOINTS.LOGOUT,
      refreshToken ? { refreshToken } : undefined,
      { credentials: "include" },
    );
  },

  getGoogleAuthUrl: (): string => {
    return `${config.api.baseUrl}${AUTH_ENDPOINTS.GOOGLE_LOGIN}`;
  },

  getGoogleOnboarding: async (
    token: string,
  ): Promise<GetOnboardingDataResponse> => {
    const response = await apiClient.get<
      ApiResponse<GetOnboardingDataResponse>
    >(AUTH_ENDPOINTS.GOOGLE_ONBOARDING_DATA, {
      params: { token },
    });
    return response.data;
  },
};
