import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { BACKSTAGE } from "@/lib/content/portfolio";

export function BackstageReveal() {
  return (
    <section
      id="backstage-reveal"
      aria-label={BACKSTAGE.eyebrow}
      className="border-t border-white/8 bg-[var(--brand-charcoal)]"
    >
      <div className="section-padding pb-8 pt-16">
        <div className="container-wide">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[var(--brand-crimson)]">
            {BACKSTAGE.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-[var(--brand-cream)] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {BACKSTAGE.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--brand-muted)] sm:text-lg">
            {BACKSTAGE.description}
          </p>
        </div>
      </div>

      <div className="relative h-[min(45vh,380px)] w-full overflow-hidden sm:h-[min(52vh,460px)]">
        <Image
          src={assetPath(BACKSTAGE.image)}
          alt={BACKSTAGE.title}
          fill
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-[var(--brand-crimson)]/15 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal)] via-transparent to-[var(--brand-charcoal)]/40" />
      </div>
    </section>
  );
}
