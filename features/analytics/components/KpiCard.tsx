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
      <div className="bg-white rounded-2xl border border-border p-5 shadow-sm animate-pulse h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-200 h-full flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-2">
          <p
            className="text-sm font-medium text-text-secondary line-clamp-1"
            title={title}
          >
            {title}
          </p>
          <div
            className={cn(
              "p-2 rounded-lg transition-colors duration-200 group-hover:scale-110 transform",
              iconBgColor,
            )}
          >
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold text-foreground tracking-tight break-all">
            {value}
          </h3>
        </div>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1",
              isPositive
                ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                : "text-red-700 bg-red-50 border border-red-100",
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
