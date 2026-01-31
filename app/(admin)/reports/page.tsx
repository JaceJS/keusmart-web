"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import {
  TimeRangeSelector,
  PresetPeriod,
  DateRange,
} from "@/app/components/ui/TimeRangeSelector";
import { ReportTabs } from "./components/ReportTabs";
import { SummaryView } from "./components/SummaryView";
import { SalesView } from "./components/SalesView";
import { ExpensesView } from "./components/ExpensesView";
import type { ReportTab } from "./constants";
import { REPORT_TABS } from "./constants";
import { Download, Lock } from "lucide-react";
import { usePlan, useCanAccess } from "@/features/plans";

type Period = "today" | "week" | "month" | "year";
const VALID_PERIODS: Period[] = ["today", "week", "month", "year"];

export default function ReportsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const canExport = useCanAccess("exportCsv");
  const canCustomDateRange = useCanAccess("customDateRange");

  const tabParam = searchParams.get("tab") as ReportTab | null;
  const periodParam = searchParams.get("period") as Period | null;

  const activeTab: ReportTab = REPORT_TABS.some((t) => t.id === tabParam)
    ? tabParam!
    : "summary";
  const period: Period = VALID_PERIODS.includes(periodParam!)
    ? periodParam!
    : "month";

  const updateURL = useCallback(
    (newTab: ReportTab, newPeriod: Period) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", newTab);
      params.set("period", newPeriod);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const handleTabChange = (tab: ReportTab) => {
    updateURL(tab, period);
  };

  const handleTimeRangeChange = (value: PresetPeriod | DateRange) => {
    if (typeof value === "string") {
      updateURL(activeTab, value);
    }
    // TODO: Handle custom date range when backend supports it
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Laporan
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Analisa laporan keuangan Anda
          </p>
        </div>

        <button
          disabled={!canExport}
          onClick={() => {
            // TODO: Implement export functionality
            console.log("Export clicked");
          }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
            canExport
              ? "bg-white border border-border text-text-secondary hover:text-foreground hover:bg-gray-50"
              : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          title={
            canExport ? "Export laporan" : "Upgrade ke Growth untuk Export"
          }
        >
          {canExport ? (
            <Download className="w-4 h-4" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
          Export
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-border shadow-sm">
        <ReportTabs activeTab={activeTab} onChange={handleTabChange} />
        <TimeRangeSelector
          value={period}
          onChange={handleTimeRangeChange}
          showCustomRange={canCustomDateRange}
        />
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === "summary" && <SummaryView period={period} />}
        {activeTab === "sales" && <SalesView period={period} />}
        {activeTab === "expenses" && <ExpensesView period={period} />}
      </div>
    </div>
  );
}
