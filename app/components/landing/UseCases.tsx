import { Card } from "@/app/components/ui/card";
import { Container } from "@/app/components/ui/container";
import { Coffee, ShoppingBag, Package, Store } from "lucide-react";
import { APP_NAME } from "@/app/lib/constants";

const useCases = [
  {
    icon: Store,
    title: "Warung & Toko Kelontong",
    description: "Catat penjualan harian, kelola stok barang, dan pantau keuntungan dengan mudah.",
  },
  {
    icon: Coffee,
    title: "Café & Restoran",
    description: "Kelola menu, lacak stok bahan baku, dan analisa item terlaris.",
  },
  {
    icon: ShoppingBag,
    title: "Fashion & Retail",
    description: "Kelola produk dengan variasi ukuran/warna, lacak penjualan, dan prediksi permintaan.",
  },
  {
    icon: Package,
    title: "Distributor & Grosir",
    description: "Kelola banyak klien, transaksi massal, dan pelacakan inventori yang kompleks.",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="bg-secondary py-20 lg:py-24">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Cocok untuk Berbagai Jenis Bisnis
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Dari warung kecil hingga distributor, {APP_NAME} dapat disesuaikan dengan kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {useCase.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
