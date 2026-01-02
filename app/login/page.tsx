"use client";

import { useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { APP_NAME } from "@/app/lib/constants";
import {
  type AuthMode,
  type RegisterStep,
  AuthTabs,
  LoginForm,
  RegisterForm,
  StepIndicator,
  GoogleAuthButton,
  useLogin,
  useRegister,
  useOtp,
} from "@/features/auth";
import financeAnimation from "./finance-animation.json";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [registerStep, setRegisterStep] = useState<RegisterStep>(1);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form data
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hooks
  const { login, isLoading: isLoginLoading } = useLogin();
  const { register, isLoading: isRegisterLoading } = useRegister();
  const { sendOtp, verifyOtp, isLoading: isOtpLoading } = useOtp();

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setRegisterStep(3);
    setOtp("");
    setVerificationToken("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await login({ email, password });
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan saat login");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      if (registerStep === 1) {
        await sendOtp({ login_id: email, name, businessName });
        setRegisterStep(2);
      } else if (registerStep === 2) {
        if (otp.length !== 6) {
          throw new Error("Kode OTP harus 6 digit");
        }
        const response = await verifyOtp({ login_id: email, otp });
        if (response?.verificationToken) {
          setVerificationToken(response.verificationToken);
          setRegisterStep(3);
        }
      } else {
        if (password !== confirmPassword) {
          throw new Error("Password tidak cocok");
        }
        await register({
          login_id: email,
          password,
          verificationToken,
        });

        // TODO: Redirect to dashboard
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan saat registrasi");
    }
  };

  const handleStepBack = () => {
    setRegisterStep((prev) => (prev - 1) as RegisterStep);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Animation */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-secondary p-12">
        <div className="max-w-lg w-full">
          <Lottie
            animationData={financeAnimation}
            loop={true}
            className="w-full h-auto"
          />
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-foreground">
              {mode === "login"
                ? "Kelola Keuangan Bisnis dengan Mudah"
                : "Mulai Perjalanan Bisnis Anda"}
            </h2>
            <p className="text-text-secondary mt-2">
              {mode === "login"
                ? "Catat transaksi, pantau laporan, dan dapatkan insight bisnis dalam satu aplikasi."
                : "Bergabung dengan ribuan UMKM yang sudah mengelola keuangan dengan lebih cerdas."}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex flex-col p-6 sm:p-12 bg-background overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col min-h-full justify-center space-y-6">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold text-primary">
              {APP_NAME}
            </Link>
          </div>

          {/* Tabs */}
          <AuthTabs mode={mode} onModeChange={handleModeChange} />

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4 pb-8">
            {/* Register Step Indicator */}
            {mode === "register" && (
              <StepIndicator
                currentStep={registerStep}
                email={email}
                onBack={handleStepBack}
              />
            )}

            {/* Login Form */}
            {mode === "login" && (
              <LoginForm
                email={email}
                password={password}
                rememberMe={rememberMe}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onRememberMeChange={setRememberMe}
                onSubmit={handleLoginSubmit}
              />
            )}

            {/* Register Form */}
            {mode === "register" && (
              <RegisterForm
                step={registerStep}
                email={email}
                name={name}
                businessName={businessName}
                otp={otp}
                password={password}
                confirmPassword={confirmPassword}
                agreeTerms={agreeTerms}
                onEmailChange={setEmail}
                onNameChange={setName}
                onBusinessNameChange={setBusinessName}
                onOtpChange={setOtp}
                onPasswordChange={setPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onAgreeTermsChange={setAgreeTerms}
                onSubmit={handleRegisterSubmit}
                onResendOtp={() =>
                  sendOtp({ login_id: email, name, businessName })
                }
                isLoading={isOtpLoading || isRegisterLoading}
              />
            )}

            {/* Google Auth - only for login and register step 1 */}
            {(mode === "login" ||
              (mode === "register" && registerStep === 1)) && (
              <GoogleAuthButton mode={mode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
