"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { planConfigUtils } from "@/features/auth/utils/planConfig.utils";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Proses autentikasi...");

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const tenantId = searchParams.get("tenantId");
    const authStatus = searchParams.get("status"); // 'active' or 'incomplete'
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (accessToken) {
      // Store tokens
      Cookies.set("accessToken", accessToken, { expires: 1 });
      if (refreshToken) {
        // Optionally store refresh token if handled by client
      }

      if (tenantId) {
        Cookies.set("tenantId", tenantId, { expires: 7 });
      } else {
        // If no tenant (new user), use default plan config temporarily
        planConfigUtils.save(planConfigUtils.getDefault());
      }

      // Handle redirect based on status
      if (authStatus === "incomplete") {
        setStatus("Mengalihkan ke halaman onboarding...");
        const params = new URLSearchParams();
        if (email) params.append("email", email);
        if (name) params.append("name", name);
        router.replace(`/onboarding?${params.toString()}`);
      } else {
        setStatus("Login berhasil! Mengalihkan...");
        router.replace("/dashboard");
      }
    } else {
      setStatus("Gagal login. Token tidak ditemukan.");
      // setTimeout(() => router.replace("/login"), 3000);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-text-secondary animate-pulse">{status}</p>
      </div>
    </div>
  );
}
