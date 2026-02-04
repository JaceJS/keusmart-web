"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { authService } from "../services/auth.service";
import type { RegisterRequest, RegisterResponse } from "../types/auth.types";
import { planConfigUtils } from "../utils/planConfig.utils";

interface UseRegisterResult {
  register: (data: RegisterRequest) => Promise<RegisterResponse | undefined>;
  isLoading: boolean;
  error: string | null;
}

export function useRegister(): UseRegisterResult {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);

      Cookies.set("accessToken", response.tokens.accessToken, { expires: 1 });

      if (response.tenant?.id) {
        Cookies.set("tenantId", response.tenant.id, { expires: 7 });
      }

      if (response.tenant?.planConfig) {
        planConfigUtils.save(response.tenant.planConfig);
      }

      const from = searchParams.get("from") || "/dashboard";
      router.push(from);

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registrasi gagal";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
