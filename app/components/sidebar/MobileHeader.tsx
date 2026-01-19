"use client";

import { Menu } from "lucide-react";

interface MobileHeaderProps {
  onOpenSidebar: () => void;
}

export function MobileHeader({ onOpenSidebar }: MobileHeaderProps) {
  return (
    <div className="md:hidden h-16 bg-white flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm/20">
      <button
        onClick={onOpenSidebar}
        className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors text-text-secondary"
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      <span className="font-bold text-lg text-primary tracking-tight absolute left-1/2 -translate-x-1/2">
        KeuSmart
      </span>
    </div>
  );
}
