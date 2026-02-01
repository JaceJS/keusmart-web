"use client";

import { useState } from "react";
import { authService } from "../services/auth.service";
import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types/auth.types";

interface UseOtpResult {
  sendOtp: (data: SendOtpRequest) => Promise<SendOtpResponse>;
  verifyOtp: (data: VerifyOtpRequest) => Promise<VerifyOtpResponse>;
  isLoading: boolean;
  error: string | null;
}

export function useOtp(): UseOtpResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = async (data: SendOtpRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.sendOtp(data);

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send OTP";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (
    data: VerifyOtpRequest,
  ): Promise<VerifyOtpResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.verifyOtp(data);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid OTP";
      setError(message);
      throw err; // Re-throw to let component handle it (e.g. stay on same step)
    } finally {
      setIsLoading(false);
    }
  };

  return { sendOtp, verifyOtp, isLoading, error };
}
