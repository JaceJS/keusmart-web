"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { tenantService } from "../services/tenant.service";
import { config } from "@/core/config";
import { planConfigUtils } from "@/features/auth/utils/planConfig.utils";
import { useRouter } from "next/navigation";

export const useSwitchTenant = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const switchTenant = async (tenantId: string) => {
    setIsLoading(true);
    try {
      const response = await tenantService.switchTenant(tenantId);

      if (response.accessToken) {
        Cookies.set(config.auth.tokenKey, response.accessToken, { expires: 1 });
      }

      Cookies.set(config.auth.tenantIdKey, response.tenant.id, { expires: 3 });

      if (response.tenant.planConfig) {
        planConfigUtils.save(response.tenant.planConfig);
      }

      router.replace("/dashboard");
    } catch (error) {
      console.error("Failed to switch tenant", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { switchTenant, isLoading };
};
