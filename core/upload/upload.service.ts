import { apiClient, ApiResponse } from "@/core/api/client";
import { UPLOAD_ENDPOINTS } from "./upload.endpoints";
import type {
  UploadFolder,
  UploadResponse,
  MultiUploadResponse,
} from "./upload.types";

export const uploadService = {
  uploadImage: async (
    file: File,
    folder: UploadFolder = "products",
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.postFormData<ApiResponse<UploadResponse>>(
      `${UPLOAD_ENDPOINTS.IMAGE}?folder=${folder}`,
      formData,
    );

    return response.data;
  },

  uploadImages: async (
    files: File[],
    folder: UploadFolder = "products",
  ): Promise<MultiUploadResponse> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await apiClient.postFormData<
      ApiResponse<MultiUploadResponse>
    >(`${UPLOAD_ENDPOINTS.IMAGES}?folder=${folder}`, formData);

    return response.data;
  },
};
