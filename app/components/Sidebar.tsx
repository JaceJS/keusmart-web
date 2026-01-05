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
    Cookies.remove("refreshToken");
    Cookies.remove("tenantId");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col h-screen animate-pulse">
        <div className="h-16 border-b border-gray-50 flex items-center px-6">
          <div className="w-8 h-8 bg-gray-200 rounded-lg" />
          <div className="ml-3 flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-24" />
            <div className="h-2 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out shadow-sm h-screen">
        {/* Header / Tenant Switcher */}
        <div className="h-16 flex items-center px-6 border-b border-gray-50">
          <button className="flex items-center gap-3 w-full hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-blue-200 shadow-md group-hover:shadow-blue-300 transition-all">
              <Store className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-sm font-semibold text-gray-900 leading-none">
                {tenant?.name || "KeuSmart"}
              </h2>
              <span className="text-xs text-gray-500 mt-0.5 block">
                {user?.role === "owner" ? "Owner" : "Admin"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
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
                    ? "text-blue-600 bg-blue-50/80"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {item.title}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-gray-100">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 flex items-center justify-center text-blue-700 font-semibold text-sm border border-white shadow-sm uppercase">
              {user?.name?.substring(0, 2) || "JD"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
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
