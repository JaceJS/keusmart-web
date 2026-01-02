import { Container } from "@/app/components/ui/Container";
import { UserPlus, FileText, Bell } from "lucide-react";
import { APP_NAME } from "@/app/lib/constants";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Daftar Gratis",
    description:
      "Buat akun dan atur informasi bisnis Anda dalam hitungan menit. Tidak perlu kartu kredit.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Catat Transaksi",
    description:
      "Input penjualan dan pengeluaran dengan mudah. Kelola produk, kategori, dan stok dalam satu tempat.",
  },
  {
    number: "03",
    icon: Bell,
    title: "Terima Insight",
    description:
      "Dapatkan laporan via WhatsApp dan rekomendasi AI untuk mengoptimalkan bisnis Anda.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary py-20 lg:py-24">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Mulai dalam 3 Langkah Mudah
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Tidak perlu keahlian khusus. Siapapun bisa langsung menggunakan{" "}
            {APP_NAME}.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-16 hidden h-0.5 w-full bg-primary/20 md:block" />
                )}

                <div className="space-y-6 text-center">
                  <div className="text-6xl font-bold text-primary">
                    {step.number}
                  </div>

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>

                  <p className="text-text-secondary">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
