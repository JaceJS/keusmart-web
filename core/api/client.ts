import { config } from "@/core/config";
import { logger } from "@/core/logger";

const API_BASE_URL = config.api.baseUrl;

interface ApiResponse<T = any> {
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ApiError {
  message: string;
  code?: string;
  details?: any;
  statusCode: number; // Keep this for internal use
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;

    // Build URL with query params
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    // Get token and tenantId from localStorage
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem(config.auth.tokenKey)
        : null;
    const tenantId =
      typeof window !== "undefined"
        ? localStorage.getItem(config.auth.tenantIdKey)
        : null;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    if (tenantId) {
      (headers as Record<string, string>)["x-tenant-id"] = tenantId;
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));

        // Simply throw the error, let the component handle it
        const error: ApiError = {
          message: errorBody.message || "An error occurred",
          code: errorBody.code,
          details: errorBody.details,
          statusCode: response.status,
        };
        throw error;
      }

      // Unwrap response
      const text = await response.text();
      const json: ApiResponse<T> = text
        ? JSON.parse(text)
        : { message: "", data: null as T };

      const data = json.data;
      return data;
    } catch (error) {
      // Minimal logging with custom logger
      const msg = error instanceof Error ? error.message : "Network error";
      logger.error(`[API Error] ${url} : ${msg}`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
