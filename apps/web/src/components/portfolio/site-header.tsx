"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { NAV } from "@/lib/content/portfolio";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-[var(--santa-charcoal)]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo size="sm" href="/" variant="wordmark" />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm text-[var(--santa-cream)]/70 transition-colors hover:bg-white/5 hover:text-[var(--santa-cream)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-lg bg-[var(--santa-crimson)] px-4 py-2 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-[var(--santa-crimson-dark)] md:inline-flex"
        >
          Связаться
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 md:hidden"
          aria-label="Меню"
        >
          <span className="text-lg">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/8 bg-[var(--santa-charcoal)] px-4 py-4 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-[var(--santa-cream)]/80 hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-[var(--santa-crimson)] px-3 py-2 text-center text-sm font-medium text-[var(--santa-cream)]"
          >
            Связаться
          </a>
        </nav>
      )}
    </header>
  );
}
