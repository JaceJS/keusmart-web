"use client";

import { cn } from "@/app/lib/utils";

export type Period = "today" | "week" | "month" | "year";

interface PeriodSelectorProps {
  value: Period;
  onChange: (period: Period) => void;
  className?: string;
  availablePeriods?: Period[];
}

const periods: { value: Period; label: string }[] = [
  { value: "today", label: "Hari Ini" },
  { value: "week", label: "Minggu Ini" },
  { value: "month", label: "Bulan Ini" },
  { value: "year", label: "Tahun Ini" },
];

export function PeriodSelector({
  value,
  onChange,
  className,
  availablePeriods,
}: PeriodSelectorProps) {
  // Filter periods based on availability - hide unavailable ones
  const visiblePeriods = availablePeriods
    ? periods.filter((p) => availablePeriods.includes(p.value))
    : periods;

  return (
    <div className={cn("flex items-center gap-3 w-full sm:w-auto", className)}>
      <div className="flex p-1 bg-gray-100/80 rounded-xl w-full sm:w-auto border border-gray-200/50">
        {visiblePeriods.map((period) => (
          <button
            key={period.value}
            onClick={() => onChange(period.value)}
            className={cn(
              "flex-1 sm:flex-none sm:px-4 px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize",
              value === period.value
                ? "bg-white text-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/5"
                : "text-text-secondary hover:text-foreground hover:bg-gray-200/50",
            )}
          >
            <span className="sm:hidden">{period.label.split(" ")[0]}</span>
            <span className="hidden sm:inline">{period.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
