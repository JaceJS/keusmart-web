"use client";

import { MoveLeft } from "lucide-react";
import { APP_NAME } from "@/app/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground">
            Syarat & Ketentuan
          </h1>
          <p className="text-text-secondary mt-2">
            Terakhir diperbarui:{" "}
            {new Date().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            Selamat datang di {APP_NAME}. Dengan mengakses atau menggunakan
            aplikasi kami, Anda setuju untuk terikat dengan syarat dan ketentuan
            ini.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            1. Penggunaan Layanan
          </h2>
          <p>
            Layanan ini disediakan untuk membantu pengelolaan keuangan bisnis
            Anda. Anda bertanggung jawab penuh atas akurasi data yang Anda
            masukkan ke dalam sistem.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            2. Akun Pengguna
          </h2>
          <p>
            Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun dan
            password Anda. Kami tidak bertanggung jawab atas kerugian yang
            timbul akibat kelalaian Anda dalam menjaga keamanan akun.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            3. Privasi Data
          </h2>
          <p>
            Kami sangat menghargai privasi Anda. Data keuangan Anda adalah milik
            Anda. Kami tidak akan menjual data Anda kepada pihak ketiga tanpa
            izin Anda. Detail lebih lengkap dapat dilihat di Kebijakan Privasi.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">
            4. Perubahan Layanan
          </h2>
          <p>
            Kami berhak untuk mengubah, menangguhkan, atau menghentikan layanan
            kapan saja dengan atau tanpa pemberitahuan sebelumnya, meskipun kami
            akan berusaha memberitahu pengguna tentang perubahan signifikan.
          </p>
        </div>
      </div>
    </div>
  );
}
