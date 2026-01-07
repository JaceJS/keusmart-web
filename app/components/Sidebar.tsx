"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Database,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  Store,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useAuthData } from "@/features/auth/hooks/useAuthData";
import Cookies from "js-cookie";
import { useState } from "react";
import { ConfirmationModal } from "./ui/ConfirmationModal";

const menuItems = [
  {
    title: "Dasbor",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manajemen Bisnis",
    href: "/dashboard/business",
    icon: Building2,
  },
  {
    title: "Manajemen Pengguna",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Master Data",
    href: "/dashboard/master-data",
    icon: Database,
  },
  {
    title: "Langganan",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Pengaturan",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, tenant, isLoading } = useAuthData();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const confirmLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("tenantId");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border flex flex-col h-screen animate-pulse">
        <div className="h-16 border-b border-border flex items-center px-6">
          <div className="w-8 h-8 bg-primary-light rounded-lg" />
          <div className="ml-3 flex-1 space-y-2">
            <div className="h-3 bg-primary-light rounded w-24" />
            <div className="h-2 bg-primary-light rounded w-16" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border flex flex-col transition-all duration-300 ease-in-out shadow-sm h-screen">
        {/* Header / Tenant Switcher */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <button className="flex items-center gap-3 w-full hover:bg-secondary p-2 -ml-2 rounded-lg transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-md transition-all">
              <Store className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-sm font-semibold text-foreground leading-none">
                {tenant?.name || "KeuSmart"}
              </h2>
              <span className="text-xs text-text-secondary mt-0.5 block">
                {user?.role === "owner" ? "Owner" : "Admin"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "text-foreground bg-primary-light/50"
                    : "text-text-secondary hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-text-tertiary group-hover:text-text-secondary"
                  )}
                />
                {item.title}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-light to-secondary flex items-center justify-center text-primary-text font-semibold text-sm shadow-sm uppercase">
              {user?.name?.substring(0, 2) || "JD"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {user?.email}
              </p>
            </div>
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-text-secondary text-xs font-medium hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </div>
      </aside>

      <ConfirmationModal
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={confirmLogout}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari aplikasi?"
        confirmText="Keluar"
        variant="danger"
      />
    </>
  );
}
