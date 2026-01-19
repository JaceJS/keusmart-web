interface SalesViewProps {
  startDate: string;
  endDate: string;
}

export function SalesView({ startDate, endDate }: SalesViewProps) {
  // Placeholder: In real app, consume salesService.getSales({ startDate, endDate })
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Laporan Penjualan
        </h3>
        <p className="text-gray-500 max-w-sm">
          Fitur laporan penjualan detail akan segera hadir. Saat ini data
          penjualan bisa dilihat melalui Ringkasan.
        </p>
      </div>
    </div>
  );
}
