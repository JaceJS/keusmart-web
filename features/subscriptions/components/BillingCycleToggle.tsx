"use client";

import { cn } from "@/app/lib/utils";
import { BillingCycle } from "../types/subscription.types";

interface BillingCycleToggleProps {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  yearlyDiscount?: number;
}

export function BillingCycleToggle({
  value,
  onChange,
  yearlyDiscount = 20,
}: BillingCycleToggleProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-lg transition-all",
          value === "monthly"
            ? "bg-primary text-white shadow-sm"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200",
        )}
      >
        Bulanan
      </button>

      <button
        type="button"
        onClick={() => onChange("yearly")}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2",
          value === "yearly"
            ? "bg-primary text-white shadow-sm"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200",
        )}
      >
        Tahunan
        {yearlyDiscount > 0 && (
          <span
            className={cn(
              "px-1.5 py-0.5 text-xs font-semibold rounded",
              value === "yearly"
                ? "bg-white/20 text-white"
                : "bg-green-100 text-green-700",
            )}
          >
            -{yearlyDiscount}%
          </span>
        )}
      </button>
    </div>
  );
}
