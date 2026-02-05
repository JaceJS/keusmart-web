"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/app/lib/utils";

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  action?: ToastAction;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  warning: (title: string, message?: string, action?: ToastAction) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_STYLES: Record<
  ToastType,
  { bg: string; border: string; icon: string; title: string }
> = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "bg-emerald-500 text-white",
    title: "text-emerald-600",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "bg-amber-500 text-white",
    title: "text-amber-600",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "bg-red-500 text-white",
    title: "text-red-600",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-500 text-white",
    title: "text-blue-600",
  },
};

const TOAST_ICONS: Record<ToastType, React.ElementType> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const TOAST_TITLES: Record<ToastType, string> = {
  success: "SUKSES",
  warning: "PERINGATAN",
  error: "ERROR",
  info: "INFO",
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const style = TOAST_STYLES[toast.type];
  const Icon = TOAST_ICONS[toast.type];

  // Enter animation
  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  }, [onRemove, toast.id]);

  React.useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(handleRemove, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleRemove]);

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-xl border p-4 shadow-lg backdrop-blur-sm",
        style.bg,
        style.border,
      )}
      style={{
        transform: isExiting
          ? "translateX(120%)"
          : isVisible
            ? "translateX(0)"
            : "translateX(120%)",
        opacity: isExiting ? 0 : isVisible ? 1 : 0,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
            style.icon,
          )}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wider",
              style.title,
            )}
          >
            {TOAST_TITLES[toast.type]}
          </p>
          <p className="text-sm font-semibold text-gray-900 mt-0.5">
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-sm text-gray-600 mt-0.5">{toast.message}</p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className={cn(
                "mt-3 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors",
                toast.type === "warning"
                  ? "bg-amber-500 hover:bg-amber-600"
                  : toast.type === "error"
                    ? "bg-red-500 hover:bg-red-600"
                    : toast.type === "success"
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-blue-500 hover:bg-blue-600",
              )}
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleRemove}
          className={cn(
            "p-1 rounded-lg transition-colors shrink-0 h-fit",
            style.title,
            "hover:bg-black/5",
          )}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message?: string) => {
      addToast({ type: "success", title, message });
    },
    [addToast],
  );

  const warning = useCallback(
    (title: string, message?: string, action?: ToastAction) => {
      addToast({
        type: "warning",
        title,
        message,
        action,
        duration: action ? 0 : 5000,
      });
    },
    [addToast],
  );

  const error = useCallback(
    (title: string, message?: string) => {
      addToast({ type: "error", title, message });
    },
    [addToast],
  );

  const info = useCallback(
    (title: string, message?: string) => {
      addToast({ type: "info", title, message });
    },
    [addToast],
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, warning, error, info }}
    >
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-100 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
