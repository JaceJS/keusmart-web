export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "KeuSmart",
    env: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
  },
  auth: {
    tokenKey: "accessToken",
    refreshTokenKey: "refreshToken",
    tenantIdKey: "tenantId",
    planConfigKey: "planConfig",
  },
  midtrans: {
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
    snapUrl:
      process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL ||
      "https://app.sandbox.midtrans.com/snap/snap.js",
  },
} as const;
