import { cn } from "@/app/lib/utils";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  trendLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  loading?: boolean;
}

export function KpiCard({
  title,
  value,
  change,
  trendLabel = "vs periode lalu",
  icon: Icon,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-50",
  loading = false,
}: KpiCardProps) {
  const isPositive = change !== undefined && change >= 0;

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-border p-4 shadow-sm animate-pulse">
        <div className="flex justify-between items-center mb-2">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="w-8 h-8 bg-gray-200 rounded-lg" />
        </div>
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xs font-medium text-text-secondary">{title}</p>
        <div
          className={cn(
            "p-1.5 rounded-lg transition-transform duration-200 group-hover:scale-110",
            iconBgColor,
          )}
        >
          <Icon className={cn("w-4 h-4", iconColor)} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground tracking-tight mb-1">
        {value}
      </h3>

      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-semibold px-1.5 py-0.5 rounded-full",
              isPositive
                ? "text-emerald-700 bg-emerald-50"
                : "text-red-700 bg-red-50",
            )}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
          </span>
          <span className="text-xs text-text-tertiary">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
