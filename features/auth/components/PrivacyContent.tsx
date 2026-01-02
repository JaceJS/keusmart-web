import { APP_NAME } from "@/app/lib/constants";

export function PrivacyContent() {
  return (
    <div className="space-y-4 text-text-secondary leading-relaxed">
      <p>
        Di {APP_NAME}, privasi Anda adalah prioritas kami. Kebijakan ini
        menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi
        informasi pribadi Anda.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-8">
        1. Informasi yang Kami Kumpulkan
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Informasi Akun: Nama, alamat email, dan nomor telepon.</li>
        <li>
          Data Bisnis: Transaksi keuangan, data pelanggan, dan inventaris yang
          Anda masukkan.
        </li>
        <li>
          Data Penggunaan: Log aktivitas dan interaksi dengan aplikasi untuk
          peningkatan layanan.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground mt-8">
        2. Penggunaan Informasi
      </h2>
      <p>Kami menggunakan informasi Anda untuk:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Menyediakan dan memelihara layanan operasional {APP_NAME}.</li>
        <li>Memberikan analisis dan laporan keuangan untuk bisnis Anda.</li>
        <li>Mengirimkan pembaruan sistem dan notifikasi penting.</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground mt-8">
        3. Keamanan Data
      </h2>
      <p>
        Kami menerapkan standar keamanan industri untuk melindungi data Anda
        dari akses yang tidak sah. Semua data sensitif dienkripsi saat transmisi
        dan penyimpanan.
      </p>
    </div>
  );
}
