"use client";

import { cn } from "@/app/lib/utils";
import { Lock } from "lucide-react";
import { ReportTab, REPORT_TABS } from "../constants";

interface ReportTabsProps {
  activeTab: ReportTab;
  onChange: (tab: ReportTab) => void;
  lockedTabs?: ReportTab[];
}

export function ReportTabs({
  activeTab,
  onChange,
  lockedTabs = [],
}: ReportTabsProps) {
  return (
    <div className="flex p-1 bg-gray-100/80 rounded-xl w-full sm:w-auto border border-gray-200/50">
      {REPORT_TABS.map((tab) => {
        const isLocked = lockedTabs.includes(tab.id);
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => !isLocked && onChange(tab.id)}
            disabled={isLocked}
            title={isLocked ? "Upgrade ke Growth untuk akses" : undefined}
            className={cn(
              "flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 justify-center",
              isActive && !isLocked
                ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
                : isLocked
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-text-secondary hover:text-foreground hover:bg-gray-200/50",
            )}
          >
            {tab.label}
            {isLocked && <Lock className="w-3 h-3" />}
          </button>
        );
      })}
    </div>
  );
}
