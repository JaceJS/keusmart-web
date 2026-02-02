"use client";

import { useSearchParams } from "next/navigation";
import { OnboardingForm } from "@/features/auth/components/OnboardingForm";
import { APP_NAME } from "@/app/lib/constants";
import Link from "next/link";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          {APP_NAME}
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <OnboardingForm email={email} initialName={name} />
      </div>
    </div>
  );
}
