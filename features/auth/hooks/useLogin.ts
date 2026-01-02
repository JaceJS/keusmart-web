"use client";

import { useState } from "react";
import { authService } from "../services/auth.service";
import type { LoginRequest, LoginResponse } from "../types/auth.types";
import { config } from "@/core/config";

interface UseLoginResult {
  login: (data: LoginRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useLogin(): UseLoginResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await authService.login(data);

      // Store tokens
      localStorage.setItem(config.auth.tokenKey, response.tokens.accessToken);
      localStorage.setItem(
        config.auth.refreshTokenKey,
        response.tokens.refreshToken
      );

      // Store tenantId
      if (response.tenant?.id) {
        localStorage.setItem(config.auth.tenantIdKey, response.tenant.id);
      }

      // Redirect or update state as needed
      window.location.href = "/dashboard";
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
