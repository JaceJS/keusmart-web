"use client";

import { ArrowLeft } from "lucide-react";
import {
  type RegisterStep,
  getRegisterStepTitle,
  getRegisterStepDescription,
} from "@/features/auth";

interface StepIndicatorProps {
  currentStep: RegisterStep;
  email: string;
  onBack: () => void;
}

export function StepIndicator({
  currentStep,
  email,
  onBack,
}: StepIndicatorProps) {
  return (
    <div className="space-y-4">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>
      )}

      <div className="flex items-center gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              step <= currentStep ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground">
          {getRegisterStepTitle(currentStep)}
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          {getRegisterStepDescription(currentStep, email)}
        </p>
      </div>
    </div>
  );
}
