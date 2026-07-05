import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[var(--santa-charcoal-soft)]">
      <div className="container-wide section-padding flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-sm text-[var(--santa-muted)]">
          © {year} {BRAND.name} — портфолио продюсера и сценариста
        </p>
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--santa-crimson)]">
          Santa Prod.
        </p>
      </div>
    </footer>
  );
}
