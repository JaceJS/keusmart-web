"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tenantService } from "../services/tenant.service";
import {
  CreateTenantRequest,
  CreateTenantResponse,
} from "../types/tenant.types";

interface UseCreateTenantResult {
  createTenant: (data: CreateTenantRequest) => Promise<CreateTenantResponse>;
  isLoading: boolean;
  error: string | null;
}

export function useCreateTenant(): UseCreateTenantResult {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTenant = async (data: CreateTenantRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await tenantService.createTenant(data);
      router.refresh();
      return result;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Gagal membuat bisnis baru";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTenant, isLoading, error };
}
