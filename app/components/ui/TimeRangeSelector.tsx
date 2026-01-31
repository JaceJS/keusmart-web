"use client";

import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Check,
} from "lucide-react";
import { DayPicker, DateRange as DayPickerDateRange } from "react-day-picker";
import {
  format,
  startOfMonth,
  endOfMonth,
  subMonths,
  subDays,
  subWeeks,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import "react-day-picker/style.css";

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export type PresetPeriod = "today" | "week" | "month" | "year";

// Alias for backward compatibility
export type Period = PresetPeriod;

interface TimeRangeSelectorProps {
  value: PresetPeriod | DateRange;
  onChange: (value: PresetPeriod | DateRange) => void;
  className?: string;
  showCustomRange?: boolean; // Only for Smart plan
}

interface PresetOption {
  id: PresetPeriod;
  label: string;
  getRange: () => { from: Date; to: Date };
}

const presets: PresetOption[] = [
  {
    id: "today",
    label: "Hari Ini",
    getRange: () => {
      const today = new Date();
      return { from: today, to: today };
    },
  },
  {
    id: "week",
    label: "7 Hari Terakhir",
    getRange: () => {
      const today = new Date();
      return { from: subDays(today, 6), to: today };
    },
  },
  {
    id: "month",
    label: "30 Hari Terakhir",
    getRange: () => {
      const today = new Date();
      return { from: subDays(today, 29), to: today };
    },
  },
  {
    id: "year",
    label: "Tahun Ini",
    getRange: () => {
      const today = new Date();
      return { from: startOfYear(today), to: today };
    },
  },
];

const formatDisplayDate = (date: Date): string => {
  return format(date, "d MMM yyyy", { locale: id });
};

const getDisplayLabel = (value: PresetPeriod | DateRange): string => {
  if (typeof value === "string") {
    const preset = presets.find((p) => p.id === value);
    return preset?.label || "Pilih Periode";
  }
  return `${formatDisplayDate(value.startDate)} - ${formatDisplayDate(value.endDate)}`;
};

export function TimeRangeSelector({
  value,
  onChange,
  className,
  showCustomRange = false,
}: TimeRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState<
    DayPickerDateRange | undefined
  >();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePresetClick = (presetId: PresetPeriod) => {
    onChange(presetId);
    setIsOpen(false);
    setShowCalendar(false);
  };

  const handleApplyCustomRange = () => {
    if (selectedRange?.from && selectedRange?.to) {
      onChange({ startDate: selectedRange.from, endDate: selectedRange.to });
      setIsOpen(false);
      setShowCalendar(false);
    }
  };

  const isPresetSelected = (presetId: PresetPeriod) => {
    return typeof value === "string" && value === presetId;
  };

  const isCustomRangeActive = typeof value !== "string";

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors",
          isOpen
            ? "border-primary bg-primary/5 text-primary"
            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
        )}
      >
        <Calendar className="h-4 w-4" />
        <span>{getDisplayLabel(value)}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          <div className="flex">
            {/* Presets Column */}
            <div
              className={cn(
                "p-2 bg-gray-50 border-r border-gray-100",
                showCalendar ? "w-40" : "w-48",
              )}
            >
              <p className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                Periode
              </p>

              {/* Main Presets */}
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all",
                    isPresetSelected(preset.id)
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-white hover:shadow-sm",
                  )}
                >
                  <span>{preset.label}</span>
                  {isPresetSelected(preset.id) && <Check className="h-4 w-4" />}
                </button>
              ))}

              {/* Custom Range Toggle */}
              <div className="mt-2 border-t border-gray-200 pt-2">
                {showCustomRange ? (
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all",
                      showCalendar || isCustomRangeActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-white hover:shadow-sm",
                    )}
                  >
                    <span>Custom Range</span>
                    <Calendar className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-gray-400 cursor-not-allowed"
                    title="Upgrade ke Smart untuk Custom Range"
                  >
                    <span>Custom Range</span>
                    <Lock className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Calendar Panel (only when showCalendar is true) */}
            {showCalendar && showCustomRange && (
              <div className="p-3">
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={setSelectedRange}
                  locale={id}
                  numberOfMonths={2}
                  showOutsideDays
                  disabled={{ after: new Date() }}
                  classNames={{
                    root: "text-sm",
                    months: "flex gap-4",
                    month: "space-y-2",
                    month_caption: "flex justify-center items-center h-8 mb-2",
                    caption_label: "text-sm font-medium text-gray-900",
                    nav: "absolute top-3 left-3 right-3 flex justify-between pointer-events-none",
                    button_previous:
                      "pointer-events-auto p-1 rounded hover:bg-gray-100",
                    button_next:
                      "pointer-events-auto p-1 rounded hover:bg-gray-100",
                    weekdays: "flex",
                    weekday:
                      "text-gray-500 w-8 text-center text-xs font-medium",
                    week: "flex",
                    day: "w-8 h-8 text-center text-sm",
                    day_button:
                      "w-full h-full rounded-lg hover:bg-gray-100 transition-colors",
                    selected: "bg-primary text-white hover:bg-primary",
                    range_start: "rounded-l-lg bg-primary text-white",
                    range_end: "rounded-r-lg bg-primary text-white",
                    range_middle: "bg-primary/20",
                    today: "font-bold text-primary",
                    outside: "text-gray-300",
                    disabled: "text-gray-300 cursor-not-allowed",
                  }}
                  components={{
                    Chevron: ({ orientation }) =>
                      orientation === "left" ? (
                        <ChevronLeft className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ),
                  }}
                />

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    {selectedRange?.from && selectedRange?.to
                      ? `${formatDisplayDate(selectedRange.from)} - ${formatDisplayDate(selectedRange.to)}`
                      : "Pilih rentang tanggal"}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleApplyCustomRange}
                    disabled={!selectedRange?.from || !selectedRange?.to}
                  >
                    Terapkan
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
