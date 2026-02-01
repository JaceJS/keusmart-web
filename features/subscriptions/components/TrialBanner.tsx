"use client";

import { useState } from "react";
import { AlertCircle, X, Zap } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { getTrialUrgencyLevel } from "@/utils/subscription";

interface TrialBannerProps {
  daysRemaining: number;
  onDismiss?: () => void;
}

export function TrialBanner({ daysRemaining, onDismiss }: TrialBannerProps) {
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);
  const urgency = getTrialUrgencyLevel(daysRemaining);

  if (isDismissed || daysRemaining <= 0) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const styles = {
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-900",
      icon: "text-blue-600",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-900",
      icon: "text-amber-600",
    },
    danger: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-900",
      icon: "text-red-600",
    },
  };

  const style = styles[urgency];

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border",
        style.bg
      )}
    >
      <AlertCircle className={cn("w-5 h-5 shrink-0", style.icon)} />
      <div className="flex-1">
        <p className={cn("font-medium", style.text)}>
          Trial berakhir dalam {daysRemaining} hari
        </p>
        <p className={cn("text-sm mt-1", style.text, "opacity-80")}>
          Upgrade sekarang untuk terus mengakses semua fitur premium
        </p>
      </div>
      <Button
        variant="primary"
        size="sm"
        onClick={() => router.push("/settings/billing")}
      >
        <Zap className="w-4 h-4" />
        Lihat Paket
      </Button>
      <button
        onClick={handleDismiss}
        className={cn("p-1 rounded hover:bg-black/5", style.text)}
        aria-label="Dismiss trial banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
