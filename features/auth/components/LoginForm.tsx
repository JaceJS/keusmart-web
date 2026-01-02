"use client";

import Link from "next/link";
import { Input } from "@/app/components/ui/Input";
import { PasswordInput } from "@/app/components/ui/PasswordInput";
import { Button } from "@/app/components/ui/Button";

interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberMeChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export function LoginForm({
  email,
  password,
  rememberMe,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="nama@email.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
      />

      <PasswordInput
        placeholder="Masukkan password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => onRememberMeChange(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
          />
          <span className="text-sm text-text-secondary">Ingat saya</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          Lupa password?
        </Link>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Masuk..." : "Masuk"}
      </Button>
    </form>
  );
}
