export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Team
        </h1>
        <p className="text-sm text-muted-foreground text-gray-500">
          Kelola anggota tim dan hak akses mereka.
        </p>
      </div>

      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center animate-in fade-in zoom-in duration-500">
        <h3 className="text-lg font-semibold text-gray-900">
          Area Konfigurasi Tim
        </h3>
        <p className="text-gray-500 max-w-sm mt-2">
          Opsi konfigurasi tambahan dan preferensi akun admin ada di sini.
        </p>
      </div>
    </div>
  );
}
