// Components
export { KpiCard } from "./components/KpiCard";
export { SalesTrendChart } from "./components/SalesTrendChart";
export { TopProductsList } from "./components/TopProductsList";
export { PeriodSelector } from "./components/PeriodSelector";

// Hooks
export { useDashboardData } from "./hooks/useDashboardData";

// Services
export { analyticsService } from "./services/analytics.service";

// Types
export type {
  AnalyticsPeriod,
  AnalyticsSummary,
  AnalyticsComparison,
  DashboardSummaryResponse,
  SalesTrendItem,
  SalesTrendResponse,
  TopProductItem,
  TopProductsResponse,
  FinancialSummaryResponse,
  ExpenseBreakdownResponse,
} from "./types/analytics.types";

// Constants
export { ANALYTICS_ENDPOINTS } from "./analytics.endpoints";
