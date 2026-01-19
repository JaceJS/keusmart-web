"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";
import type { MenuItem } from "./menu-config";
import type { UserRole } from "@/features/auth/types/auth.types";

interface NavMenuItemProps {
  item: MenuItem;
  userRole: UserRole;
  isExpanded: boolean;
  onToggle: () => void;
}

const menuItemStyles = {
  base: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
  active: "text-foreground bg-primary-light/50",
  inactive: "text-text-secondary hover:text-foreground hover:bg-secondary",
};

const iconStyles = {
  base: "w-5 h-5 transition-colors",
  active: "text-foreground",
  inactive: "text-text-tertiary group-hover:text-text-secondary",
};

export function NavMenuItem({
  item,
  userRole,
  isExpanded,
  onToggle,
}: NavMenuItemProps) {
  const pathname = usePathname();

  const visibleChildren = item.children?.filter((child) =>
    child.roles.includes(userRole),
  );
  const hasVisibleChildren = visibleChildren && visibleChildren.length > 0;
  const isActive = hasVisibleChildren
    ? pathname?.startsWith(item.href)
    : pathname === item.href;

  return (
    <div>
      {/* Parent Menu Item */}
      {hasVisibleChildren ? (
        <button
          onClick={onToggle}
          className={cn(
            menuItemStyles.base,
            "w-full justify-between",
            isActive ? menuItemStyles.active : menuItemStyles.inactive,
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon
              className={cn(
                iconStyles.base,
                isActive ? iconStyles.active : iconStyles.inactive,
              )}
            />
            {item.title}
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isExpanded && "-rotate-180",
            )}
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className={cn(
            menuItemStyles.base,
            isActive ? menuItemStyles.active : menuItemStyles.inactive,
          )}
        >
          <item.icon
            className={cn(
              iconStyles.base,
              isActive ? iconStyles.active : iconStyles.inactive,
            )}
          />
          {item.title}
          {isActive && <ActiveIndicator />}
        </Link>
      )}

      {/* Children Menu Items */}
      {hasVisibleChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-200",
            isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="ml-4 pl-4 border-l border-border mt-1 space-y-1">
            {visibleChildren.map((child) => {
              const childIsActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                    childIsActive
                      ? "text-foreground bg-primary-light/30"
                      : "text-text-secondary hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {child.title}
                  {childIsActive && <ActiveIndicator size="sm" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveIndicator({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <div
      className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-full",
        size === "sm" ? "h-6" : "h-8",
      )}
    />
  );
}
