"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { tenantService } from "../services/tenant.service";
import { config } from "@/core/config";

export const useSwitchTenant = () => {
  const [isLoading, setIsLoading] = useState(false);

  const switchTenant = async (tenantId: string) => {
    setIsLoading(true);
    try {
      const response = await tenantService.switchTenant(tenantId);

      // Update cookies with new tokens
      if (response.accessToken) {
        Cookies.set(config.auth.tokenKey, response.accessToken, { expires: 1 });
      }

      // Update tenant ID
      Cookies.set(config.auth.tenantIdKey, response.tenant.id, { expires: 3 });

      // Force reload to refresh all application state with new tenant context
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Failed to switch tenant", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { switchTenant, isLoading };
};
