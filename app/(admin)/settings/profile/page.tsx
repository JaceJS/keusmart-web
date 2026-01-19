import { Building2 } from "lucide-react";

export default function BusinessProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Profil Bisnis
        </h1>
        <p className="text-sm text-muted-foreground text-gray-500">
          Kelola informasi bisnis Anda seperti nama toko, logo, dan alamat.
        </p>
      </div>

      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Profil Bisnis</h3>
        <p className="text-gray-500 max-w-sm mt-2">
          Form untuk mengatur nama toko, logo, alamat, dan informasi bisnis
          lainnya akan tersedia di sini.
        </p>
      </div>
    </div>
  );
}
