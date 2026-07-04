import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";

const projectNav = [
  { slug: "overview", label: "Обзор" },
  { slug: "script", label: "Сценарий" },
  { slug: "development", label: "Разработка" },
  { slug: "tasks", label: "Задачи" },
  { slug: "files", label: "Файлы" },
] as const;

type PageProps = {
  params: Promise<{ id: string; section: string }>;
};

export default async function ProjectSectionPage({ params }: PageProps) {
  const { id, section } = await params;
  const current = projectNav.find((item) => item.slug === section);
  if (!current) notFound();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="space-y-3">
          <Link
            href="/"
            className="text-sm text-[var(--santa-muted)] transition-colors hover:text-[var(--santa-cream)]"
          >
            ← Все проекты
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Новый сценарий</h1>
          <nav className="flex flex-wrap gap-2">
            {projectNav.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${id}/${item.slug}`}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  item.slug === section
                    ? "bg-[var(--santa-crimson)] text-[var(--santa-cream)]"
                    : "bg-white/5 text-[var(--santa-muted)] hover:text-[var(--santa-cream)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-8 text-[var(--santa-muted)]">
          Раздел «{current.label}» для проекта #{id} — заготовка под модуль варианта A.
        </div>
      </div>
    </AppShell>
  );
}
