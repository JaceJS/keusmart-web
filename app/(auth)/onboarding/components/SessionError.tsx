"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export function SessionError() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 bg-card rounded-xl border border-border shadow-sm text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Sesi Berakhir
        </h2>
        <p className="text-text-secondary mb-8">
          Maaf, kami tidak dapat memverifikasi sesi login Anda. Mohon login
          ulang untuk melanjutkan.
        </p>
        <Button className="w-full" onClick={() => router.replace("/login")}>
          Kembali ke Login
        </Button>
      </div>
    </div>
  );
}
