import Image from "next/image";
import { WorkGalleryCarousel } from "@/components/portfolio/work-gallery-carousel";
import { assetPath, resolveLinkHref } from "@/lib/asset-path";
import { WORK, type WorkItem } from "@/lib/content/portfolio";

export function WorkSection() {
  const featured = WORK.filter((w) => w.featured);
  const rest = WORK.filter((w) => !w.featured);
  const withMedia = rest.filter(hasWorkMedia);
  const textOnly = rest.filter((w) => !hasWorkMedia(w));

  return (
    <section id="work" className="section-padding border-t border-white/8 bg-[var(--brand-charcoal-soft)]/50">
      <div className="container-wide">
        <SectionLabel>Творческие проекты</SectionLabel>
        <h2
          className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-[var(--brand-cream)] sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Избранные творческие проекты
        </h2>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {featured.map((item) => (
            <FeaturedCard key={item.slug} item={item} />
          ))}
        </div>

        {withMedia.length > 0 && (
          <div className="mt-6 grid items-start gap-4 sm:grid-cols-2">
            {withMedia.map((item) => (
              <MediaCard key={item.slug} item={item} />
            ))}
          </div>
        )}

        {textOnly.length > 0 && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {textOnly.map((item) => (
              <TextOnlyCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ item }: { item: WorkItem }) {
  return (
    <article className="group relative self-start overflow-hidden rounded-2xl border border-white/8 bg-[var(--brand-charcoal-soft)] transition-all hover:border-[var(--brand-crimson)]/40 hover:shadow-2xl hover:shadow-black/40">
      <WorkIllustration item={item} variant="featured" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--brand-crimson)]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--brand-crimson)]">
              {item.type}
              {item.year ? ` · ${item.year}` : ""}
            </p>
            <h3
              className="mt-2 text-2xl font-medium text-[var(--brand-cream)]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {item.title}
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--brand-muted)]">
            {item.role}
          </span>
        </div>
        <p className="mt-4 leading-relaxed text-[var(--brand-muted)]">{item.description}</p>
        <ProjectLinks item={item} />
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-white/5 px-2.5 py-0.5 text-xs text-[var(--brand-muted)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function MediaCard({ item }: { item: WorkItem }) {
  return (
    <article className="group self-start overflow-hidden rounded-xl border border-white/8 bg-[var(--brand-charcoal)] transition-colors hover:border-white/15">
      <WorkIllustration item={item} variant="compact" />
      <div className="p-5">
        <p className="text-xs text-[var(--brand-crimson)]">
          {item.type}
          {item.year ? ` · ${item.year}` : ""}
        </p>
        <h3 className="mt-1 font-medium text-[var(--brand-cream)]">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--brand-muted)]">{item.description}</p>
        <ProjectLinks item={item} compact />
      </div>
    </article>
  );
}

function TextOnlyCard({ item }: { item: WorkItem }) {
  return (
    <article className="rounded-xl border border-white/8 bg-[var(--brand-charcoal)]/80 px-4 py-4 transition-colors hover:border-white/15">
      <p className="text-[11px] text-[var(--brand-crimson)]">
        {item.type}
        {item.year ? ` · ${item.year}` : ""}
      </p>
      <h3 className="mt-1 text-sm font-medium text-[var(--brand-cream)]">{item.title}</h3>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--brand-muted)]">{item.description}</p>
      <ProjectLinks item={item} compact />
    </article>
  );
}

function hasWorkMedia(item: WorkItem): boolean {
  if (item.gallery && item.gallery.length > 0) return true;
  if (item.video) return true;
  if (item.image && !item.image.endsWith(".svg")) return true;
  return false;
}

function WorkIllustration({
  item,
  variant,
}: {
  item: WorkItem;
  variant: "featured" | "compact";
}) {
  if (!hasWorkMedia(item)) {
    return null;
  }

  const isFeatured = variant === "featured";

  if (item.gallery && item.gallery.length > 0 && !item.video) {
    return <WorkGalleryCarousel images={item.gallery} title={item.title} variant={variant} />;
  }

  return (
    <div
      className={`relative overflow-hidden bg-[var(--brand-ink)] ${
        isFeatured ? "aspect-[16/10] w-full" : "aspect-[2/1] w-full"
      }`}
    >
      {item.video ? (
        <video
          src={assetPath(item.video)}
          poster={item.image ? assetPath(item.image) : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          aria-label={`Видео проекта «${item.title}»`}
        />
      ) : item.image ? (
        <Image
          src={assetPath(item.image)}
          alt={`Иллюстрация проекта «${item.title}»`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes={isFeatured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
          unoptimized
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal-soft)] via-transparent to-transparent opacity-80" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.35em] text-[var(--brand-crimson)]">
      {children}
    </p>
  );
}

function ProjectLinks({ item, compact }: { item: WorkItem; compact?: boolean }) {
  if (item.links.length === 0) {
    return null;
  }

  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-2 ${compact ? "mt-2" : "mt-4"}`}>
      {item.links.map((link) => (
        <li key={`${item.slug}-${link.href}`}>
          <a
            href={resolveLinkHref(link.href)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-[var(--brand-crimson)] transition-colors hover:text-[var(--brand-cream)] hover:underline ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            {link.label}
            <span aria-hidden>→</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
