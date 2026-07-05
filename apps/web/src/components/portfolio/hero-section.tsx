import { Logo } from "@/components/brand/logo";
import { SITE } from "@/lib/content/portfolio";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--color-1) 35%, transparent), transparent 70%)",
        }}
      />

      <div
        className="absolute inset-x-0 top-1/3 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-3) 40%, transparent), transparent)",
        }}
      />

      <div className="container-wide section-padding relative z-10 w-full">
        <div className="animate-fade-up mb-6">
          <Logo href={null} variant="wordmark" size="lg" />
        </div>

        <h1
          className="animate-fade-up-delay-1 max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          <span className="text-gradient">{SITE.fullName}</span>
          <br />
          <span
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: "var(--hero-title-color)" }}
          >
            {SITE.role}
          </span>
        </h1>

        <p
          className="animate-fade-up-delay-2 mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--hero-desc-color)" }}
        >
          {SITE.headline}. {SITE.subheadline}
        </p>

        <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
          <a href="#work" className="btn-primary">
            Смотреть проекты
          </a>
          <a href="#contact" className="btn-secondary">
            Написать мне
          </a>
        </div>

        {SITE.available && (
          <div
            className="animate-fade-up-delay-2 mt-12 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
            style={{
              background: "var(--header-badge-bg)",
              borderColor: "var(--banner-border)",
              color: "var(--header-badge-text)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-3)", boxShadow: "0 0 8px color-mix(in srgb, var(--color-3) 60%, transparent)" }}
            />
            Открыт к новым проектам
          </div>
        )}
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: "var(--hero-desc-color)" }}
      >
        <a href="#about" className="text-xs uppercase tracking-widest" aria-label="Вниз">
          ↓
        </a>
      </div>
    </section>
  );
}
