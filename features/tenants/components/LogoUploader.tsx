"use client";

import { useRef, useState, useEffect } from "react";
import { Building2, ImagePlus, X } from "lucide-react";

interface LogoUploaderProps {
  currentLogoUrl?: string | null;
  onFileSelect: (file: File | null) => void;
  isUploading?: boolean;
}

export function LogoUploader({
  currentLogoUrl,
  onFileSelect,
  isUploading = false,
}: LogoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hasNewFile, setHasNewFile] = useState(false);

  useEffect(() => {
    if (!hasNewFile) {
      setPreview(currentLogoUrl || null);
    }
  }, [currentLogoUrl, hasNewFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Silahkan pilih file gambar (JPG, PNG, dll)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setHasNewFile(true);
    };
    reader.readAsDataURL(file);

    onFileSelect(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setHasNewFile(false);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-start gap-6">
      <div className="relative group">
        <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
          {preview ? (
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
        {hasNewFile && (
          <p className="text-xs text-amber-600 mt-2">
            Klik simpan untuk mengunggah logo baru
          </p>
        )}
      </div>
    </div>
  );
}
