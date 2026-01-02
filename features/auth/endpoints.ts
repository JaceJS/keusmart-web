/**
 * Auth API Endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  SEND_OTP: "/auth/send-otp",
  VERIFY_OTP: "/auth/verify-otp",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
} as const;
