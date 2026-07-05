import { SERVICES } from "@/lib/content/portfolio";

export function ServicesSection() {
  return (
    <section id="services" className="section-padding border-t border-white/8">
      <div className="container-wide">
        <SectionLabel>Услуги</SectionLabel>
        <h2
          className="mt-4 max-w-xl text-3xl font-medium text-[var(--santa-cream)] sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Чем могу быть полезен
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="relative rounded-2xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-8"
            >
              <span className="font-mono text-4xl font-light text-[var(--santa-crimson)]/30">
                0{index + 1}
              </span>
              <h3
                className="mt-4 text-xl font-medium text-[var(--santa-cream)]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--santa-muted)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.35em] text-[var(--santa-crimson)]">
      {children}
    </p>
  );
}
