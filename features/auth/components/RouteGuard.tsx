"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { menuItems } from "@/app/components/sidebar/MenuConfig";
import { Loader2 } from "lucide-react";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      return;
    }

    let matchedItem = null;
    let requiredRoles = null;

    for (const item of menuItems) {
      if (item.href === pathname) {
        matchedItem = item;
        requiredRoles = item.roles;
        break;
      }

      if (pathname?.startsWith(item.href + "/")) {
        matchedItem = item;
        requiredRoles = item.roles;
      }

      if (item.children) {
        for (const child of item.children) {
          if (
            child.href === pathname ||
            pathname?.startsWith(child.href + "/")
          ) {
            matchedItem = child;
            requiredRoles = child.roles;
            break;
          }
        }
      }

      if (matchedItem) break;
    }

    if (!matchedItem) {
      setIsAuthorized(true);
      return;
    }
    if (requiredRoles && !requiredRoles.includes(user.role)) {
      console.warn(
        `[RouteGuard] Access denied to ${pathname} for role ${user.role}`,
      );
      router.push("/dashboard");
      return;
    }

    setIsAuthorized(true);
  }, [pathname, user, isLoading, router]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
