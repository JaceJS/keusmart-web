import { useState, useCallback } from "react";
import { uploadService } from "./upload.service";
import type {
  UploadFolder,
  UploadResponse,
  MultiUploadItem,
} from "./upload.types";

interface UseUploadOptions {
  folder?: UploadFolder;
  onSuccess?: (response: UploadResponse) => void;
  onError?: (error: Error) => void;
}

interface UseUploadReturn {
  upload: (file: File) => Promise<UploadResponse | null>;
  uploadMultiple: (files: File[]) => Promise<MultiUploadItem[] | null>;
  isUploading: boolean;
  error: string | null;
  reset: () => void;
}

export function useUpload(options: UseUploadOptions = {}): UseUploadReturn {
  const { folder = "products", onSuccess, onError } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File): Promise<UploadResponse | null> => {
      setIsUploading(true);
      setError(null);

      try {
        const response = await uploadService.uploadImage(file, folder);
        onSuccess?.(response);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Gagal mengupload file";
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onSuccess, onError],
  );

  const uploadMultiple = useCallback(
    async (files: File[]): Promise<MultiUploadItem[] | null> => {
      setIsUploading(true);
      setError(null);

      try {
        const response = await uploadService.uploadImages(files, folder);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Gagal mengupload files";
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onError],
  );

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return {
    upload,
    uploadMultiple,
    isUploading,
    error,
    reset,
  };
}
