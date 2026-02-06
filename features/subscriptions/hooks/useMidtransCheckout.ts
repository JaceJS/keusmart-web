"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { config } from "@/core/config";
import { subscriptionService } from "../services/subscription.service";
import { BillingCycle } from "../types/subscription.types";
import {
  CheckoutStatus,
  MidtransResult,
  MidtransCheckoutCallbacks,
} from "../types/midtrans.types";

interface UseMidtransCheckoutReturn {
  checkout: (planSlug: string, billingCycle: BillingCycle) => Promise<void>;
  status: CheckoutStatus;
  error: string | null;
  isLoading: boolean;
  reset: () => void;
}

export const useMidtransCheckout = (
  options: MidtransCheckoutCallbacks = {},
): UseMidtransCheckoutReturn => {
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const scriptLoadedRef = useRef(false);

  // Load Midtrans Snap script
  useEffect(() => {
    if (scriptLoadedRef.current || typeof window === "undefined") return;

    const snapUrl = config.midtrans.snapUrl;

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${snapUrl}"]`);
    if (existingScript) {
      scriptLoadedRef.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", config.midtrans.clientKey);
    script.async = true;

    script.onload = () => {
      scriptLoadedRef.current = true;
    };

    script.onerror = () => {
      console.error("Failed to load Midtrans Snap script");
    };

    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount to avoid reloading
    };
  }, []);

  const checkout = useCallback(
    async (planSlug: string, billingCycle: BillingCycle) => {
      setStatus("loading");
      setError(null);

      try {
        // Get Snap token from backend via service
        const response = await subscriptionService.createCheckout({
          planSlug,
          billingCycle,
        });

        // Wait for Snap to be ready
        if (!window.snap) {
          throw new Error("Midtrans Snap is not loaded");
        }

        // Open Snap popup
        window.snap.pay(response.snapToken, {
          onSuccess: (result: MidtransResult) => {
            setStatus("success");
            options.onSuccess?.(result);
          },
          onPending: (result: MidtransResult) => {
            setStatus("pending");
            options.onPending?.(result);
          },
          onError: (result: MidtransResult) => {
            setStatus("error");
            setError(result.status_message || "Payment failed");
            options.onError?.(result);
          },
          onClose: () => {
            // Only set to closed if not already success/pending
            setStatus((prev) => (prev === "loading" ? "closed" : prev));
            options.onClose?.();
          },
        });
      } catch (err) {
        setStatus("error");
        const message =
          err instanceof Error ? err.message : "Failed to start checkout";
        setError(message);
        console.error("Checkout error:", err);
      }
    },
    [options],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return {
    checkout,
    status,
    error,
    isLoading: status === "loading",
    reset,
  };
};
