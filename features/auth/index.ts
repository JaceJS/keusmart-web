/**
 * Auth feature - public API
 */

// Types
export type AuthMode = "login" | "register";

// Utils
export {
  type RegisterStep,
  getRegisterStepTitle,
  getRegisterStepDescription,
} from "./utils/register.utils";

// Components
export { AuthTabs } from "./components/AuthTabs";
export { LoginForm } from "./components/LoginForm";
export { RegisterForm } from "./components/RegisterForm";
export { StepIndicator } from "./components/StepIndicator";
export { GoogleAuthButton } from "./components/GoogleAuthButton";

// Services
export { authService } from "./services/auth.service";
export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  SendOtpRequest,
  VerifyOtpRequest,
  User,
  Tenant,
  TenantWithRole,
  Token,
  AuthState,
  UserRole,
} from "./types/auth.types";

// Hooks
export { useLogin } from "./hooks/useLogin";
export { useRegister } from "./hooks/useRegister";
export { useOtp } from "./hooks/useOtp";
