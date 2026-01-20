"use client";

import type { SalesTrendItem } from "../types/analytics.types";

interface SalesTrendChartProps {
  data: SalesTrendItem[] | null;
  loading?: boolean;
}

export function SalesTrendChart({
  data,
  loading = false,
}: SalesTrendChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
        <div className="h-64 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Trend Penjualan
        </h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
          <p className="text-gray-500">Belum ada data penjualan</p>
        </div>
      </div>
    );
  }

  // Find max value for scaling
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Trend Penjualan
      </h3>

      {/* Simple Bar Chart */}
      <div className="h-64 flex items-end gap-2">
        {data.map((item, index) => {
          const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
          const date = new Date(item.date);
          const dayName = date.toLocaleDateString("id-ID", {
            weekday: "short",
          });

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full flex flex-col items-center justify-end h-48">
                <div
                  className="w-full max-w-12 bg-linear-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${Math.max(height, 4)}%` }}
                  title={`Rp ${item.revenue.toLocaleString("id-ID")}`}
                />
              </div>
              <span className="text-xs text-gray-500">{dayName}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span>Revenue</span>
        </div>
      </div>
    </div>
  );
}
