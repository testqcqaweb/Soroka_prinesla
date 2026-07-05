import { EXPERIENCE } from "@/lib/content/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding border-t border-white/8">
      <div className="container-wide">
        <SectionLabel>Опыт</SectionLabel>
        <h2
          className="mt-4 max-w-xl text-3xl font-medium text-[var(--santa-cream)] sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Управление и организация
        </h2>

        <div className="mt-12 space-y-4">
          {EXPERIENCE.map((item) => (
            <article
              key={`${item.place}-${item.period}`}
              className="rounded-2xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-6 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-lg font-medium text-[var(--santa-cream)]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--santa-crimson)]">{item.place}</p>
                </div>
                <span className="shrink-0 text-sm text-[var(--santa-muted)]">{item.period}</span>
              </div>
              <ul className="mt-4 space-y-1.5">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-[var(--santa-muted)]">
                    <span className="text-[var(--santa-crimson)]">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
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
