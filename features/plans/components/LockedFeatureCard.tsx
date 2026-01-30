"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

interface LockedFeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export function LockedFeatureCard({
  title,
  icon,
  description,
  ctaText = "Upgrade Paket",
  ctaHref = "/settings/billing",
}: LockedFeatureCardProps) {
  return (
    <Card className="p-6 h-full flex flex-col items-center justify-center text-center">
      {/* Blurred title */}
      <p className="text-sm text-gray-300 blur-[2px] select-none mb-4">
        {title}
      </p>

      {/* Lock icon */}
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Lock className="h-5 w-5 text-gray-400" />
      </div>

      {/* Feature icon and title */}
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-6 max-w-[240px]">{description}</p>

      {/* CTA Button */}
      <Link href={ctaHref}>
        <Button variant="primary" size="sm">
          {ctaText}
        </Button>
      </Link>
    </Card>
  );
}
