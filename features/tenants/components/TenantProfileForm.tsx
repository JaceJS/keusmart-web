"use client";

import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { useTenantProfile } from "../hooks/useTenantProfile";
import { UpdateTenantRequest } from "../types/tenant.types";
import { uploadService } from "@/core/upload";
import { TenantProfileFormSkeleton } from "./TenantProfileFormSkeleton";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { LogoUploader } from "./LogoUploader";
import {
  Building2,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  Save,
} from "lucide-react";

export function TenantProfileForm() {
  const { profile, isLoading, isUpdating, error, updateProfile } =
    useTenantProfile();

  const [formData, setFormData] = useState<UpdateTenantRequest>({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    logoUrl: "",
  });

  const [pendingLogoFile, setPendingLogoFile] = useState<File | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        address: profile.address || "",
        description: profile.description || "",
        logoUrl: profile.logoUrl || "",
      });
    }
  }, [profile]);

  const handleInputChange = (
    field: keyof UpdateTenantRequest,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSuccessMessage(null);
  };

  const handleLogoFileSelect = (file: File | null) => {
    setPendingLogoFile(file);
    setHasChanges(true);
    setSuccessMessage(null);

    // If file is null, user wants to remove logo
    if (file === null) {
      setFormData((prev) => ({ ...prev, logoUrl: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let logoUrl = formData.logoUrl;

      // Upload logo if there's a pending file
      if (pendingLogoFile) {
        const uploadResponse = await uploadService.uploadImage(
          pendingLogoFile,
          "tenants",
        );
        logoUrl = uploadResponse.imageUrl;
      }

      const success = await updateProfile({ ...formData, logoUrl });

      if (success) {
        setHasChanges(false);
        setPendingLogoFile(null);
        setSuccessMessage("Profil berhasil disimpan!");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const isSubmitting = isSaving || isUpdating;

  if (isLoading) {
    return <TenantProfileFormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {successMessage}
        </div>
      )}

      <LogoUploader
        currentLogoUrl={profile?.logoUrl}
        onFileSelect={handleLogoFileSelect}
        isUploading={isSubmitting}
      />

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

      <SubscriptionBadge
        plan={profile?.plan}
        status={profile?.subscriptionStatus}
      />

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
        <Button type="submit" disabled={isSubmitting || !hasChanges} size="md">
          {isSubmitting ? (
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
