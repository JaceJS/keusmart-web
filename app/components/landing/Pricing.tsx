import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Container } from "@/app/components/ui/Container";
import { Check, X } from "lucide-react";
import { cn } from "@/app/lib/utils";
import {
  PLANS,
  FEATURE_COMPARISON,
  formatPlanPrice,
} from "@/features/plans/constants/plans";

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-4 w-4 text-emerald-600" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
        <X className="h-4 w-4 text-gray-400" />
      </div>
    );
  }
  return <span className="text-sm font-medium text-foreground">{value}</span>;
}

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-24 bg-gray-50">
      <Container>
        <div className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              🎁 Coba Gratis 14 Hari
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Pilih Paket yang Tepat untuk Bisnis Anda
          </h2>
        </div>

        {/* Plan Cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col p-6",
                plan.isPopular && "border-2 border-primary shadow-xl",
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-white shadow-lg">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-3 h-3 rounded-full", plan.color)} />
                <h3 className="text-2xl font-bold text-foreground">
                  {plan.displayName}
                </h3>
              </div>

              <p className="text-sm text-text-secondary mb-6">
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="mb-1">
                  <span className="text-2xl font-bold text-foreground">
                    Rp {formatPlanPrice(plan.price)}
                  </span>
                  <span className="text-sm">/bulan</span>
                </div>
              </div>

              <Link href="/login?mode=register" className="mt-auto">
                <Button
                  variant={plan.isPopular ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                >
                  Coba Gratis 14 Hari
                </Button>
              </Link>
              <p className="mt-3 text-center text-xs text-text-secondary">
                Tanpa kartu kredit • Bisa cancel kapan saja
              </p>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Fitur
                  </th>
                  {PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      className="px-6 py-4 text-center text-sm font-semibold text-foreground"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className={cn("w-2.5 h-2.5 rounded-full", plan.color)}
                        />
                        {plan.displayName}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {FEATURE_COMPARISON.map((feature, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm text-text-secondary">
                      {feature.name}
                    </td>
                    {PLANS.map((plan) => (
                      <td key={plan.id} className="px-6 py-3 text-center">
                        <div className="flex justify-center">
                          <FeatureValue value={feature.getValue(plan)} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-text-secondary">
          Semua paket sudah termasuk update gratis dan keamanan data terjamin.
        </p>
      </Container>
    </section>
  );
}
