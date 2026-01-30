"use client";

import { Card } from "@/app/components/ui/Card";
import { Sparkles, Lightbulb, AlertCircle, TrendingUp } from "lucide-react";
import { useCanAccess, usePlan } from "@/features/plans";
import { LockedFeatureCard } from "@/features/plans/components/LockedFeatureCard";

interface InsightItem {
  type: "tip" | "warning" | "opportunity";
  title: string;
  description: string;
}

const BASIC_INSIGHTS: InsightItem[] = [
  {
    type: "tip",
    title: "Jam Ramai",
    description: "Penjualan tertinggi terjadi antara jam 11:00-13:00",
  },
  {
    type: "opportunity",
    title: "Produk Potensial",
    description:
      "Nasi Goreng memiliki margin tertinggi, pertimbangkan untuk promosi",
  },
];

const ADVANCED_INSIGHTS: InsightItem[] = [
  ...BASIC_INSIGHTS,
  {
    type: "warning",
    title: "Stok Menipis",
    description:
      "Prediksi: Kopi Susu akan habis dalam 3 hari berdasarkan tren penjualan",
  },
  {
    type: "opportunity",
    title: "Rekomendasi Bundle",
    description:
      "Kombinasikan Nasi Goreng + Es Teh untuk meningkatkan average order value",
  },
];

function InsightIcon({ type }: { type: InsightItem["type"] }) {
  switch (type) {
    case "tip":
      return <Lightbulb className="h-4 w-4 text-blue-500" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case "opportunity":
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
  }
}

interface AIInsightWidgetProps {
  loading?: boolean;
}

export function AIInsightWidget({ loading = false }: AIInsightWidgetProps) {
  const hasAccess = useCanAccess("aiInsight");
  const { features } = usePlan();

  if (!hasAccess) {
    return (
      <LockedFeatureCard
        title="AI Insights"
        icon={<Sparkles className="h-5 w-5 text-primary" />}
        description="Dapatkan rekomendasi bisnis cerdas berbasis data untuk UMKM Anda."
      />
    );
  }

  const aiLevel = features.aiInsight;
  const insights = aiLevel === "advanced" ? ADVANCED_INSIGHTS : BASIC_INSIGHTS;

  if (loading) {
    return (
      <Card className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-gray-900 text-sm">AI Insights</h3>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse p-3 bg-gray-50 rounded-lg">
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-2 bg-gray-100 rounded w-full" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-gray-900 text-sm">
            Rekomendasi AI
          </h3>
        </div>
        {aiLevel === "advanced" && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Advanced
          </span>
        )}
      </div>

      <div className="space-y-2 overflow-y-auto flex-1 pr-1">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-lg"
          >
            <div className="mt-0.5 shrink-0">
              <InsightIcon type={insight.type} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900">
                {insight.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
