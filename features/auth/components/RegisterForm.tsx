"use client";

import Link from "next/link";
import { Input } from "@/app/components/ui/Input";
import { PasswordInput } from "@/app/components/ui/PasswordInput";
import { Button } from "@/app/components/ui/Button";
import type { RegisterStep } from "@/features/auth";

interface RegisterFormProps {
  step: RegisterStep;
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  onEmailChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAgreeTermsChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResendOtp?: () => void;
}

export function RegisterForm({
  step,
  email,
  otp,
  password,
  confirmPassword,
  agreeTerms,
  onEmailChange,
  onOtpChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAgreeTermsChange,
  onSubmit,
  onResendOtp,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* STEP 1: Email */}
      {step === 1 && (
        <>
          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" size="lg">
            Kirim Kode OTP
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

          <p className="text-sm text-text-secondary">
            Tidak menerima kode?{" "}
            <button
              type="button"
              onClick={onResendOtp}
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
  );
}
