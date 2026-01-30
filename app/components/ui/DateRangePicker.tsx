"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { DayPicker, DateRange as DayPickerDateRange } from "react-day-picker";
import { format, startOfMonth, endOfMonth, subMonths, subDays } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import "react-day-picker/style.css";

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
  disabled?: boolean;
  locked?: boolean;
}

const presets = [
  { label: "7 Hari Terakhir", days: 7 },
  { label: "30 Hari Terakhir", days: 30 },
  { label: "Bulan Ini", type: "thisMonth" },
  { label: "Bulan Lalu", type: "lastMonth" },
];

const formatDisplayDate = (date: Date): string => {
  return format(date, "d MMM yyyy", { locale: id });
};

export function DateRangePicker({
  value,
  onChange,
  className,
  disabled = false,
  locked = false,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<
    DayPickerDateRange | undefined
  >(value ? { from: value.startDate, to: value.endDate } : undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePresetClick = (preset: (typeof presets)[number]) => {
    const today = new Date();
    let from: Date;
    let to: Date = today;

    if (preset.type === "thisMonth") {
      from = startOfMonth(today);
      to = today;
    } else if (preset.type === "lastMonth") {
      const lastMonth = subMonths(today, 1);
      from = startOfMonth(lastMonth);
      to = endOfMonth(lastMonth);
    } else if (preset.days) {
      from = subDays(today, preset.days - 1);
    } else {
      return;
    }

    setSelectedRange({ from, to });
  };

  const handleApply = () => {
    if (selectedRange?.from && selectedRange?.to) {
      onChange({
        startDate: selectedRange.from,
        endDate: selectedRange.to,
      });
      setIsOpen(false);
    }
  };

  const displayValue = value
    ? `${formatDisplayDate(value.startDate)} - ${formatDisplayDate(value.endDate)}`
    : "Pilih Rentang Tanggal";

  if (locked) {
    return (
      <button
        disabled
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border",
          "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed",
          className,
        )}
        title="Upgrade ke Smart untuk akses Custom Range"
      >
        <Lock className="h-4 w-4" />
        <span>Custom Range</span>
      </button>
    );
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors",
          isOpen
            ? "border-primary bg-primary/5 text-primary"
            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <Calendar className="h-4 w-4" />
        <span className="hidden sm:inline">{displayValue}</span>
        <span className="sm:hidden">Custom</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          <div className="flex">
            {/* Presets Sidebar - Left side */}
            <div className="w-36 border-r border-gray-100 p-2 bg-gray-50 shrink-0">
              <p className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                Preset
              </p>
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Calendar - Right side */}
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
                  weekday: "text-gray-500 w-8 text-center text-xs font-medium",
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
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleApply}
                    disabled={!selectedRange?.from || !selectedRange?.to}
                  >
                    Terapkan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
