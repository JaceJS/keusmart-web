"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { useGoogle } from "@/features/auth/hooks/useGoogle";

interface OnboardingFormProps {
  email: string;
  initialName?: string;
  token?: string; // Onboarding token
}

export function OnboardingForm({
  email,
  initialName = "",
  token,
}: OnboardingFormProps) {
  const router = useRouter();
  const { register, isLoading, error: hookError } = useGoogle();

  const [validationError, setValidationError] = useState<string | null>(null);
  const displayError = validationError || hookError;

  const [formData, setFormData] = useState({
    name: initialName,
    businessName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!token) {
      setValidationError("Token sesi tidak ditemukan. Silakan login ulang.");
      return;
    }

    if (!formData.businessName) {
      setValidationError("Nama bisnis wajib diisi");
      return;
    }

    try {
      await register({
        token,
        businessName: formData.businessName,
      });
    } catch (err: any) {
      const msg = err?.message || "";
      if (
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("token")
      ) {
        router.replace("/login");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-foreground">
          Satu Langkah Lagi
        </h2>
        <p className="text-text-secondary mt-2">
          Lengkapi data bisnis Anda untuk mulai menggunakan KeuSmart.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
          <p className="text-sm text-text-secondary">
            Mendaftar sebagai{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <Input
          label="Nama Lengkap"
          value={formData.name}
          readOnly={true}
          className="bg-primary/5 text-text-secondary cursor-not-allowed"
          onChange={() => {}}
        />

        <Input
          label="Nama Bisnis"
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          required
          placeholder="Toko Maju Jaya"
        />

        {displayError && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {displayError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Memproses..." : "Selesaikan Pendaftaran"}
        </Button>
      </form>
    </div>
  );
}
