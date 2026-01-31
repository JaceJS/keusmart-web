"use client";

import { useState } from "react";
import { MessageCircle, Send, Check, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { useCanAccess, usePlan } from "@/features/plans";
import { LockedFeatureCard } from "@/features/plans/components/LockedFeatureCard";

interface WhatsAppSummaryCardProps {
  period: string;
}

export function WhatsAppSummaryCard({ period }: WhatsAppSummaryCardProps) {
  const hasAccess = useCanAccess("whatsappSummary");
  const { features } = usePlan();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!hasAccess) {
    return (
      <LockedFeatureCard
        title="WhatsApp Summary"
        icon={<MessageCircle className="h-5 w-5 text-emerald-500" />}
        description="Terima ringkasan penjualan harian otomatis langsung ke WhatsApp Anda."
      />
    );
  }

  const handleSendSummary = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  const isAdvanced = features.multiBranch;

  return (
    <Card className="p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-emerald-500 shrink-0" />
          <h3 className="font-semibold text-gray-900 text-sm">Ringkasan WA</h3>
        </div>
        {isAdvanced && (
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
            <Clock className="h-3 w-3" />
            Terjadwal
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-3 leading-relaxed">
        Laporan penjualan harian dikirim otomatis ke WhatsApp setiap jam{" "}
        <span className="font-medium text-gray-700">20:00 WIB</span>.
      </p>

      {/* Buttons - Stack vertically for narrow widths */}
      <div className="flex flex-col gap-2 mt-auto">
        {isAdvanced && (
          <Button variant="secondary" size="sm" className="w-full text-xs">
            Edit Jadwal
          </Button>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={handleSendSummary}
          disabled={isSending || isSent}
          className="w-full gap-1.5 text-xs"
        >
          {isSent ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Terkirim!
            </>
          ) : isSending ? (
            <>
              <Send className="h-3.5 w-3.5 animate-pulse" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              Kirim Sekarang
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
