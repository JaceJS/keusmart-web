export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login/email",
  REGISTER: "/auth/register/complete",
  SEND_OTP: "/auth/register/otp",
  VERIFY_OTP: "/auth/register/otp/verify",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
} as const;
