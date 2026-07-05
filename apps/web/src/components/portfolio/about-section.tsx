import { ABOUT } from "@/lib/content/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="section-padding border-t border-white/8">
      <div className="container-wide">
        <SectionLabel>Обо мне</SectionLabel>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg leading-relaxed text-[var(--santa-cream)]/85">
            {ABOUT.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {ABOUT.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5"
              >
                <p
                  className="text-3xl font-medium text-[var(--santa-cream)]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[var(--santa-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {ABOUT.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-[var(--santa-ink)] px-4 py-1.5 text-sm text-[var(--santa-muted)]"
            >
              {skill}
            </span>
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
