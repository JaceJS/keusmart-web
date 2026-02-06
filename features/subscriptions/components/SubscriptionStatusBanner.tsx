"use client";

import { useCurrentSubscription } from "../hooks/useCurrentSubscription";
import { AlertTriangle, Clock, XCircle } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface SubscriptionStatusBannerProps {
  onUpgrade?: () => void;
  onRenew?: () => void;
}

export function SubscriptionStatusBanner({
  onUpgrade,
  onRenew,
}: SubscriptionStatusBannerProps) {
  const { subscription, isTrial, trialDaysRemaining, isLoading } =
    useCurrentSubscription();

  if (isLoading || !subscription) return null;

  const isExpired = subscription.status === "expired";
  const isCancelled = subscription.status === "cancelled";
  const isTrialEnding = isTrial && trialDaysRemaining <= 3;

  if (!isExpired && !isCancelled && !isTrialEnding) return null;

  const bannerConfig = {
    expired: {
      bg: "bg-red-50 border-red-200",
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      title: "Langganan Anda Telah Berakhir",
      message: "Perpanjang sekarang untuk melanjutkan akses ke semua fitur.",
      action: onRenew,
      actionLabel: "Perpanjang Sekarang",
    },
    cancelled: {
      bg: "bg-amber-50 border-amber-200",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      title: "Langganan Dibatalkan",
      message: `Akses Anda akan berakhir pada ${new Date(subscription.endDate).toLocaleDateString("id-ID")}.`,
      action: onRenew,
      actionLabel: "Aktifkan Kembali",
    },
    trialEnding: {
      bg: "bg-blue-50 border-blue-200",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      title: `Trial berakhir dalam ${trialDaysRemaining} hari`,
      message: "Upgrade sekarang untuk tetap menggunakan semua fitur.",
      action: onUpgrade,
      actionLabel: "Upgrade Sekarang",
    },
  };

  const config = isExpired
    ? bannerConfig.expired
    : isCancelled
      ? bannerConfig.cancelled
      : bannerConfig.trialEnding;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border",
        config.bg,
      )}
    >
      <div className="flex items-center gap-3">
        {config.icon}
        <div>
          <p className="font-medium text-gray-900">{config.title}</p>
          <p className="text-sm text-gray-600">{config.message}</p>
        </div>
      </div>
      {config.action && (
        <button
          onClick={config.action}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          {config.actionLabel}
        </button>
      )}
    </div>
  );
}
