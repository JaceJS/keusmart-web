import { Button } from "@/app/components/ui/Button";
import { Container } from "@/app/components/ui/Container";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { APP_NAME } from "@/app/lib/constants";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-primary-light/30 to-secondary"></div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Siap Kelola Keuangan Lebih Smart?
          </h2>

          <p className="mb-8 text-lg text-text-secondary sm:text-xl">
            Bergabung dengan ribuan UMKM yang sudah merasakan kemudahan
            mengelola keuangan dengan {APP_NAME}. Mulai dari{" "}
            <span className="font-semibold text-primary">Rp39.000/bulan</span>.
          </p>

          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="group w-full sm:w-auto">
              Coba Gratis 14 Hari
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Lihat Semua Paket
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>14 hari gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Tanpa kartu kredit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Batalkan kapan saja</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
