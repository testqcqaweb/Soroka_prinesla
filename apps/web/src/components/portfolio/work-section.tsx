import { WORK } from "@/lib/content/portfolio";

export function WorkSection() {
  const featured = WORK.filter((w) => w.featured);
  const rest = WORK.filter((w) => !w.featured);

  return (
    <section id="work" className="section-padding border-t border-white/8 bg-[var(--santa-charcoal-soft)]/50">
      <div className="container-wide">
        <SectionLabel>Творческие проекты</SectionLabel>
        <h2
          className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-[var(--santa-cream)] sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Избранные творческие проекты
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featured.map((item, index) => (
            <article
              key={item.slug}
              className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-8 transition-all hover:border-[var(--santa-crimson)]/40 hover:shadow-2xl hover:shadow-black/40 ${
                index === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--santa-crimson)]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--santa-crimson)]">
                      {item.type} · {item.year}
                    </p>
                    <h3
                      className="mt-2 text-2xl font-medium text-[var(--santa-cream)]"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--santa-muted)]">
                    {item.role}
                  </span>
                </div>
                <p className="mt-4 text-[var(--santa-muted)] leading-relaxed">{item.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/5 px-2.5 py-0.5 text-xs text-[var(--santa-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {rest.map((item) => (
              <article
                key={item.slug}
                className="group rounded-xl border border-white/8 bg-[var(--santa-charcoal)] p-6 transition-colors hover:border-white/15"
              >
                <p className="text-xs text-[var(--santa-crimson)]">
                  {item.type} · {item.year}
                </p>
                <h3 className="mt-1 font-medium text-[var(--santa-cream)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--santa-muted)] line-clamp-2">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        )}
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
