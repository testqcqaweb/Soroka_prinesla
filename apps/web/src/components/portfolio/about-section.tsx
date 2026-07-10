import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { ABOUT } from "@/lib/content/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="section-padding border-t border-white/8">
      <div className="container-wide">
        <SectionLabel>Обо мне</SectionLabel>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg leading-relaxed text-[var(--brand-cream)]/85">
            {ABOUT.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {ABOUT.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/8 bg-[var(--brand-charcoal-soft)] p-5"
              >
                <p
                  className="text-3xl font-medium text-[var(--brand-cream)]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[var(--brand-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid items-center gap-8 overflow-hidden rounded-2xl border border-white/8 bg-[var(--brand-charcoal-soft)] lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[320px]">
            <Image
              src={assetPath(ABOUT.poeticEvenings.image)}
              alt={ABOUT.poeticEvenings.title}
              fill
              className="object-cover object-center grayscale contrast-[1.05]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--brand-charcoal-soft)]/80 lg:bg-gradient-to-l lg:from-transparent lg:to-[var(--brand-charcoal-soft)]/90" />
          </div>
          <div className="p-8 lg:py-10">
            <h3
              className="text-2xl font-medium leading-tight text-[var(--brand-cream)] sm:text-3xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {ABOUT.poeticEvenings.title}
            </h3>
            <p className="mt-4 leading-relaxed text-[var(--brand-muted)]">
              {ABOUT.poeticEvenings.description}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--brand-muted)]">
            Ключевые компетенции
          </h3>
          <div className="flex flex-wrap gap-2">
            {ABOUT.competencies.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-[var(--brand-ink)] px-4 py-1.5 text-sm text-[var(--brand-muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--brand-muted)]">
            Языки
          </h3>
          <div className="flex flex-wrap gap-3">
            {ABOUT.languages.map(({ lang, level }) => (
              <span
                key={lang}
                className="text-sm text-[var(--brand-cream)]/80"
              >
                {lang}
                {level && (
                  <span className="ml-1 text-[var(--brand-muted)]">({level})</span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--brand-muted)]">{ABOUT.extra}</p>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.35em] text-[var(--brand-crimson)]">
      {children}
    </p>
  );
}
