import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { TermsContent } from "@/features/auth/components/TermsContent";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-text-secondary hover:text-primary transition-colors"
        >
          <MoveLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>

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

        <TermsContent />
      </div>
    </div>
  );
}
