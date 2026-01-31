"use client";

import Link from "next/link";
import { Crown, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { usePlan } from "@/features/plans";
import {
  getPlanGradient,
  getPlanBadgeColor,
  getPlanIconColor,
} from "@/utils/plan";

export function SubscriptionBadge() {
  const { tier, isLoading } = usePlan();

  const tierDisplayName = tier.charAt(0).toUpperCase() + tier.slice(1);
  const isActive = tier !== "starter";

  if (isLoading) {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl border border-gray-200 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/settings/billing"
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border transition-all group bg-linear-to-r",
        getPlanGradient(tier),
        "hover:shadow-md",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            getPlanIconColor(tier),
          )}
        >
          <Crown className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              Paket {tierDisplayName}
            </span>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                getPlanBadgeColor(tier),
              )}
            >
              {isActive ? "Aktif" : "Free"}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Kelola langganan dan tagihan Anda
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
