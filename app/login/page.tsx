"use client";

import { useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/app/components/ui/Input";
import { PasswordInput } from "@/app/components/ui/PasswordInput";
import { Button } from "@/app/components/ui/Button";
import { APP_NAME } from "@/app/lib/constants";
import financeAnimation from "./finance-animation.json";

type AuthMode = "login" | "register";
type RegisterStep = 1 | 2 | 3;

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [registerStep, setRegisterStep] = useState<RegisterStep>(1);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form data
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setRegisterStep(1);
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      // TODO: Implement login logic
      console.log("Login:", { email, password });
    } else {
      // Handle register steps
      if (registerStep === 1) {
        // TODO: Send OTP to email
        console.log("Sending OTP to:", email);
        setRegisterStep(2);
      } else if (registerStep === 2) {
        // TODO: Verify OTP
        console.log("Verifying OTP:", otp);
        setRegisterStep(3);
      } else {
        // TODO: Create account
        console.log("Creating account:", { email, password });
      }
    }
  };

  const getRegisterStepTitle = () => {
    switch (registerStep) {
      case 1:
        return "Masukkan Email";
      case 2:
        return "Verifikasi Email";
      case 3:
        return "Buat Password";
    }
  };

  const getRegisterStepDescription = () => {
    switch (registerStep) {
      case 1:
        return "Masukkan email untuk memulai pendaftaran";
      case 2:
        return `Kode OTP telah dikirim ke ${email}`;
      case 3:
        return "Buat password yang kuat untuk akunmu";
    }
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
          {/* Fixed: Logo + Tabs */}
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold text-primary">
              {APP_NAME}
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex rounded-lg bg-secondary p-1">
            <button
              type="button"
              onClick={() => handleModeChange("login")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("register")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Buat Akun
            </button>
          </div>

          <div className="h-[400px] space-y-4">
            {/* Register Step Indicator */}
            {mode === "register" && (
              <div className="space-y-4">
                {registerStep > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setRegisterStep((prev) => (prev - 1) as RegisterStep)
                    }
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali
                  </button>
                )}

                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        step <= registerStep ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {getRegisterStepTitle()}
                  </h2>
                  <p className="text-sm text-text-secondary mt-1">
                    {getRegisterStepDescription()}
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* LOGIN FORM */}
              {mode === "login" && (
                <>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <PasswordInput
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                      />
                      <span className="text-sm text-text-secondary">
                        Ingat saya
                      </span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      Lupa password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Masuk
                  </Button>
                </>
              )}

              {/* REGISTER STEP 1: Email */}
              {mode === "register" && registerStep === 1 && (
                <>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <Button type="submit" className="w-full" size="lg">
                    Kirim Kode OTP
                  </Button>
                </>
              )}

              {/* REGISTER STEP 2: OTP */}
              {mode === "register" && registerStep === 2 && (
                <>
                  <Input
                    label="Kode OTP"
                    type="text"
                    placeholder="Masukkan 6 digit kode"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />

                  <p className="text-sm text-text-secondary">
                    Tidak menerima kode?{" "}
                    <button
                      type="button"
                      className="text-primary hover:text-primary-dark font-medium cursor-pointer"
                    >
                      Kirim ulang
                    </button>
                  </p>

                  <Button type="submit" className="w-full" size="lg">
                    Verifikasi
                  </Button>
                </>
              )}

              {/* REGISTER STEP 3: Create Password */}
              {mode === "register" && registerStep === 3 && (
                <>
                  <PasswordInput
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <PasswordInput
                    label="Konfirmasi Password"
                    placeholder="Ulangi password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                      required
                    />
                    <span className="text-sm text-text-secondary">
                      Saya setuju dengan{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:text-primary-dark"
                      >
                        Syarat & Ketentuan
                      </Link>{" "}
                      dan{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:text-primary-dark"
                      >
                        Kebijakan Privasi
                      </Link>
                    </span>
                  </label>

                  <Button type="submit" className="w-full" size="lg">
                    Buat Akun
                  </Button>
                </>
              )}
            </form>

            {/* Divider & Google Auth - only for login and register step 1 */}
            {(mode === "login" ||
              (mode === "register" && registerStep === 1)) && (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-4 text-text-tertiary">
                      atau
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  size="lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {mode === "login"
                    ? "Masuk dengan Google"
                    : "Daftar dengan Google"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
