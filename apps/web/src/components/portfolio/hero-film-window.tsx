"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/asset-path";
import { HERO_FILM } from "@/lib/content/portfolio";

export function HeroFilmWindow() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay can be blocked until user interaction.
      });
    }
  }, []);

  return (
    <div className="animate-fade-up-delay-2 pointer-events-none absolute bottom-10 right-4 z-20 hidden w-[min(36vw,390px)] sm:block sm:right-8 lg:bottom-14 lg:right-10">
      <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[var(--brand-charcoal)] shadow-2xl shadow-black/55">
        <div className="relative aspect-[16/10]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={assetPath(HERO_FILM.src)}
            poster={assetPath(HERO_FILM.poster)}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={HERO_FILM.label}
          />
          <div className="vhs-window-overlay" aria-hidden />
        </div>
        <div className="absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-cream)]/75">
          <span className="text-[var(--brand-crimson)]">●</span> Play
        </div>
      </div>
    </div>
  );
}
