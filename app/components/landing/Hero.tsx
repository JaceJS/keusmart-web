import { Button } from "@/app/components/ui/Button";
import { Container } from "@/app/components/ui/Container";
import { ArrowRight, BarChart3, MessageCircle, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8">
            <div className="inline-block rounded-full bg-primary-light px-4 py-1.5">
              <span className="text-sm font-medium text-primary-text">
                Solusi Keuangan untuk UMKM
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Kelola Keuangan UMKM Jadi Lebih{" "}
              <span className="text-primary">Mudah & Pintar</span>
            </h1>

            <p className="text-lg text-text-secondary sm:text-xl">
              Catat transaksi harian, terima laporan otomatis via WhatsApp, dan
              dapatkan insight AI untuk mengembangkan bisnis Anda.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="group">
                Mulai Gratis
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="secondary">
                Lihat Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Notifikasi WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span>AI Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <span>Dashboard Real-time</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary-light to-secondary p-8">
              <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              <div className="relative flex h-full flex-col justify-center space-y-4">
                <div className="rounded-xl bg-white p-4 shadow-lg">
                  <div className="mb-2 text-sm font-medium text-text-secondary">
                    Penjualan Hari Ini
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    Rp 2.450.000
                  </div>
                  <div className="mt-1 text-sm text-primary">
                    +18% dari kemarin
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-lg">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <div className="text-sm font-medium text-text-secondary">
                      AI Insight
                    </div>
                  </div>
                  <div className="text-sm text-foreground">
                    Stok "Kopi Arabica" menipis. Rekomendasi restock 20kg minggu
                    ini.
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-lg">
                  <div className="mb-2 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <div className="text-sm font-medium text-text-secondary">
                      WhatsApp Report
                    </div>
                  </div>
                  <div className="text-sm text-foreground">
                    Laporan harian dikirim setiap jam 20:00 WIB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
