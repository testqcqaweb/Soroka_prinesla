import { WORK, type WorkItem } from "@/lib/content/portfolio";

export function WorkSection() {
  const featured = WORK.filter((w) => w.featured);
  const rest = WORK.filter((w) => !w.featured);

  return (
    <section
      id="work"
      className="section-padding border-t"
      style={{
        borderColor: "var(--palette-border)",
        background: "color-mix(in srgb, var(--color-1) 12%, var(--main-bg))",
      }}
    >
      <div className="container-wide">
        <p className="section-label">Творческие проекты</p>
        <h2
          className="mt-4 max-w-2xl text-3xl font-medium leading-tight sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif", color: "var(--feature-title-color)" }}
        >
          Избранные творческие проекты
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featured.map((item, index) => (
            <article
              key={item.slug}
              className={`feature-card group relative overflow-hidden p-8 transition-all hover:shadow-xl ${
                index === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "var(--feature-icon-bg)" }}
                    >
                      {item.type} · {item.year}
                    </p>
                    <h3
                      className="feature-card-title mt-2 text-2xl font-medium"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className="shrink-0 rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider"
                    style={{
                      borderColor: "var(--feature-card-border)",
                      color: "var(--feature-title-text-color)",
                      background: "color-mix(in srgb, var(--feature-icon-bg) 25%, transparent)",
                    }}
                  >
                    {item.role}
                  </span>
                </div>
                <p className="feature-card-desc mt-4 leading-relaxed">{item.description}</p>
                <ProjectLinks item={item} />
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        background: "var(--feature-icon-bg)",
                        color: "var(--palette-label-color)",
                      }}
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
              <article key={item.slug} className="feature-card p-6 transition-shadow hover:shadow-lg">
                <p className="text-xs" style={{ color: "var(--feature-icon-bg)" }}>
                  {item.type} · {item.year}
                </p>
                <h3 className="feature-card-title mt-1 font-medium">{item.title}</h3>
                <p className="feature-card-desc mt-2 line-clamp-2 text-sm">{item.description}</p>
                <ProjectLinks item={item} compact />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectLinks({ item, compact }: { item: WorkItem; compact?: boolean }) {
  if (item.videoUrl) {
    return (
      <a
        href={item.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex font-medium hover:underline ${compact ? "mt-3 text-xs" : "mt-4 text-sm"}`}
        style={{ color: "var(--feature-icon-bg)" }}
      >
        Смотреть на YouTube →
      </a>
    );
  }

  if (item.tags.includes("VHS")) {
    return (
      <p className={`feature-card-desc opacity-80 ${compact ? "mt-3 text-xs" : "mt-4 text-sm"}`}>
        Видео скоро на YouTube
      </p>
    );
  }

  return null;
}
