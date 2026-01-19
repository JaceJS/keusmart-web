import Cookies from "js-cookie";
import { config } from "@/core/config";
import { AUTH_ENDPOINTS } from "@/features/auth/auth.endpoints";

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
  statusCode: number;
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

      // Handle 401 Unauthorized (Token Expired)
      // Skip for Auth endpoints (Login should throw 401, Refresh should throw 401)
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
  private getHeaders(options: RequestOptions): HeadersInit {
    const token = Cookies.get(config.auth.tokenKey);
    const tenantId = Cookies.get(config.auth.tenantIdKey); // Get tenantId

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

    return headers;
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
    // Note: Do not remove refreshToken cookie client-side (HttpOnly)
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  /**
   * Helper: Unwrap API Response and handle errors
   */
  private async unwrapResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const error: ApiError = {
        message: errorBody.message || "An error occurred",
        code: errorBody.code,
        details: errorBody.details,
        statusCode: response.status,
      };
      throw error;
    }

    const text = await response.text();
    const json: ApiResponse<T> = text
      ? JSON.parse(text)
      : { message: "", data: null as T };

    return json.data;
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
}

export const apiClient = new ApiClient(API_BASE_URL);
