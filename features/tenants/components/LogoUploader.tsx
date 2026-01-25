"use client";

import { useRef, useState } from "react";
import { Building2, ImagePlus, Loader2, X } from "lucide-react";
import { uploadService } from "@/core/upload";

interface LogoUploaderProps {
  currentLogoUrl?: string | null;
  onUploadSuccess: (imageUrl: string) => void;
  onRemove: () => void;
}

export function LogoUploader({
  currentLogoUrl,
  onUploadSuccess,
  onRemove,
}: LogoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentLogoUrl || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Silakan pilih file gambar (JPG, PNG, dll)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const response = await uploadService.uploadImage(file, "tenants");
      onUploadSuccess(response.imageUrl);
    } catch (err) {
      console.error("Failed to upload logo:", err);
      alert("Gagal mengupload logo. Silakan coba lagi.");
      setPreview(currentLogoUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-start gap-6">
      <div className="relative group">
        <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-primary/40 animate-spin" />
          ) : preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Logo Bisnis"
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2 className="w-10 h-10 text-primary/40" />
          )}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          title="Upload Logo"
        >
          <ImagePlus className="w-4 h-4" />
        </button>

        {preview && !isUploading && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
            title="Hapus Logo"
          >
            <X className="w-3 h-3" />
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <div className="flex-1 pt-2">
        <h3 className="font-semibold text-gray-900">Logo Bisnis</h3>
        <p className="text-sm text-gray-500 mt-1">
          Upload logo bisnis Anda. Ukuran maksimal 5MB.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Format: JPG, PNG, WEBP, atau GIF
        </p>
      </div>
    </div>
  );
}
