"use client";

import { LogOut } from "lucide-react";

interface UserProfileProps {
  name?: string;
  email?: string;
  onLogout: () => void;
}

export function UserProfile({ name, email, onLogout }: UserProfileProps) {
  const initials = name?.substring(0, 2) || "JD";

  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-primary-light to-secondary flex items-center justify-center text-primary-text font-semibold text-sm shadow-sm uppercase">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {name || "User"}
          </p>
          <p className="text-xs text-text-secondary truncate">{email}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-text-secondary text-xs font-medium hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Keluar
        </button>
      </div>
    </div>
  );
}
