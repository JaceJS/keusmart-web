"use client";

import { useState, useEffect } from "react";
import { Tenant } from "../types/tenant.types";
import { tenantService } from "../services/tenant.service";

export const useTenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTenants = async () => {
    setIsLoading(true);
    try {
      const data = await tenantService.getMyTenants();
      setTenants(data);
    } catch (error) {
      console.error("Failed to fetch tenants", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return { tenants, isLoading, refresh: fetchTenants };
};
