import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { EXPERIENCE } from "@/lib/content/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding border-t border-white/8">
      <div className="container-wide">
        <SectionLabel>Опыт</SectionLabel>
        <h2
          className="mt-4 max-w-xl text-3xl font-medium text-[var(--brand-cream)] sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Управление и организация
        </h2>

        <div className="mt-12 space-y-4">
          {EXPERIENCE.map((item) => (
            <article
              key={`${item.place}-${item.period}`}
              className="overflow-hidden rounded-2xl border border-white/8 bg-[var(--brand-charcoal-soft)]"
            >
              {item.image && (
                <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[2.4/1]">
                  <Image
                    src={assetPath(item.image)}
                    alt={`${item.title} · ${item.place}`}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 1152px, 100vw"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal-soft)] via-transparent to-transparent opacity-90" />
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-lg font-medium text-[var(--brand-cream)]">{item.title}</h3>
                    <p className="mt-1 text-sm text-[var(--brand-crimson)]">{item.place}</p>
                  </div>
                  {item.period && (
                    <span className="shrink-0 text-sm text-[var(--brand-muted)]">{item.period}</span>
                  )}
                </div>
                <ul className="mt-4 space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-[var(--brand-muted)]">
                      <span className="text-[var(--brand-crimson)]">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
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
