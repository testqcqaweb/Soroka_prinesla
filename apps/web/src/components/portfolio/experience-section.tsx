import { EXPERIENCE } from "@/lib/content/portfolio";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-padding border-t"
      style={{ borderColor: "var(--palette-border)" }}
    >
      <div className="container-wide">
        <p className="section-label">Опыт</p>
        <h2
          className="mt-4 max-w-xl text-3xl font-medium sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif", color: "var(--feature-title-color)" }}
        >
          Управление и организация
        </h2>

        <div className="mt-12 space-y-4">
          {EXPERIENCE.map((item) => (
            <article key={`${item.place}-${item.period}`} className="feature-card">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="feature-card-title text-lg font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: "var(--feature-icon-bg)" }}>
                    {item.place}
                  </p>
                </div>
                <span className="feature-card-desc shrink-0 text-sm">{item.period}</span>
              </div>
              <ul className="mt-4 space-y-1.5">
                {item.points.map((point) => (
                  <li key={point} className="feature-card-desc flex gap-2 text-sm">
                    <span style={{ color: "var(--feature-icon-bg)" }}>—</span>
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
