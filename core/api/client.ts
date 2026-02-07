import Cookies from "js-cookie";
import { config } from "@/core/config";
import { AUTH_ENDPOINTS } from "@/features/auth/auth.endpoints";
import { planConfigUtils } from "@/features/auth/utils/planConfig.utils";

const API_BASE_URL = config.api.baseUrl;

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data: T;
  meta?: PaginatedMeta;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}

export class ApiError extends Error {
  code?: string;
  details?: any;
  statusCode: number;

  constructor(
    message: string,
    statusCode: number,
    code?: string,
    details?: any,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Main request method
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options.params);
    const headers = this.getHeaders(options);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const isAuthEndpoint =
        endpoint === AUTH_ENDPOINTS.LOGIN ||
        endpoint === AUTH_ENDPOINTS.REFRESH ||
        endpoint === AUTH_ENDPOINTS.REGISTER;

      if (response.status === 401 && !isAuthEndpoint) {
        return this.handleUnauthorized<T>(endpoint, options);
      }

      return this.unwrapResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Helper: Build URL with query params
   */
  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): string {
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }
    return url;
  }

  /**
   * Helper: Prepare headers with Tokens
   */
  private getHeaders(options: RequestOptions, isFormData = false): HeadersInit {
    const token = Cookies.get(config.auth.tokenKey);
    const tenantId = Cookies.get(config.auth.tenantIdKey);

    const headers: Record<string, string> = {};

    // Don't set Content-Type for FormData - browser sets it with boundary
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (tenantId) {
      headers["x-tenant-id"] = tenantId;
    }

    // Merge with any custom headers from options
    return { ...headers, ...(options.headers as Record<string, string>) };
  }

  /**
   * Helper: Handle 401 Unauthorized (Refresh Token Logic)
   */
  private async handleUnauthorized<T>(
    endpoint: string,
    options: RequestOptions,
  ): Promise<T> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      })
        .then(() => this.request<T>(endpoint, options))
        .catch((err) => {
          throw err;
        });
    }

    this.isRefreshing = true;

    try {
      const newAccessToken = await this.refreshAccessToken();

      Cookies.set(config.auth.tokenKey, newAccessToken, { expires: 1 });
      this.processQueue(null, newAccessToken);

      return this.request<T>(endpoint, options);
    } catch (error) {
      console.error("[ApiClient] Token refresh failed:", error);
      this.processQueue(error, null);
      this.handleLogout();
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Helper: Execute Refresh Token Request
   */
  private async refreshAccessToken(): Promise<string> {
    // HttpOnly cookie is automatically sent by browser because of credentials: "include"
    const response = await fetch(`${this.baseUrl}${AUTH_ENDPOINTS.REFRESH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const json = await response.json();
    const newAccessToken = json.data?.accessToken || json.accessToken;

    if (!newAccessToken) {
      throw new Error("Invalid refresh response structure");
    }

    const refreshData = json.data || json;
    if (refreshData.tenant?.planConfig) {
      planConfigUtils.save(refreshData.tenant.planConfig);
    }

    return newAccessToken;
  }

  /**
   * Helper: Process Queue of suspended requests
   */
  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  /**
   * Helper: Clean up invalid session
   */
  private handleLogout() {
    Cookies.remove(config.auth.tokenKey);
    Cookies.remove(config.auth.tenantIdKey);
    planConfigUtils.remove();
    // Note: Do not remove refreshToken cookie client-side (HttpOnly)
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  /**
   * Helper: Unwrap API Response and handle errors
   * Returns full response object with data and meta for pagination support
   */
  private async unwrapResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));

      // Handle 403 subscription expired (freeze mode)
      if (
        response.status === 403 &&
        errorBody.code === "SUBSCRIPTION_EXPIRED"
      ) {
        if (typeof window !== "undefined") {
          window.location.href = "/settings/billing?expired=true";
        }
      }

      throw new ApiError(
        errorBody.message || "An error occurred",
        response.status,
        errorBody.code,
        errorBody.details,
      );
    }

    const text = await response.text();
    const json: ApiResponse<T> = text
      ? JSON.parse(text)
      : { message: "", data: null as T };

    // Return full response for paginated endpoints, just data for others
    // Using 'as T' to maintain type safety while allowing flexible response handling
    return json as unknown as T;
  }

  // --- Public Public Methods ---

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async postFormData<T>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions,
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const headers = this.getHeaders(options || {}, true);

    const response = await fetch(url, {
      ...options,
      method: "POST",
      headers,
      body: formData,
    });

    if (response.status === 401) {
      return this.handleUnauthorized<T>(endpoint, {
        ...options,
        method: "POST",
        body: formData as unknown as BodyInit,
      });
    }

    return this.unwrapResponse<T>(response);
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
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

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
