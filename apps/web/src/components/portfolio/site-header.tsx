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

  const navColor = scrolled ? "var(--header-desc-text)" : "var(--hero-title-color)";

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "var(--header-bg)",
              borderBottom: "1px solid var(--header-border)",
            }
          : undefined
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo size="sm" href="/" variant="wordmark" onDark={scrolled} />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: navColor }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-primary hidden px-4 py-2 md:inline-flex">
          Связаться
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
          style={{
            borderColor: scrolled ? "var(--header-border)" : "var(--secondary-button-border)",
            color: navColor,
          }}
          aria-label="Меню"
        >
          <span className="text-lg">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <nav
          className="border-t px-4 py-4 md:hidden"
          style={{
            background: "var(--header-bg)",
            borderColor: "var(--header-border)",
          }}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--header-desc-text)" }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 block px-3 py-2 text-center"
          >
            Связаться
          </a>
        </nav>
      )}
    </header>
  );
}
