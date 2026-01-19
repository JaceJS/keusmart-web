"use client";

import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = "",
}: DateRangePickerProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative group">
        <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-medium text-text-secondary group-focus-within:text-primary transition-colors">
          Dari Tanggal
        </label>
        <div className="flex items-center border border-border rounded-lg bg-white px-3 py-1.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all hover:border-gray-300">
          <Calendar className="w-4 h-4 text-text-tertiary mr-2" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="text-sm text-foreground outline-none bg-transparent font-medium w-full cursor-pointer"
          />
        </div>
      </div>

      <span className="text-text-tertiary font-medium">-</span>

      <div className="relative group">
        <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-medium text-text-secondary group-focus-within:text-primary transition-colors">
          Sampai Tanggal
        </label>
        <div className="flex items-center border border-border rounded-lg bg-white px-3 py-1.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all hover:border-gray-300">
          <Calendar className="w-4 h-4 text-text-tertiary mr-2" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="text-sm text-foreground outline-none bg-transparent font-medium w-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
