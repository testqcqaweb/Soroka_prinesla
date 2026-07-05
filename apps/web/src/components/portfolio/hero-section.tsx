import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/content/portfolio";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--santa-crimson) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-[var(--santa-crimson)]/30 to-transparent" />

      <div className="container-wide section-padding relative z-10 w-full">
        <p className="animate-fade-up mb-6 text-sm font-medium uppercase tracking-[0.35em] text-[var(--santa-crimson)]">
          {BRAND.name}
        </p>

        <h1
          className="animate-fade-up-delay-1 max-w-4xl font-[family-name:var(--font-playfair)] text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          <span className="text-gradient">{SITE.name}</span>
          <br />
          <span className="text-[var(--santa-cream)]">{SITE.role}</span>
        </h1>

        <p className="animate-fade-up-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-[var(--santa-muted)] sm:text-xl">
          {SITE.headline}. {SITE.subheadline}
        </p>

        <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="rounded-xl bg-[var(--santa-crimson)] px-6 py-3 text-sm font-medium text-[var(--santa-cream)] transition-all hover:bg-[var(--santa-crimson-dark)] hover:shadow-lg hover:shadow-[var(--santa-crimson)]/20"
          >
            Смотреть работы
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:border-[var(--santa-crimson)]/50 hover:bg-white/5"
          >
            Написать мне
          </a>
        </div>

        {SITE.available && (
          <div className="animate-fade-up-delay-2 mt-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[var(--santa-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            Открыт к новым проектам
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[var(--santa-muted)]">
        <a href="#about" className="text-xs uppercase tracking-widest" aria-label="Вниз">
          ↓
        </a>
      </div>
    </section>
  );
}
