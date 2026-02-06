"use client";

import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ConfirmationModal } from "@/app/components/ui/ConfirmationModal";
import { useCurrentSubscription } from "../hooks/useCurrentSubscription";
import { useState } from "react";
import {
  Settings,
  RefreshCw,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

interface SubscriptionSettingsProps {
  onRenew?: () => void;
}

export function SubscriptionSettings({ onRenew }: SubscriptionSettingsProps) {
  const {
    subscription,
    isLoading,
    isCancelling,
    isTogglingAutoRenew,
    cancelSubscription,
    toggleAutoRenew,
  } = useCurrentSubscription();

  const [showCancelModal, setShowCancelModal] = useState(false);

  if (isLoading || !subscription) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </Card>
    );
  }

  const handleCancelConfirm = async () => {
    const success = await cancelSubscription();
    if (success) {
      setShowCancelModal(false);
    }
  };

  const handleAutoRenewToggle = async () => {
    await toggleAutoRenew(!subscription.autoRenew);
  };

  const isCancelled = subscription.status === "cancelled";
  const isExpired = subscription.status === "expired";

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Pengaturan Langganan
          </h2>
        </div>

        <div className="space-y-4">
          {/* Auto-renew toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Perpanjang Otomatis</p>
              <p className="text-sm text-gray-500">
                Langganan akan diperpanjang secara otomatis
              </p>
            </div>
            <button
              onClick={handleAutoRenewToggle}
              disabled={isTogglingAutoRenew || isCancelled}
              className={cn(
                "transition-colors",
                isCancelled && "opacity-50 cursor-not-allowed",
              )}
            >
              {isTogglingAutoRenew ? (
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              ) : subscription.autoRenew ? (
                <ToggleRight className="w-10 h-10 text-primary" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-gray-400" />
              )}
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {(isExpired || isCancelled) && (
              <Button variant="primary" onClick={onRenew}>
                <RefreshCw className="w-4 h-4" />
                Perpanjang Langganan
              </Button>
            )}

            {!isCancelled && !isExpired && (
              <Button
                variant="ghost"
                onClick={() => setShowCancelModal(true)}
                disabled={isCancelling}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                {isCancelling ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Batalkan Langganan
              </Button>
            )}
          </div>

          {isCancelled && (
            <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              Langganan Anda telah dibatalkan dan akan berakhir pada tanggal
              yang tertera.
            </p>
          )}
        </div>
      </Card>

      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelConfirm}
        title="Batalkan Langganan"
        message="Apakah Anda yakin ingin membatalkan langganan? Anda masih dapat menggunakan layanan hingga periode berakhir."
        confirmText="Ya, Batalkan"
        cancelText="Tidak"
        variant="danger"
        isLoading={isCancelling}
      />
    </>
  );
}
