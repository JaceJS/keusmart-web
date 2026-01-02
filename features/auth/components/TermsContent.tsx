import { APP_NAME } from "@/app/lib/constants";

export function TermsContent() {
  return (
    <div className="space-y-4 text-text-secondary leading-relaxed">
      <p>
        Selamat datang di {APP_NAME}. Dengan mengakses atau menggunakan aplikasi
        kami, Anda setuju untuk terikat dengan syarat dan ketentuan ini.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-8">
        1. Penggunaan Layanan
      </h2>
      <p>
        Layanan ini disediakan untuk membantu pengelolaan keuangan bisnis Anda.
        Anda bertanggung jawab penuh atas akurasi data yang Anda masukkan ke
        dalam sistem.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-8">
        2. Akun Pengguna
      </h2>
      <p>
        Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun dan
        password Anda. Kami tidak bertanggung jawab atas kerugian yang timbul
        akibat kelalaian Anda dalam menjaga keamanan akun.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-8">
        3. Privasi Data
      </h2>
      <p>
        Kami sangat menghargai privasi Anda. Data keuangan Anda adalah milik
        Anda. Kami tidak akan menjual data Anda kepada pihak ketiga tanpa izin
        Anda. Detail lebih lengkap dapat dilihat di Kebijakan Privasi.
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
  );
}
