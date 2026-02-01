"use client";

import { Input } from "@/app/components/ui/Input";
import { PasswordInput } from "@/app/components/ui/PasswordInput";
import { Button } from "@/app/components/ui/Button";
import type { RegisterStep } from "@/features/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCountdown } from "@/utils/date";

interface RegisterFormProps {
  step: RegisterStep;
  email: string;
  name: string;
  businessName: string;
  otp: string;
  otpExpiry: number | null;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  onEmailChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onBusinessNameChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAgreeTermsChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResendOtp?: () => void;
  isLoading?: boolean;
}

export function RegisterForm({
  step,
  email,
  name,
  businessName,
  otp,
  otpExpiry,
  password,
  confirmPassword,
  agreeTerms,
  onEmailChange,
  onNameChange,
  onBusinessNameChange,
  onOtpChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAgreeTermsChange,
  onSubmit,
  onResendOtp,
  isLoading = false,
}: RegisterFormProps) {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  // Calculate initial remaining seconds based on expiry timestamp
  useEffect(() => {
    if (step === 2 && otpExpiry) {
      const secondsLeft = Math.max(
        0,
        Math.ceil((otpExpiry - Date.now()) / 1000),
      );
      setRemainingSeconds(secondsLeft);
    }
  }, [step, otpExpiry]);

  useEffect(() => {
    if (step !== 2 || !otpExpiry) return;

    const interval = setInterval(() => {
      setRemainingSeconds(() => {
        const secondsLeft = Math.max(
          0,
          Math.ceil((otpExpiry - Date.now()) / 1000),
        );
        return secondsLeft;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, otpExpiry]);

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* STEP 1: Email */}
        {step === 1 && (
          <>
            <div className="mb-6 rounded-lg bg-primary/5 border border-primary/20 p-4">
              <p className="text-lg text-center">
                Mulai uji coba gratis 14 hari paket{" "}
                <span className="font-bold">Growth</span>
              </p>
            </div>

            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              required
            />

            <Input
              label="Nama Bisnis"
              type="text"
              placeholder="Toko Maju Jaya"
              value={businessName}
              onChange={(e) => onBusinessNameChange(e.target.value)}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Kirim Kode OTP"}
            </Button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <Input
              label="Kode OTP"
              type="text"
              placeholder="Masukkan 6 digit kode"
              value={otp}
              onChange={(e) => onOtpChange(e.target.value)}
              maxLength={6}
              required
            />

            {remainingSeconds === 0 && (
              <p className="text-sm text-red-500">
                Kode OTP telah kedaluwarsa.
              </p>
            )}

            <p className="text-sm text-text-secondary">
              {remainingSeconds !== null && remainingSeconds > 0 ? (
                <span>
                  Kirim ulang dalam{" "}
                  <span className="font-medium text-primary">
                    {formatCountdown(remainingSeconds)}
                  </span>
                </span>
              ) : (
                <>
                  Tidak menerima kode?{" "}
                  <button
                    type="button"
                    onClick={onResendOtp}
                    disabled={isLoading || !onResendOtp}
                    className="text-primary hover:underline"
                  >
                    Kirim ulang
                  </button>
                </>
              )}
            </p>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Memverifikasi..." : "Verifikasi"}
            </Button>
          </>
        )}

        {/* STEP 3: Create Password */}
        {step === 3 && (
          <>
            <PasswordInput
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
            />

            <PasswordInput
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              required
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => onAgreeTermsChange(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                required
              />
              <span className="text-sm text-text-secondary">
                Saya setuju dengan{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Syarat & Ketentuan
                </Link>{" "}
                dan{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Kebijakan Privasi
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Buat Akun"}
            </Button>
          </>
        )}
      </form>
    </>
  );
}
