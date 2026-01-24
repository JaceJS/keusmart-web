import { useState, useEffect } from "react";
import { analyticsService } from "../services/analytics.service";
import type { ReportSummaryResponse } from "../types/analytics.types";
import type { AnalyticsPeriod } from "../types/analytics.types";

export function useReportSummary(period: AnalyticsPeriod) {
  const [data, setData] = useState<ReportSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        const res = await analyticsService.getReportSummary(period);
        setData(res);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat ringkasan laporan");
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, [period]);

  return { data, isLoading, error };
}
