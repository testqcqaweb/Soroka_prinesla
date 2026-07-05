import { SERVICES } from "@/lib/content/portfolio";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding border-t"
      style={{
        borderColor: "var(--palette-border)",
        background: "color-mix(in srgb, var(--color-3) 8%, var(--main-bg))",
      }}
    >
      <div className="container-wide">
        <p className="section-label">Услуги</p>
        <h2
          className="mt-4 max-w-xl text-3xl font-medium sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif", color: "var(--feature-title-color)" }}
        >
          Чем могу быть полезен
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <div key={service.title} className="feature-card relative p-8">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full font-mono text-lg font-semibold"
                style={{
                  background: "var(--feature-icon-bg)",
                  color: "var(--palette-label-color)",
                }}
              >
                0{index + 1}
              </span>
              <h3
                className="feature-card-title mt-4 text-xl font-medium"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {service.title}
              </h3>
              <p className="feature-card-desc mt-3 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
