// Components
export { KpiCard } from "./components/KpiCard";
export { SalesTrendChart } from "./components/SalesTrendChart";
export { TopProductsList } from "./components/TopProductsList";

// Hooks
export { useDashboardData } from "./hooks/useDashboardData";
export { useReportSummary } from "./hooks/useReportSummary";

// Services
export { analyticsService } from "./services/analytics.service";

// Types
export type {
  AnalyticsSummary,
  AnalyticsComparison,
  DashboardSummaryResponse,
  SalesTrendItem,
  SalesTrendResponse,
  TopProductItem,
  TopProductsResponse,
  ReportSummaryResponse,
  ExpenseBreakdownResponse,
} from "./types/analytics.types";

// Constants
export { ANALYTICS_ENDPOINTS } from "./analytics.endpoints";
