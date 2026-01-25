import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Container } from "@/app/components/ui/Container";
import { Check, X } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface PlanFeature {
  name: string;
  starter: boolean | string;
  growth: boolean | string;
  smart: boolean | string;
}

const features: PlanFeature[] = [
  { name: "Pencatatan Penjualan", starter: true, growth: true, smart: true },
  { name: "Pencatatan Pengeluaran", starter: true, growth: true, smart: true },
  {
    name: "Laporan Harian/Bulanan",
    starter: "Ringkas",
    growth: "Lengkap",
    smart: "Advanced",
  },
  {
    name: "Dashboard Ringkasan",
    starter: "Basic",
    growth: "Lengkap",
    smart: "Multi-cabang",
  },
  { name: "Export CSV / PDF", starter: false, growth: true, smart: true },
  { name: "WhatsApp Summary", starter: false, growth: true, smart: true },
  { name: "AI Insight", starter: false, growth: "Basic", smart: "Advanced" },
  { name: "Prediksi Stok (AI)", starter: false, growth: false, smart: true },
  {
    name: "Insight Lintas Cabang",
    starter: false,
    growth: false,
    smart: true,
  },
  {
    name: "Perbandingan Cabang",
    starter: false,
    growth: false,
    smart: true,
  },
  { name: "Priority Support", starter: false, growth: false, smart: true },
  {
    name: "Custom Role Permission",
    starter: false,
    growth: false,
    smart: true,
  },
  { name: "Backup Prioritas", starter: false, growth: false, smart: true },
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "39.000",
    period: "/bulan",
    description: "Untuk UMKM yang baru memulai",
    tenants: 1,
    users: 2,
    color: "bg-emerald-500",
    cta: "Mulai Starter",
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "79.000",
    period: "/bulan",
    description: "Untuk bisnis yang sedang berkembang",
    tenants: 2,
    users: 5,
    color: "bg-amber-500",
    cta: "Pilih Growth",
    popular: true,
  },
  {
    id: "smart",
    name: "Smart",
    price: "159.000",
    period: "/bulan",
    description: "Untuk bisnis multi-cabang",
    tenants: 5,
    users: 10,
    color: "bg-blue-500",
    cta: "Pilih Smart",
    popular: false,
  },
];

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
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Harga Transparan, Tanpa Biaya Tersembunyi
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Upgrade atau
            downgrade kapan saja.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col p-6",
                plan.popular && "border-2 border-primary shadow-xl",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-white shadow-lg">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-3 h-3 rounded-full", plan.color)} />
                <h3 className="text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
              </div>

              <p className="text-sm text-text-secondary mb-4">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-lg font-medium text-text-secondary">
                  Rp
                </span>
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-text-secondary">{plan.period}</span>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {plan.tenants}
                  </span>
                  <span className="text-text-secondary">Tenant (Cabang)</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {plan.users}
                  </span>
                  <span className="text-text-secondary">User</span>
                </p>
              </div>

              <Button
                variant={plan.popular ? "primary" : "secondary"}
                size="lg"
                className="w-full mt-auto"
              >
                {plan.cta}
              </Button>
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
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className="px-6 py-4 text-center text-sm font-semibold text-foreground"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className={cn("w-2.5 h-2.5 rounded-full", plan.color)}
                        />
                        {plan.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm text-text-secondary">
                      {feature.name}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center">
                        <FeatureValue value={feature.starter} />
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center">
                        <FeatureValue value={feature.growth} />
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center">
                        <FeatureValue value={feature.smart} />
                      </div>
                    </td>
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
