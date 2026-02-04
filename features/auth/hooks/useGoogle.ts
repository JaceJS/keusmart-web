"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authService } from "../services/auth.service";
import { planConfigUtils } from "../utils/planConfig.utils";
import {
  GetOnboardingDataResponse,
  GoogleRegisterRequest,
  GoogleRegisterResponse,
  GetMeResponse,
} from "../types/auth.types";

interface UseGoogleResult {
  getOnboardingData: (token: string) => Promise<GetOnboardingDataResponse>;
  register: (data: GoogleRegisterRequest) => Promise<GoogleRegisterResponse>;
  getMe: () => Promise<GetMeResponse>;
  isLoading: boolean;
  error: string | null;
}

export function useGoogle(): UseGoogleResult {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOnboardingData = useCallback(async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.getGoogleOnboarding(token);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengambil data onboarding";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: GoogleRegisterRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.googleRegister(data);

        if (response.tokens?.accessToken) {
          Cookies.set("accessToken", response.tokens.accessToken, {
            expires: 1,
          });

          if (response.tenant?.id) {
            Cookies.set("tenantId", response.tenant.id, { expires: 7 });
          }

          if (response.tenant?.planConfig) {
            planConfigUtils.save(response.tenant.planConfig);
          }

          sessionStorage.removeItem("onboarding_user");

          router.replace("/dashboard");
        }
        return response;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Gagal menyimpan data";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const getMe = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.getMe();

      if (data.tenant?.planConfig) {
        planConfigUtils.save(data.tenant.planConfig);
      }

      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengambil data session";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getOnboardingData, register, getMe, isLoading, error };
}
