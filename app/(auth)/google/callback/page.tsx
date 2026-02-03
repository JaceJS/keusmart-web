"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { planConfigUtils } from "@/features/auth/utils/planConfig.utils";
import { authService } from "@/features/auth/services/auth.service";
import { Button } from "@/app/components/ui/Button";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Proses autentikasi...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      const authStatus = searchParams.get("status");

      try {
        if (authStatus === "active") {
          const accessToken = searchParams.get("accessToken");
          const tenantId = searchParams.get("tenantId");

          if (!accessToken) {
            throw new Error("Terjadi kesalahan. Silakan login ulang.");
          }

          Cookies.set("accessToken", accessToken, { expires: 1 });

          if (tenantId) {
            Cookies.set("tenantId", tenantId, { expires: 7 });
          } else {
            planConfigUtils.save(planConfigUtils.getDefault());
          }

          setStatus("Login berhasil! Mengalihkan...");
          router.replace("/dashboard");
        } else if (authStatus === "incomplete") {
          const token = searchParams.get("token");

          if (!token) {
            throw new Error("Terjadi kesalahan. Silakan login ulang.");
          }

          setStatus("Mengambil data user...");
          const userData = await authService.getGoogleOnboarding(token);

          setStatus("Mengalihkan ke halaman onboarding...");
          const params = new URLSearchParams();
          if (userData.email) params.append("email", userData.email);
          if (userData.name) params.append("name", userData.name);
          params.append("token", token);

          router.replace(`/onboarding?${params.toString()}`);
        } else {
          const msg =
            searchParams.get("error") || "Status login tidak dikenali.";
          throw new Error(msg);
        }
      } catch (err) {
        setStatus("Terjadi kesalahan.");
        setError(
          err instanceof Error
            ? err.message
            : "Gagal memproses data login. Sesi mungkin kadaluarsa.",
        );
      }
    };

    processCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-red-500 text-xl font-bold">
            Autentikasi Gagal
          </div>
          <p className="text-text-secondary">{error}</p>
          <Button onClick={() => router.replace("/login")}>
            Kembali ke Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-text-secondary animate-pulse">{status}</p>
      </div>
    </div>
  );
}
