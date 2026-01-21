import { BusinessProfileForm } from "@/features/tenants/components/BusinessProfileForm";

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

      <BusinessProfileForm />
    </div>
  );
}
