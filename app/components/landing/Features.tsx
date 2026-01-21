import { Card } from "@/app/components/ui/Card";
import { Container } from "@/app/components/ui/Container";
import { MessageCircle, Sparkles, Store, TrendingUp } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "WhatsApp Otomatis",
    description:
      "Terima laporan penjualan harian, mingguan, dan bulanan langsung ke WhatsApp Anda. Pantau bisnis dari mana saja.",
  },
  {
    icon: Sparkles,
    title: "AI Insight Keuangan",
    description:
      "Analisa pola penjualan, prediksi stok, dan rekomendasi bisnis pintar menggunakan AI untuk keputusan lebih baik.",
  },
  {
    icon: Store,
    title: "Multi Tenant",
    description:
      "Kelola banyak toko atau tenant dalam satu dashboard terpusat. Cocok untuk bisnis yang sedang berkembang.",
  },
  {
    icon: TrendingUp,
    title: "Laporan Real-time",
    description:
      "Dashboard live dengan grafik penjualan, stok produk, dan cash flow. Export laporan kapan saja dalam format Excel atau PDF.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-24">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Fitur Lengkap untuk UMKM Modern
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Semua yang Anda butuhkan untuk mengelola keuangan bisnis dengan
            lebih efisien dan profesional.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group relative overflow-hidden">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
