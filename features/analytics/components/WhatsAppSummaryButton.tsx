"use client";

import { useState } from "react";
import { MessageCircle, Send, Check } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface WhatsAppSummaryButtonProps {
  period: string;
}

export function WhatsAppSummaryButton({ period }: WhatsAppSummaryButtonProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendSummary = async () => {
    setIsSending(true);

    // Simulate API call - in production, this would call backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSending(false);
    setIsSent(true);

    setTimeout(() => setIsSent(false), 3000);
  };

  const getPeriodLabel = () => {
    switch (period) {
      case "today":
        return "Hari Ini";
      case "week":
        return "Minggu Ini";
      case "month":
        return "Bulan Ini";
      case "year":
        return "Tahun Ini";
      default:
        return period;
    }
  };

  if (isSent) {
    return (
      <Button variant="secondary" size="sm" disabled className="gap-2">
        <Check className="h-4 w-4 text-emerald-500" />
        Terkirim!
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleSendSummary}
      disabled={isSending}
      className="gap-2"
    >
      {isSending ? (
        <>
          <Send className="h-4 w-4 animate-pulse" />
          Mengirim...
        </>
      ) : (
        <>
          <MessageCircle className="h-4 w-4" />
          Kirim ke WA
        </>
      )}
    </Button>
  );
}
