"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { LoginRequest, LoginResponse } from "../types/auth.types";
import { authService } from "../services/auth.service";
import { planConfigUtils } from "../utils/planConfig.utils";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response: LoginResponse = await authService.login(data);

      Cookies.set("accessToken", response.tokens.accessToken, { expires: 1 }); // 1 day

      if (response.tenant?.id) {
        Cookies.set("tenantId", response.tenant.id, { expires: 7 });
      }

      if (response.tenant?.planConfig) {
        planConfigUtils.save(response.tenant.planConfig);
      } else {
        planConfigUtils.save(planConfigUtils.getDefault());
      }

      const from = searchParams.get("from") || "/dashboard";
      router.push(from);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, isLoading: loading, error };
};
