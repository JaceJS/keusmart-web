"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { SalesTrendItem } from "../types/analytics.types";
import type { Period } from "@/app/components/ui/PeriodSelector";

interface SalesTrendChartProps {
  data: SalesTrendItem[] | null;
  loading?: boolean;
  period?: Period;
}

const formatYAxis = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}M`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}Jt`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}Rb`;
  }
  return value.toString();
};

const formatCurrency = (value: number): string => {
  return `Rp ${value.toLocaleString("id-ID")}`;
};

const formatXAxisLabel = (dateString: string, period: Period): string => {
  if (!dateString) return "";

  switch (period) {
    case "today":
      if (dateString.includes("T")) {
        const date = new Date(dateString);
        return date.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      // If just hour number
      return `${dateString}:00`;

    case "week":
      if (dateString.includes("-") && dateString.length === 10) {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
          weekday: "short",
        });
      }
      return dateString;

    case "month":
      if (dateString.match(/^\d{4}-\d{1,2}$/)) {
        const [year, week] = dateString.split("-");
        return `Minggu ${week}`;
      }
      return dateString;

    case "year":
      if (dateString.match(/^\d{4}-\d{2}$/)) {
        const [year, month] = dateString.split("-");
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agt",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ];
        const monthIndex = parseInt(month, 10) - 1;
        return monthNames[monthIndex] || month;
      }
      return dateString;

    default:
      return dateString;
  }
};

const CustomTooltip = ({
  active,
  payload,
  label,
  period,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
  period: Period;
}) => {
  if (active && payload && payload.length) {
    const getFormattedLabel = () => {
      if (!label) return "";

      switch (period) {
        case "today":
          if (label.includes("T")) {
            const date = new Date(label);
            return date.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            });
          }
          return `Jam ${label}:00`;

        case "week":
          if (label.includes("-") && label.length === 10) {
            const date = new Date(label);
            return date.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "short",
            });
          }
          return label;

        case "month":
          if (label.match(/^\d{4}-\d{1,2}$/)) {
            const [year, week] = label.split("-");
            return `Minggu ke-${week}, ${year}`;
          }
          return label;

        case "year":
          if (label.match(/^\d{4}-\d{2}$/)) {
            const [year, month] = label.split("-");
            const date = new Date(parseInt(year), parseInt(month) - 1, 1);
            return date.toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            });
          }
          return label;

        default:
          return label;
      }
    };

    const getDataKeyLabel = (dataKey: string) => {
      switch (dataKey) {
        case "revenue":
          return "Pendapatan";
        case "transactions":
          return "Transaksi";
        default:
          return dataKey;
      }
    };

    const formatValue = (dataKey: string, value: number) => {
      if (dataKey === "revenue") {
        return formatCurrency(value);
      }
      return value.toLocaleString("id-ID");
    };

    return (
      <div className="bg-white border border-border rounded-lg shadow-lg p-3 min-w-[160px]">
        <p className="text-sm font-medium text-foreground mb-2">
          {getFormattedLabel()}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary">
                {getDataKeyLabel(entry.dataKey)}
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {formatValue(entry.dataKey, entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom legend component
const CustomLegend = ({
  payload,
}: {
  payload?: Array<{ value: string; color: string }>;
}) => {
  if (!payload) return null;

  const getLegendLabel = (value: string) => {
    switch (value) {
      case "revenue":
        return "Pendapatan";
      case "transactions":
        return "Transaksi";
      default:
        return value;
    }
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-2">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-text-secondary">
            {getLegendLabel(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SalesTrendChart({
  data,
  loading = false,
  period = "week",
}: SalesTrendChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm animate-pulse h-full">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
        <div className="flex-1 bg-gray-100 rounded-xl min-h-64" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full flex flex-col">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Trend Penjualan
        </h3>
        <div className="flex-1 flex items-center justify-center bg-secondary rounded-xl min-h-64">
          <p className="text-text-secondary">Belum ada data penjualan</p>
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    label: formatXAxisLabel(item.date, period),
    originalDate: item.date,
  }));

  const revenueColor = "#10B981";
  const transactionsColor = "#6366F1";

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Trend Penjualan
      </h3>

      <div className="flex-1 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 5,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-default)"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--text-tertiary)" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: "var(--text-tertiary)" }}
              width={50}
            />
            <Tooltip
              content={<CustomTooltip period={period} />}
              cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
            />
            <Legend content={<CustomLegend />} />
            <Bar
              dataKey="revenue"
              name="revenue"
              fill={revenueColor}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              stroke="none"
              activeBar={{ stroke: "none", strokeWidth: 0 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
