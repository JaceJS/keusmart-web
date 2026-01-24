"use client";

import { useState, useEffect } from "react";
import { useSales, SalesReportTable } from "@/features/sales";
import type { Period } from "@/app/components/ui/PeriodSelector";

interface SalesViewProps {
  period: Period;
}

const ITEMS_PER_PAGE = 10;

export function SalesView({ period }: SalesViewProps) {
  const [page, setPage] = useState(1);

  // Reset page when period changes
  useEffect(() => {
    setPage(1);
  }, [period]);

  const { data, meta, isLoading, error, fetchSales } = useSales({
    period,
    page,
    limit: ITEMS_PER_PAGE,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchSales({ period, page: newPage, limit: ITEMS_PER_PAGE });
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SalesReportTable
        data={data}
        isLoading={isLoading}
        meta={meta}
        currentPage={page}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
