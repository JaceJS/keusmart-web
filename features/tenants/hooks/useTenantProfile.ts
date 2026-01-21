"use client";

import { useState, useEffect, useCallback } from "react";
import { TenantProfile, UpdateTenantRequest } from "../types/tenant.types";
import { tenantService } from "../services/tenant.service";

interface UseTenantProfileReturn {
  profile: TenantProfile | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  updateProfile: (data: UpdateTenantRequest) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export const useTenantProfile = (): UseTenantProfileReturn => {
  const [profile, setProfile] = useState<TenantProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await tenantService.getCurrentTenant();
      setProfile(data);
    } catch (err) {
      console.error("Failed to fetch tenant profile:", err);
      setError("Gagal memuat profil bisnis");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: UpdateTenantRequest): Promise<boolean> => {
    setIsUpdating(true);
    setError(null);
    try {
      const updated = await tenantService.updateTenant(data);
      setProfile(updated);
      return true;
    } catch (err) {
      console.error("Failed to update tenant profile:", err);
      setError("Gagal menyimpan perubahan");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    profile,
    isLoading,
    isUpdating,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
};
