"use client";

import { useState, useRef, useEffect } from "react";
import { Store, ChevronDown, Check, Settings, Building2 } from "lucide-react";
import { useAuthData } from "@/features/auth";
import { useTenants } from "../hooks/useTenants";
import { useSwitchTenant } from "../hooks/useSwitchTenant";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Helper to determine badge color based on plan
const getPlanBadgeColor = (plan: string) => {
  switch (plan?.toLowerCase()) {
    case "pro":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "smart":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "starter":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export function TenantSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { tenant: currentTenant, user } = useAuthData();
  const { tenants, isLoading: isLoadingTenants } = useTenants();
  const { switchTenant, isLoading: isSwitching } = useSwitchTenant();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitch = async (tenantId: string) => {
    if (tenantId === currentTenant?.id) {
      setIsOpen(false);
      return;
    }
    await switchTenant(tenantId);
    setIsOpen(false);
  };

  const activeTenantLogo = currentTenant?.logoUrl;
  const activePlanColor = getPlanBadgeColor(currentTenant?.plan || "free");

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSwitching}
        className="flex items-center gap-3 w-full hover:bg-secondary p-2 -ml-2 rounded-xl transition-all duration-200 group border border-transparent hover:border-border/50"
      >
        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center shrink-0 border border-primary/10 shadow-sm group-hover:shadow transition-all">
          {activeTenantLogo ? (
            <Image
              src={activeTenantLogo}
              alt={currentTenant?.name || "Logo"}
              fill
              className="object-cover"
            />
          ) : (
            <Building2 className="w-5 h-5 text-primary" />
          )}
        </div>

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-foreground truncate max-w-[120px]">
              {currentTenant?.name || "KeuSmart"}
            </h2>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded border capitalize font-medium hidden sm:inline-block",
                activePlanColor,
              )}
            >
              {currentTenant?.plan || "Free"}
            </span>
          </div>
          <span className="text-xs text-text-secondary truncate block capitalize">
            {user?.role || "Admin"}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-text-tertiary group-hover:text-text-secondary transition-transform duration-200 shrink-0",
            isOpen && "-rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[260px] z-50 bg-white border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left">
          <div className="p-3 bg-gray-50/50 border-b border-border">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Bisnis Anda
            </p>
          </div>

          <div className="max-h-[280px] overflow-y-auto p-1.5 space-y-0.5">
            {isLoadingTenants ? (
              <div className="px-2 py-4 text-xs text-center text-text-tertiary">
                Memuat data...
              </div>
            ) : tenants.length === 0 ? (
              <div className="px-2 py-4 text-xs text-center text-text-tertiary">
                Tidak ada bisnis lain
              </div>
            ) : (
              tenants.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => handleSwitch(tenant.id)}
                  disabled={isSwitching}
                  className={cn(
                    "flex items-center gap-3 w-full p-2 rounded-lg text-sm transition-all group",
                    currentTenant?.id === tenant.id
                      ? "bg-primary/5 text-primary"
                      : "text-foreground hover:bg-secondary",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center shrink-0 overflow-hidden relative",
                      currentTenant?.id === tenant.id
                        ? "bg-primary/10"
                        : "bg-gray-100 group-hover:bg-white border border-transparent group-hover:border-border",
                    )}
                  >
                    {tenant.logoUrl ? (
                      <Image
                        src={tenant.logoUrl}
                        alt={tenant.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Store
                        className={cn(
                          "w-4 h-4",
                          currentTenant?.id === tenant.id
                            ? "text-primary"
                            : "text-text-secondary",
                        )}
                      />
                    )}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium truncate">{tenant.name}</p>
                    <p className="text-[10px] text-text-tertiary capitalize">
                      {tenant.plan || "Free"}
                    </p>
                  </div>

                  {currentTenant?.id === tenant.id && (
                    <Check className="w-4 h-4 text-primary shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>

          <div className="p-2 border-t border-border bg-gray-50">
            <Link
              href="/businesses"
              className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg text-xs font-medium text-text-secondary hover:text-foreground hover:bg-white hover:shadow-sm border border-transparent hover:border-border transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-3.5 h-3.5" />
              Kelola Bisnis
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
