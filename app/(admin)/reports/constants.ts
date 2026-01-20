export type ReportTab = "summary" | "sales" | "expenses";

export const REPORT_TABS: { id: ReportTab; label: string }[] = [
  { id: "summary", label: "Ringkasan & Laba Rugi" },
  { id: "sales", label: "Laporan Penjualan" },
  { id: "expenses", label: "Laporan Pengeluaran" },
];
