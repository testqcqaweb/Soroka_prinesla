import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/content/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "var(--footer-border)",
        background: "var(--main-bg)",
      }}
    >
      <div className="container-wide flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-sm" style={{ color: "var(--footer-text)" }}>
          © {year} {SITE.fullName} · {BRAND.name}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a
            href={SITE.social.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-opacity hover:opacity-75"
            style={{ color: "var(--footer-link-color)" }}
          >
            Telegram
          </a>
          <a
            href={SITE.social.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-opacity hover:opacity-75"
            style={{ color: "var(--footer-link-color)" }}
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
