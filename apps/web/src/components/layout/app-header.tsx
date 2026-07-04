"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Logo } from "@/components/brand/logo";
import { getClientAuth } from "@/lib/firebase/client";

const navItems = [
  { href: "/", label: "Проекты" },
  { href: "/calendar", label: "Календарь" },
] as const;

export function AppHeader() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut(getClientAuth());
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[var(--santa-charcoal)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Logo size="sm" />
          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm text-[var(--santa-cream)]/75 transition-colors hover:bg-white/5 hover:text-[var(--santa-cream)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/projects/new"
            className="rounded-lg bg-[var(--santa-crimson)] px-3 py-1.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-[var(--santa-crimson-dark)]"
          >
            + Проект
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[var(--santa-muted)] transition-colors hover:text-[var(--santa-cream)]"
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
}
