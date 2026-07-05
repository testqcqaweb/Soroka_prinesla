import { SITE } from "@/lib/content/portfolio";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-padding border-t"
      style={{ borderColor: "var(--palette-border)" }}
    >
      <div className="container-wide">
        <div
          className="relative overflow-hidden rounded-3xl border p-8 sm:p-12 lg:p-16"
          style={{
            background: "var(--cta-bg)",
            borderColor: "var(--feature-card-border)",
          }}
        >
          <div className="relative max-w-2xl">
            <p className="section-label" style={{ color: "var(--cta-title-text)" }}>
              Контакт
            </p>
            <h2
              className="mt-4 text-3xl font-medium sm:text-5xl"
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "var(--cta-title-text)",
              }}
            >
              {SITE.fullName}
            </h2>
            <p className="mt-4" style={{ color: "var(--cta-desc-text)" }}>
              Напишите или позвоните — обсудим сценарий, поэтический проект, клип или продюсирование
              события.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-medium transition-colors hover:brightness-95"
                style={{
                  background: "var(--cta-button-bg)",
                  color: "var(--cta-button-text)",
                }}
              >
                {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-medium transition-colors hover:brightness-95"
                style={{
                  background: "var(--cta-button-bg)",
                  color: "var(--cta-button-text)",
                  borderColor: "var(--secondary-button-border)",
                }}
              >
                {SITE.phone}
              </a>
              <a
                href={SITE.social.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-medium transition-colors hover:brightness-95"
                style={{
                  background: "var(--cta-button-bg)",
                  color: "var(--cta-button-text)",
                  borderColor: "var(--secondary-button-border)",
                }}
              >
                Telegram
              </a>
              <a
                href={SITE.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-medium transition-colors hover:brightness-95"
                style={{
                  background: "var(--cta-button-bg)",
                  color: "var(--cta-button-text)",
                  borderColor: "var(--secondary-button-border)",
                }}
              >
                Instagram
              </a>
            </div>

            <p className="mt-6 text-xs" style={{ color: "var(--cta-desc-text)" }}>
              {SITE.social.telegram.label} · {SITE.social.instagram.label}
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--cta-desc-text)" }}>
              {SITE.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
