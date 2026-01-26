"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthData } from "@/features/auth/hooks/useAuthData";
import { useTenants } from "@/features/tenants/hooks/useTenants";
import { useSwitchTenant } from "@/features/tenants/hooks/useSwitchTenant";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { Card } from "@/app/components/ui/Card";
import { CreateTenantModal } from "@/features/tenants/components/CreateTenantModal";
import {
  Plus,
  Loader2,
  CheckCircle2,
  Store,
  Calendar,
  Settings,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

// Helper for plan badge color
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

export default function BusinessesPage() {
  const router = useRouter();
  const { tenant: currentTenant, user } = useAuthData();
  const { tenants, isLoading, refresh } = useTenants();
  const { switchTenant, isLoading: isSwitching } = useSwitchTenant();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSwitch = async (tenantId: string) => {
    if (tenantId === currentTenant?.id) {
      router.push("/dashboard");
      return;
    }
    await switchTenant(tenantId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Bisnis Saya
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pantau dan kelola seluruh bisnis Anda dalam satu tempat.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant) => {
          const isActive = currentTenant?.id === tenant.id;
          const planColor = getPlanBadgeColor(tenant.plan);

          return (
            <Card
              key={tenant.id}
              className={cn(
                "group relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col",
                isActive ? "border-primary/50 shadow-sm" : "border-border",
              )}
            >
              {isActive && (
                <div className="absolute top-0 right-0 p-2">
                  <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Sedang Aktif
                  </span>
                </div>
              )}

              <div className="p-6 flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {tenant.logoUrl ? (
                      <Image
                        src={tenant.logoUrl}
                        alt={tenant.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Store className="w-7 h-7 text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 truncate text-lg">
                      {tenant.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-md border capitalize font-medium",
                          planColor,
                        )}
                      >
                        {tenant.plan || "Free"}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 capitalize">
                        {user?.role || "Admin"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Trial berakhir dalam 14 hari</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center gap-3">
                {isActive ? (
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => router.push("/dashboard")}
                  >
                    Masuk Dashboard
                  </Button>
                ) : (
                  <Button
                    className="flex-1 group/button"
                    onClick={() => handleSwitch(tenant.id)}
                    disabled={isSwitching}
                  >
                    {isSwitching ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Buka Dashboard
                        <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover/button:translate-x-2 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}

        {/* Add Tenant Card (Dashed) */}
        <div
          onClick={() => setIsCreateModalOpen(true)}
          className="group relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer min-h-[300px]"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-140 transition-transform duration-300">
            <Store className="w-8 h-8 text-primary" />
            <Plus className="w-4 h-4 text-primary absolute translate-x-3 translate-y-3 bg-white rounded-full" />
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:scale-110 transition-transform duration-300">
            Tambah Bisnis Baru
          </h3>

          <Badge
            variant="success"
            className="bg-primary/10 text-primary cursor-pointer border-0 px-4 py-2 text-sm group-hover:scale-110 transition-transform duration-300"
          >
            Tambah Sekarang
          </Badge>
        </div>
      </div>

      <CreateTenantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          refresh();
        }}
      />
    </div>
  );
}
