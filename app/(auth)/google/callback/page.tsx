"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { planConfigUtils } from "@/features/auth/utils/planConfig.utils";
import { useGoogle } from "@/features/auth/hooks/useGoogle";
import { Button } from "@/app/components/ui/Button";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getOnboardingData } = useGoogle();
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
            throw new Error("Access token missing for active user");
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
            throw new Error("Onboarding token missing");
          }

          setStatus("Mengambil data user...");
          const userData = await getOnboardingData(token);

          setStatus("Mengalihkan ke halaman onboarding...");
          sessionStorage.setItem("onboarding_user", JSON.stringify(userData));

          router.replace(`/onboarding?token=${token}`);
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
  }, [searchParams, router, getOnboardingData]);

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
