"use client";

import { useState, useRef, useEffect } from "react";
import { Store, ChevronDown, Check, Plus, Settings } from "lucide-react";
import { useAuthData } from "@/features/auth";
import { useTenants } from "../hooks/useTenants";
import { useSwitchTenant } from "../hooks/useSwitchTenant";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSwitching}
        className="flex items-center gap-3 w-full hover:bg-secondary p-2 -ml-2 rounded-lg transition-colors group"
      >
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-md transition-all">
          <Store className="w-5 h-5" />
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-sm font-semibold text-foreground leading-none">
            {currentTenant?.name || "KeuSmart"}
          </h2>
          <span className="text-xs text-text-secondary mt-0.5 block capitalize">
            {user?.role || "Admin"}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-text-tertiary group-hover:text-text-secondary transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 border-b border-border">
            <p className="text-xs font-semibold text-text-tertiary px-2 py-1">
              Pilih Bisnis
            </p>
          </div>

          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
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
                    "flex items-center gap-3 w-full p-2 rounded-md text-sm transition-colors",
                    currentTenant?.id === tenant.id
                      ? "bg-primary text-primary-light"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-text-secondary">
                    <Store className="w-3.5 h-3.5" />
                  </div>
                  <span className="flex-1 text-left truncate font-medium">
                    {tenant.name}
                  </span>
                  {currentTenant?.id === tenant.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))
            )}
          </div>

          <div className="p-1.5 border-t border-border bg-gray-50/50">
            <Link
              href="/dashboard/my-businesses"
              className="flex items-center gap-2 w-full p-2 rounded-md text-xs font-medium text-text-secondary hover:text-foreground hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-3.5 h-3.5" />
              Kelola Semua Bisnis
            </Link>
            <button
              // TODO: Add create business link/modal
              className="flex items-center gap-2 w-full p-2 rounded-md text-xs font-medium text-text-secondary hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Buat Bisnis Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
