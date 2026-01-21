"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { useTenantProfile } from "../hooks/useTenantProfile";
import { UpdateTenantRequest } from "../types/tenant.types";
import {
  Building2,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  Save,
  ImagePlus,
  Crown,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

// Skeleton component for loading state
function FormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Logo skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Form fields skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-11 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Textarea skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

// Subscription badge component - minimal indicator
function SubscriptionBadge({
  plan,
  status,
}: {
  plan?: string;
  status?: string;
}) {
  const isActive = status?.toLowerCase() === "active";

  return (
    <Link
      href="/settings/billing"
      className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Crown className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 capitalize">
              Paket {plan || "Free"}
            </span>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700",
              )}
            >
              {isActive ? "Aktif" : status || "Inactive"}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Kelola langganan dan tagihan Anda
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

export function BusinessProfileForm() {
  const { profile, isLoading, isUpdating, error, updateProfile } =
    useTenantProfile();

  // Form state
  const [formData, setFormData] = useState<UpdateTenantRequest>({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    logo: "",
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Logo upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // Sync form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        address: profile.address || "",
        description: profile.description || "",
        logo: profile.logo || "",
      });
      if (profile.logo) {
        setLogoPreview(profile.logo);
      }
    }
  }, [profile]);

  // Track changes
  const handleInputChange = (
    field: keyof UpdateTenantRequest,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSuccessMessage(null);
  };

  // Handle logo file selection
  const handleLogoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Silakan pilih file gambar (JPG, PNG, dll)");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setHasChanges(true);
      setSuccessMessage(null);
    };
    reader.readAsDataURL(file);

    // Upload file to server
    setIsUploadingLogo(true);
    try {
      // For now, we'll use the base64 data URL as the logo
      // In production, you would upload to Cloudinary or your backend
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, logo: result }));
        setIsUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Failed to upload logo:", err);
      setIsUploadingLogo(false);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setFormData((prev) => ({ ...prev, logo: "" }));
    setHasChanges(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setHasChanges(false);
      setSuccessMessage("Profil berhasil disimpan!");
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {successMessage}
        </div>
      )}

      {/* Logo Section */}
      <div className="flex items-start gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
            {isUploadingLogo ? (
              <Loader2 className="w-8 h-8 text-primary/40 animate-spin" />
            ) : logoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoPreview}
                alt="Logo Bisnis"
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-10 h-10 text-primary/40" />
            )}
          </div>

          {/* Upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingLogo}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            title="Upload Logo"
          >
            <ImagePlus className="w-4 h-4" />
          </button>

          {/* Remove button (when logo exists) */}
          {logoPreview && !isUploadingLogo && (
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
              title="Hapus Logo"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoSelect}
            className="hidden"
          />
        </div>
        <div className="flex-1 pt-2">
          <h3 className="font-semibold text-gray-900">Logo Bisnis</h3>
          <p className="text-sm text-gray-500 mt-1">
            Upload logo bisnis Anda. Ukuran maksimal 2MB.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Format: JPG, PNG, atau SVG
          </p>
        </div>
      </div>

      {/* Main Form Fields */}
      <Card className="p-6 space-y-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Informasi Bisnis
        </h3>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Nama Bisnis"
            placeholder="Nama toko atau bisnis Anda"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />

          <Input
            label="Email Bisnis"
            type="email"
            placeholder="email@bisnis.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          <Input
            label="Nomor Telepon"
            type="tel"
            placeholder="+62 812 3456 7890"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />

          <Input
            label="Alamat"
            placeholder="Alamat lengkap bisnis"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>

        {/* Description textarea */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Deskripsi Bisnis
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              placeholder="Ceritakan tentang bisnis Anda..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="flex w-full rounded-lg border border-border bg-white pl-10 pr-4 py-3 text-base text-foreground transition-colors placeholder:text-text-tertiary focus:border-border-focused focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>
        </div>
      </Card>

      {/* Subscription Badge - Minimal version with link to billing */}
      <SubscriptionBadge
        plan={profile?.plan}
        status={profile?.subscriptionStatus}
      />

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          {hasChanges ? (
            <span className="text-amber-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Ada perubahan yang belum disimpan
            </span>
          ) : (
            "Semua perubahan tersimpan"
          )}
        </p>
        <Button type="submit" disabled={isUpdating || !hasChanges} size="md">
          {isUpdating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
