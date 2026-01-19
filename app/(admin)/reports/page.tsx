"use client";

import { useState } from "react";
import { DateRangePicker } from "@/app/components/ui/DateRangePicker";
import { ReportTabs } from "@/features/reports/components/ReportTabs";
import { SummaryView } from "@/features/reports/components/SummaryView";
import { SalesView } from "@/features/reports/components/SalesView";
import { ExpensesView } from "@/features/reports/components/ExpensesView";
import type { ReportTab } from "@/features/reports/constants";
import { Download } from "lucide-react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>("summary");

  // Default to today
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Laporan Keuangan
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Analisa performa bisnis Anda dalam periode tertentu.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-gray-50 transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-border shadow-sm">
        <ReportTabs activeTab={activeTab} onChange={setActiveTab} />
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === "summary" && (
          <SummaryView startDate={startDate} endDate={endDate} />
        )}
        {activeTab === "sales" && (
          <SalesView startDate={startDate} endDate={endDate} />
        )}
        {activeTab === "expenses" && (
          <ExpensesView startDate={startDate} endDate={endDate} />
        )}
      </div>
    </div>
  );
}
