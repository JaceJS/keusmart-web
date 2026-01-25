export type UploadFolder = "products" | "tenants" | "users";

export interface UploadParams {
  folder?: UploadFolder;
}

export interface UploadResponse {
  imageUrl: string;
  publicId: string;
}

export interface MultiUploadItem {
  imageUrl: string;
  publicId: string;
  sortOrder: number;
}

export type MultiUploadResponse = MultiUploadItem[];
