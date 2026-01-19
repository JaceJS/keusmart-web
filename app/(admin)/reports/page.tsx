import { FileBarChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Laporan
        </h1>
        <p className="text-sm text-muted-foreground text-gray-500">
          Lihat dan export laporan penjualan, laba rugi, dan pengeluaran.
        </p>
      </div>

      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <FileBarChart className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Belum ada laporan
        </h3>
        <p className="text-gray-500 max-w-sm mt-2">
          Laporan penjualan, laba rugi, dan pengeluaran akan muncul di sini
          setelah ada data transaksi.
        </p>
      </div>
    </div>
  );
}
