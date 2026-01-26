"use client";

import { useState } from "react";
import { Modal } from "@/app/components/ui/Modal";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { LogoUploader } from "./LogoUploader";
import { uploadService } from "@/core/upload";
import { useCreateTenant } from "../hooks/useCreateTenant";
import { Loader2 } from "lucide-react";

interface CreateTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateTenantModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTenantModalProps) {
  // Use custom hook instead of direct service call
  const { createTenant, isLoading, error } = useCreateTenant();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
    logoUrl: "",
  });

  const [pendingLogoFile, setPendingLogoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let logoUrl = formData.logoUrl;

      // Upload logo if pending
      if (pendingLogoFile) {
        const uploadResponse = await uploadService.uploadImage(
          pendingLogoFile,
          "tenants",
        );
        logoUrl = uploadResponse.imageUrl;
      }

      await createTenant({ ...formData, logoUrl });
      onSuccess();
      onClose();

      // Reset
      setFormData({
        name: "",
        address: "",
        phone: "",
        description: "",
        logoUrl: "",
      });
      setPendingLogoFile(null);
    } catch (err) {
      // Error handled by hook
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buat Bisnis Baru">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Nama Bisnis <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            placeholder="Contoh: Kopi Kenangan Indah"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nomor Telepon
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+62..."
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none mb-2 block">
              Logo Bisnis{" "}
              <span className="text-gray-400 text-xs">(Opsional)</span>
            </label>
            <LogoUploader
              currentLogoUrl={formData.logoUrl}
              onFileSelect={(file) => setPendingLogoFile(file)}
              isUploading={isLoading || isUploading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="address"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Alamat <span className="text-gray-400 text-xs">(Opsional)</span>
          </label>
          <Input
            id="address"
            placeholder="Jl. Sudirman No..."
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Deskripsi Singkat{" "}
            <span className="text-gray-400 text-xs">(Opsional)</span>
          </label>
          <Input
            id="description"
            placeholder="Cabang utama..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-border mt-6">
          <Button
            type="submit"
            disabled={isLoading || isUploading}
            className="w-full sm:w-auto"
          >
            {isLoading || isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isUploading ? "Mengupload..." : "Membuat Bisnis"}
              </>
            ) : (
              "Buat Bisnis"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
