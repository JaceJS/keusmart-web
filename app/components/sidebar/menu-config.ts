import {
  LayoutDashboard,
  FileBarChart,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/features/auth/types/auth.types";

export interface SubMenuItem {
  title: string;
  href: string;
  roles: UserRole[];
}

export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
  children?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Dasbor",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["owner", "admin"],
  },
  {
    title: "Laporan",
    href: "/reports",
    icon: FileBarChart,
    roles: ["owner", "admin"],
  },
  {
    title: "Manajemen Tim",
    href: "/team",
    icon: Users,
    roles: ["owner"],
  },
  {
    title: "Pengaturan",
    href: "/settings",
    icon: Settings,
    roles: ["owner", "admin"],
    children: [
      {
        title: "Langganan",
        href: "/settings/billing",
        roles: ["owner"],
      },
    ],
  },
];
