"use client";

import Image from "next/image";
import { useState } from "react";
import { assetPath } from "@/lib/asset-path";

type WorkGalleryCarouselProps = {
  images: string[];
  title: string;
  variant: "featured" | "compact";
};

export function WorkGalleryCarousel({ images, title, variant }: WorkGalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const isFeatured = variant === "featured";
  const hasMultiple = images.length > 1;

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
  };

  return (
    <div
      className={`relative overflow-hidden bg-[var(--brand-ink)] ${
        isFeatured ? "aspect-[16/10] w-full" : "aspect-[2/1] w-full"
      }`}
    >
      <Image
        src={assetPath(images[index])}
        alt={`${title} — фото ${index + 1}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        sizes={isFeatured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
        unoptimized
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-charcoal-soft)] via-transparent to-transparent opacity-80" />

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Предыдущее фото"
            className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-[var(--brand-charcoal)]/80 text-[var(--brand-cream)] backdrop-blur-sm transition-colors hover:border-[var(--brand-crimson)]/50 hover:bg-[var(--brand-charcoal)] ${
              isFeatured ? "left-3 h-9 w-9 text-lg" : "left-2 h-7 w-7 text-sm"
            }`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Следующее фото"
            className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-[var(--brand-charcoal)]/80 text-[var(--brand-cream)] backdrop-blur-sm transition-colors hover:border-[var(--brand-crimson)]/50 hover:bg-[var(--brand-charcoal)] ${
              isFeatured ? "right-3 h-9 w-9 text-lg" : "right-2 h-7 w-7 text-sm"
            }`}
          >
            ›
          </button>
          <div
            className={`absolute left-1/2 z-10 flex -translate-x-1/2 gap-1.5 ${
              isFeatured ? "bottom-3" : "bottom-2"
            }`}
          >
            {images.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                onClick={() => goTo(imageIndex)}
                aria-label={`Показать фото ${imageIndex + 1}`}
                aria-current={imageIndex === index}
                className={`rounded-full transition-all ${
                  imageIndex === index
                    ? "h-2 w-5 bg-[var(--brand-crimson)]"
                    : "h-2 w-2 bg-white/35 hover:bg-white/55"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
