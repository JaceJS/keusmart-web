"use client";

import React from "react";
import Link from "next/link";

// Feature display names for user-friendly messages
const FEATURE_DISPLAY_NAMES: Record<string, string> = {
  pos: "Point of Sale",
  expenseTracker: "Expense Tracker",
  reports: "Laporan Lanjutan",
  dashboard: "Dashboard Lanjutan",
  exportCsv: "Export CSV",
  whatsappSummary: "WhatsApp Summary",
  aiInsight: "AI Insight",
  stockPrediction: "Prediksi Stok",
  crossBranchInsight: "Cross Branch Insight",
  branchComparison: "Perbandingan Cabang",
  prioritySupport: "Priority Support",
  customRole: "Custom Role",
  priorityBackup: "Priority Backup",
};

interface UpgradeBannerProps {
  /**
   * The feature that requires upgrade
   */
  feature: string;
  /**
   * Custom title for the banner
   */
  title?: string;
  /**
   * Custom description
   */
  description?: string;
  /**
   * Compact mode for inline usage
   */
  compact?: boolean;
}

/**
 * Banner component shown when a feature is not available on current plan
 */
export function UpgradeBanner({
  feature,
  title,
  description,
  compact = false,
}: UpgradeBannerProps) {
  const featureName = FEATURE_DISPLAY_NAMES[feature] || feature;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-gray-500">
        <svg
          className="w-4 h-4 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>
          <Link
            href="/settings/billing"
            className="text-primary hover:underline"
          >
            Upgrade
          </Link>{" "}
          untuk akses {featureName}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <svg
            className="w-6 h-6 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-amber-800">
            {title || `Fitur ${featureName} Terkunci`}
          </h3>
          <p className="mt-1 text-sm text-amber-700">
            {description ||
              `Upgrade paket Anda untuk mengakses fitur ${featureName} dan fitur premium lainnya.`}
          </p>
          <div className="mt-3">
            <Link
              href="/settings/billing"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-800 hover:text-amber-900"
            >
              Lihat Paket
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
