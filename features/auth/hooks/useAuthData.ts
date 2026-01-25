"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthState, JwtPayload, User, Tenant } from "../types/auth.types";

export function useAuthData(): AuthState {
  const [data, setData] = useState<AuthState>({
    user: null,
    tenant: null,
    tenants: [],
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
        return;
      }

      const decoded = jwtDecode<JwtPayload>(accessToken);

      const user: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        phone: null,
        role: decoded.role,
      };

      const tenant: Tenant = {
        id: decoded.tenantId,
        name: decoded.tenantName || "KeuSmart Business",
        plan: decoded.tenantPlan || "free",
        logoUrl: decoded.tenantLogoUrl || "",
      };

      setData({
        user,
        tenant,
        tenants: [],
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
      setData((prev) => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
      }));
    }
  }, []);

  return data;
}
