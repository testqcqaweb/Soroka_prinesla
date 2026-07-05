import { ABOUT } from "@/lib/content/portfolio";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-padding border-t"
      style={{ borderColor: "var(--palette-border)" }}
    >
      <div className="container-wide">
        <p className="section-label">Обо мне</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="space-y-5 text-lg leading-relaxed"
            style={{ color: "var(--feature-desc-color)" }}
          >
            {ABOUT.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {ABOUT.stats.map((stat) => (
              <div key={stat.label} className="feature-card p-5">
                <p
                  className="feature-card-title text-3xl font-medium"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {stat.value}
                </p>
                <p className="feature-card-desc mt-1 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3
            className="mb-4 text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--palette-title-color)" }}
          >
            Ключевые компетенции
          </h3>
          <div className="flex flex-wrap gap-2">
            {ABOUT.competencies.map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-4 py-1.5 text-sm font-medium"
                style={{
                  background: "var(--palette-card-bg)",
                  borderColor: "var(--palette-border)",
                  color: "var(--palette-label-color)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3
            className="mb-4 text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--palette-title-color)" }}
          >
            Языки
          </h3>
          <div className="flex flex-wrap gap-3">
            {ABOUT.languages.map(({ lang, level }) => (
              <span key={lang} className="text-sm" style={{ color: "var(--feature-desc-color)" }}>
                {lang}
                {level && (
                  <span className="ml-1" style={{ color: "var(--palette-desc-color)" }}>
                    ({level})
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs" style={{ color: "var(--palette-desc-color)" }}>
            {ABOUT.extra}
          </p>
        </div>
      </div>
    </section>
  );
}
