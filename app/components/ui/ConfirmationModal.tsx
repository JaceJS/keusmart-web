"use client";

import { useEffect, useRef } from "react";
import { LogOut, AlertTriangle, Info } from "lucide-react";
import { createPortal } from "react-dom";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  variant = "danger",
  isLoading = false,
}: ConfirmationModalProps) {
  useEffect(() => {
    // Prevent scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <LogOut className="w-6 h-6 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-amber-500" />;
      case "info":
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case "danger":
        return "bg-red-500 hover:bg-red-600 shadow-red-200 text-white";
      case "warning":
        return "bg-amber-500 hover:bg-amber-600 shadow-amber-200 text-white";
      case "info":
      default:
        return "bg-blue-600 hover:bg-blue-700 shadow-blue-200 text-white";
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case "danger":
        return "bg-red-50";
      case "warning":
        return "bg-amber-50";
      case "info":
      default:
        return "bg-blue-50";
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-gray-100 animate-in zoom-in-95 duration-200"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-12 h-12 ${getIconBg()} rounded-full flex items-center justify-center mb-4`}
          >
            {getIcon()}
          </div>
          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-2 mb-6">{message}</p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg ${getButtonStyles()} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Memproses..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
