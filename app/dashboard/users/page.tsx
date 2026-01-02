export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Manajemen Pengguna
        </h1>
        <p className="text-sm text-muted-foreground text-gray-500">
          Atur akses tim dan peran pengguna.
        </p>
      </div>

      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center animate-in fade-in zoom-in duration-500">
        <h3 className="text-lg font-semibold text-gray-900">Kelola Tim Anda</h3>
        <p className="text-gray-500 max-w-sm mt-2">
          Daftar pengguna dan pengaturan hak akses (RBAC) akan ditampilkan di
          sini.
        </p>
      </div>
    </div>
  );
}
