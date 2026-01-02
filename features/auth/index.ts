/**
 * Auth feature - public API
 */

// Types
export type AuthMode = "login" | "register";

// Utils (re-export RegisterStep type from here too)
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
