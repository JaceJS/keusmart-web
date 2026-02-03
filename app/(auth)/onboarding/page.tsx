"use client";

import { useSearchParams } from "next/navigation";
import { OnboardingForm } from "@/features/auth/components/OnboardingForm";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <OnboardingForm email={email} initialName={name} />
      </div>
    </div>
  );
}
