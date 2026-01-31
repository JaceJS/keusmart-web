"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { formatCurrencyCompact } from "@/utils/number";

interface FinancialSummaryChartProps {
  revenue: number;
  expenses: number;
  revenueChange?: number;
  expenseChange?: number;
  loading?: boolean;
}

// Custom tooltip
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { name: string; change?: number };
  }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const isRevenue = data.payload.name === "Pendapatan";
    const change = data.payload.change;

    return (
      <div className="bg-white border border-border rounded-lg shadow-lg p-3 min-w-[160px]">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-sm text-text-secondary">
            {data.payload.name}
          </span>
          {change !== undefined && (
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                // For revenue: positive is green, negative is red
                // For expenses: positive is red (bad), negative is green (good)
                (isRevenue && change >= 0) || (!isRevenue && change <= 0)
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change}%
            </span>
          )}
        </div>
        <p className="text-lg font-bold text-foreground">
          {formatCurrencyCompact(data.value)}
        </p>
      </div>
    );
  }
  return null;
};

export function FinancialSummaryChart({
  revenue,
  expenses,
  revenueChange,
  expenseChange,
  loading = false,
}: FinancialSummaryChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm animate-pulse h-full">
        <div className="h-5 bg-gray-200 rounded w-48 mb-6" />
        <div className="flex-1 bg-gray-100 rounded-xl min-h-[300px]" />
      </div>
    );
  }

  const data = [
    {
      name: "Pendapatan",
      value: revenue,
      color: "#10B981", // Emerald 500
      change: revenueChange,
    },
    {
      name: "Pengeluaran",
      value: expenses,
      color: "#EF4444", // Red 500
      change: expenseChange,
    },
  ];

  const maxVal = Math.max(revenue, expenses) * 1.1;

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Laporan Laba Rugi
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Perbandingan pendapatan dan pengeluaran
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-text-secondary">Profit Margin</p>
          <p
            className={`text-lg font-bold ${
              revenue - expenses >= 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {revenue > 0
              ? `${(((revenue - expenses) / revenue) * 100).toFixed(1)}%`
              : "0%"}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        {/* Helper style for Recharts focus outline removal */}
        <style jsx global>{`
          .recharts-wrapper *:focus {
            outline: none !important;
          }
        `}</style>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={60}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-default)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "var(--text-secondary)", dy: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrencyCompact}
              tick={{ fontSize: 12, fill: "var(--text-tertiary)" }}
              domain={[0, maxVal]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />
            <ReferenceLine y={0} stroke="#e5e7eb" />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              stroke="none"
              activeBar={{ stroke: "none", strokeWidth: 0 }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
