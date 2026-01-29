import { Container } from "@/app/components/ui/Container";
import { Mail, MessageCircle } from "lucide-react";
import {
  APP_NAME,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  CONTACT_WHATSAPP_NUMBER,
} from "@/app/lib/constants";

const footerLinks = [
  { name: "Fitur", href: "#features" },
  { name: "Harga", href: "#pricing" },
  { name: "Solusi", href: "#use-cases" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-linear-to-b from-white to-gray-50/50">
      <Container>
        {/* Main Footer */}
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
            <span className="text-xl font-bold text-primary">{APP_NAME}</span>
            <span className="text-sm text-text-secondary">
              Solusi keuangan pintar untuk UMKM Indonesia
            </span>
          </div>

          {/* Navigation & Contact */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              {footerLinks.map((link, index) => (
                <span key={link.name} className="flex items-center">
                  <a
                    href={link.href}
                    className="px-2 py-1 text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span className="text-border">·</span>
                  )}
                </span>
              ))}
            </nav>

            {/* Contact Links */}
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-gray-100 hover:text-primary"
                title="Email"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden lg:inline">{CONTACT_EMAIL}</span>
              </a>
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-gray-100 hover:text-primary"
                title="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden lg:inline">{CONTACT_WHATSAPP}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm">
            <a
              href="#"
              className="px-2 py-1 text-text-secondary transition-colors hover:text-primary"
            >
              Privacy Policy
            </a>
            <span className="text-border">·</span>
            <a
              href="#"
              className="px-2 py-1 text-text-secondary transition-colors hover:text-primary"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
