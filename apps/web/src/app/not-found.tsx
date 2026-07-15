import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Кадр потерян",
  description: "Страница не найдена — сорока принесла не ту строку.",
};

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, color-mix(in srgb, var(--brand-crimson) 28%, transparent), transparent 72%)",
        }}
      />
      <div className="vhs-scanlines pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-wide section-padding relative z-10 w-full py-16 sm:py-24">
        <div className="animate-fade-up mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--brand-muted)] sm:text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-crimson)]/40 bg-[var(--brand-crimson)]/10 px-3 py-1 text-[var(--brand-crimson)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--brand-crimson)] shadow-[0_0_8px_var(--brand-crimson)]" />
            Rec
          </span>
          <span>00:04:04</span>
          <span className="hidden sm:inline">· сигнал потерян</span>
        </div>

        <p className="animate-fade-up mb-4 text-sm font-medium uppercase tracking-[0.35em] text-[var(--brand-crimson)]">
          Кадр не найден
        </p>

        <div className="animate-fade-up-delay-1 relative mb-8 max-w-4xl">
          <h1
            className="glitch-404 font-[family-name:var(--font-playfair)] text-[clamp(5.5rem,22vw,12rem)] font-medium leading-none tracking-tight text-[var(--brand-cream)]"
            data-text="404"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            404
          </h1>
          <p
            className="mt-2 max-w-xl text-2xl font-medium leading-tight text-[var(--brand-cream)]/90 sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Сорока принесла <span className="text-gradient">не ту страницу</span>
          </p>
        </div>

        <blockquote className="animate-fade-up-delay-2 max-w-lg border-l border-[var(--brand-crimson)]/50 pl-5 text-base leading-relaxed text-[var(--brand-muted)] sm:text-lg">
          Здесь должен был быть следующий кадр —
          <br />
          но между строками осталась только тишина.
          <br />
          <span className="mt-3 block text-sm text-[var(--brand-cream)]/55">
            Вернись на главную — и история продолжится.
          </span>
        </blockquote>

        <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-[var(--brand-crimson)] px-6 py-3 text-sm font-medium text-[var(--brand-cream)] transition-all hover:bg-[var(--brand-crimson-dark)] hover:shadow-lg hover:shadow-[var(--brand-crimson)]/20"
          >
            На главную →
          </Link>
          <Link
            href="/#work"
            className="rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-[var(--brand-cream)] transition-colors hover:border-[var(--brand-crimson)]/50 hover:bg-white/5"
          >
            Смотреть проекты
          </Link>
          <Logo href={null} variant="wordmark" size="sm" className="ml-1 opacity-70" />
        </div>
      </div>
    </section>
  );
}
