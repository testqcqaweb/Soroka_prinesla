import { SITE } from "@/lib/content/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="section-padding border-t border-white/8">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--santa-crimson)]/25 bg-gradient-to-br from-[var(--santa-charcoal-soft)] to-[var(--santa-ink)] p-8 sm:p-12 lg:p-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--santa-crimson)" }}
            aria-hidden
          />

          <div className="relative max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[var(--santa-crimson)]">
              Контакт
            </p>
            <h2
              className="mt-4 text-3xl font-medium text-[var(--santa-cream)] sm:text-5xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {SITE.fullName}
            </h2>
            <p className="mt-4 text-[var(--santa-muted)]">
              Напишите или позвоните — обсудим сценарий, поэтический проект, клип или продюсирование
              события.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--santa-crimson)] px-6 py-3.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-[var(--santa-crimson-dark)]"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-white/5"
              >
                {SITE.phone}
              </a>
              <a
                href={SITE.social.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-white/5"
              >
                Telegram
              </a>
              <a
                href={SITE.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-white/5"
              >
                Instagram
              </a>
            </div>

            <p className="mt-6 text-xs text-[var(--santa-muted)]">
              {SITE.social.telegram.label} · {SITE.social.instagram.label}
            </p>
            <p className="mt-2 text-sm text-[var(--santa-muted)]">{SITE.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
