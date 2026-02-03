"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OnboardingForm } from "@/features/auth/components/OnboardingForm";
import type { GetOnboardingDataResponse } from "@/features/auth/types/auth.types";
import { SessionError } from "./components/SessionError";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [userData, setUserData] = useState<GetOnboardingDataResponse | null>(
    null,
  );
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 1. Check for token
    if (!token) {
      router.replace("/login");
      return;
    }

    // 2. Retrieve user data from session
    const stored = sessionStorage.getItem("onboarding_user");
    if (stored) {
      try {
        setUserData(JSON.parse(stored));
      } catch (e) {}
    }

    setIsChecking(false);
  }, [token, router]);

  if (isChecking) {
    return null;
  }

  if (!userData) {
    return <SessionError />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <OnboardingForm
          email={userData.email}
          initialName={userData.name}
          token={token || undefined}
        />
      </div>
    </div>
  );
}
