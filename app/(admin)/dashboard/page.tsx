export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground text-gray-500">
          Overview performa bisnis Anda hari ini.
        </p>
      </div>

      {/* Empty State / Placeholder */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Belum ada data ringkasan
        </h3>
        <p className="text-gray-500 max-w-sm mt-2">
          Data penjualan dan performa bisnis Anda akan muncul di sini setelah
          operasional berjalan.
        </p>
      </div>
    </div>
  );
}
