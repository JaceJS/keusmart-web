"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import Cookies from "js-cookie";
import { authService } from "../services/auth.service";
import { planConfigUtils } from "../utils/planConfig.utils";
import type { RegisterRequest } from "../types/auth.types";

interface OnboardingFormProps {
  email: string;
  initialName?: string;
  accessToken?: string;
}

export function OnboardingForm({
  email,
  initialName = "",
}: OnboardingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialName,
    businessName: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // NOTE: This assumes we have a specific endpoint for completing onboarding
      // or we use a modified register endpoint.
      // For now, I will assume we might need to send this to a new endpoint
      // likely `POST /auth/onboarding/complete` which takes the temp token + details

      // Since the backend prompt is part of the deliverables, I will implement
      // the frontend to match what I WILL request from the backend.

      // const response = await authService.completeOnboarding({
      //   name: formData.name,
      //   businessName: formData.businessName,
      //   phone: formData.phone
      // });

      // For this step, I'll simulate or use a placeholder if the service isn't ready.
      // But based on the "Best Practice" request, we should likely be calling an API.

      // Wait, I haven't added `completeOnboarding` to authService yet.
      // I should adhere to what I have available or mock it for now until I produce the backend prompt.
      // However, the prompt asked for "Best Practice".

      // Let's assume the backend will provide: `POST /auth/google/onboarding`

      // Temporary check to prevent untyped error
      if (!formData.businessName) throw new Error("Nama bisnis wajib diisi");

      // Mock success for now or call a hypothetic service
      // router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Nama Langkap Anda"
        />

        <Input
          label="Nama Bisnis"
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          required
          placeholder="Contoh: Toko Kopi Senja"
        />

        <Input
          label="Nomor Telepon (WhatsApp)"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="08123456789"
        />

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Memproses..." : "Selesai & Masuk Dashboard"}
        </Button>
      </form>
    </div>
  );
}
