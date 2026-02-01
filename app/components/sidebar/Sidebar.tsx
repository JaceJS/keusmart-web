"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/features/auth";
import { authService } from "@/features/auth/services/auth.service";
import { planConfigUtils } from "@/features/auth/utils/planConfig.utils";
import { TenantSwitcher } from "@/features/tenants";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { NavMenuItem } from "./NavMenuItem";
import { UserProfile } from "./UserProfile";
import { menuItems } from "./MenuConfig";
import { cn } from "@/app/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children && pathname?.startsWith(item.href)) {
        setExpandedMenus((prev) =>
          prev.includes(item.href) ? prev : [...prev, item.href],
        );
      }
    });
  }, [pathname]);

  const toggleMenu = (href: string) => {
    setExpandedMenus((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href],
    );
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("tenantId");
      planConfigUtils.remove();
      setShowLogoutDialog(false);
      router.push("/");
    }
  };

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  const visibleMenuItems = menuItems.filter(
    (item) => user?.role && item.roles.includes(user.role),
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border flex flex-col transition-transform duration-300 ease-in-out shadow-sm h-screen",

          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header / Tenant Switcher */}
        <div className="h-16 flex items-center pl-6 border-b border-border">
          <div className="w-full">
            <TenantSwitcher />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {visibleMenuItems.map((item) => (
            <NavMenuItem
              key={item.href}
              item={item}
              userRole={user!.role}
              isExpanded={expandedMenus.includes(item.href)}
              onToggle={() => toggleMenu(item.href)}
            />
          ))}
        </nav>

        {/* Footer / User Profile */}
        <UserProfile
          name={user?.name}
          email={user?.email}
          onLogout={() => setShowLogoutDialog(true)}
        />
      </aside>

      <ConfirmationModal
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari aplikasi?"
        confirmText="Keluar"
        variant="danger"
      />
    </>
  );
}
