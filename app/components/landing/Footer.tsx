import { Container } from "@/app/components/ui/container";
import { Mail, MessageCircle } from "lucide-react";
import { APP_NAME, CONTACT_EMAIL, CONTACT_WHATSAPP, CONTACT_WHATSAPP_NUMBER } from "@/app/lib/constants";

const footerLinks = {
  product: [
    { name: "Fitur", href: "#features" },
    { name: "Harga", href: "#pricing" },
    { name: "Solusi", href: "#use-cases" },
  ],
  company: [
    { name: "Tentang Kami", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Karir", href: "#" },
  ],
  resources: [
    { name: "Dokumentasi", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Support", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4 text-2xl font-bold text-primary">{APP_NAME}</div>
            <p className="mb-6 max-w-xs text-sm text-text-secondary">
              Solusi keuangan pintar untuk UMKM Indonesia. Kelola bisnis dengan lebih efisien dan profesional.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`} className="hover:text-primary">
                  {CONTACT_WHATSAPP}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Produk</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-text-secondary md:flex-row">
          <p>© 2025 {APP_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
