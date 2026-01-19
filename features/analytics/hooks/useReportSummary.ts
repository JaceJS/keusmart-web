import { useState, useEffect } from "react";
import { analyticsService } from "../services/analytics.service";
import type { ReportSummaryResponse } from "../types/analytics.types";

export function useReportSummary(startDate: string, endDate: string) {
  const [data, setData] = useState<ReportSummaryResponse["summary"] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      if (!startDate || !endDate) return;
      try {
        setIsLoading(true);
        const res = await analyticsService.getReportSummary(startDate, endDate);
        setData(res.summary);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat ringkasan laporan");
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, [startDate, endDate]);

  return { data, isLoading, error };
}
