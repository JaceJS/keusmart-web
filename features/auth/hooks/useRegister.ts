"use client";

import { useState } from "react";
import { authService } from "../services/auth.service";
import type { RegisterRequest } from "../types/auth.types";

interface UseRegisterResult {
  register: (data: RegisterRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useRegister(): UseRegisterResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.register(data);
      // Registration successful, usually followed by OTP step or auto-login
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
