import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/content/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[var(--brand-charcoal-soft)]">
      <div className="container-wide flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-sm text-[var(--brand-muted)]">
          © {year} {SITE.fullName} · {BRAND.name}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a
            href={SITE.social.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-cream)]"
          >
            Telegram
          </a>
          <a
            href={SITE.social.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-cream)]"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
