"use client";

import type { AuthMode } from "@/features/auth";

interface AuthTabsProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export function AuthTabs({ mode, onModeChange }: AuthTabsProps) {
  return (
    <div className="flex rounded-lg bg-secondary p-1">
      <button
        type="button"
        onClick={() => onModeChange("login")}
        className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
          mode === "login"
            ? "bg-white text-foreground shadow-sm"
            : "text-text-secondary hover:text-foreground"
        }`}
      >
        Masuk
      </button>
      <button
        type="button"
        onClick={() => onModeChange("register")}
        className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
          mode === "register"
            ? "bg-white text-foreground shadow-sm"
            : "text-text-secondary hover:text-foreground"
        }`}
      >
        Buat Akun
      </button>
    </div>
  );
}
