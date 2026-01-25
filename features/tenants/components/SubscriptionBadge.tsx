import Link from "next/link";
import { Crown, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface SubscriptionBadgeProps {
  plan?: string;
  status?: string;
}

export function SubscriptionBadge({ plan, status }: SubscriptionBadgeProps) {
  const isActive = status?.toLowerCase() === "active";

  return (
    <Link
      href="/settings/billing"
      className="flex items-center justify-between p-4 bg-linear-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Crown className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 capitalize">
              Paket {plan || "Free"}
            </span>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700",
              )}
            >
              {isActive ? "Aktif" : status || "Inactive"}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Kelola langganan dan tagihan Anda
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
