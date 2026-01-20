"use client";

import { cn } from "@/app/lib/utils";
import { ReportTab, REPORT_TABS } from "../constants";

interface ReportTabsProps {
  activeTab: ReportTab;
  onChange: (tab: ReportTab) => void;
}

export function ReportTabs({ activeTab, onChange }: ReportTabsProps) {
  return (
    <div className="flex p-1 bg-gray-100/80 rounded-xl w-full sm:w-auto border border-gray-200/50">
      {REPORT_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
            activeTab === tab.id
              ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
              : "text-text-secondary hover:text-foreground hover:bg-gray-200/50",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
