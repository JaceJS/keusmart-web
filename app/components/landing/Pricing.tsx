import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Container } from "@/app/components/ui/container";
import { Check } from "lucide-react";
import { cn } from "@/app/lib/utils";

const plans = [
  {
    name: "Gratis",
    price: "0",
    period: "/bulan",
    description: "Untuk UMKM yang baru memulai",
    features: [
      "1 tenant/bisnis",
      "Catat transaksi unlimited",
      "Laporan dasar (PDF)",
      "Dashboard real-time",
      "Support email",
    ],
    cta: "Mulai Gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "70.000",
    period: "/bulan",
    description: "Untuk UMKM yang sedang berkembang",
    features: [
      "Semua fitur Gratis",
      "3 tenant/bisnis",
      "WhatsApp notifications",
      "AI analytics & insights",
      "Export Excel/CSV",
      "Priority support",
    ],
    cta: "Pilih Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Untuk bisnis dengan kebutuhan khusus",
    features: [
      "Semua fitur Pro",
      "Unlimited tenants",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Custom integration",
    ],
    cta: "Hubungi Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-24">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Harga Transparan, Tanpa Biaya Tersembunyi
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Upgrade atau downgrade kapan saja.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col",
                plan.popular && "border-2 border-primary shadow-xl"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-white shadow-lg">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  {plan.price !== "Custom" && (
                    <span className="text-lg font-medium text-text-secondary">Rp</span>
                  )}
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-text-secondary">{plan.period}</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.popular ? "primary" : "secondary"}
                size="lg"
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-text-secondary">
          Semua paket sudah termasuk update gratis dan keamanan data terjamin.
        </p>
      </Container>
    </section>
  );
}
