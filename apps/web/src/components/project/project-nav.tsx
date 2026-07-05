import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { slug: "overview", label: "Обзор", href: (id: string) => `/projects/${id}/overview` },
  { slug: "script", label: "Сценарий", href: (id: string) => `/projects/${id}/script` },
  { slug: "development", label: "Разработка", href: (id: string) => `/projects/${id}/development` },
  { slug: "tasks", label: "Задачи", href: (id: string) => `/projects/${id}/tasks` },
] as const;

export function ProjectNav({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-3 border-b border-white/8 pb-4">
      <Link
        href="/"
        className="text-sm text-[var(--santa-muted)] transition-colors hover:text-[var(--santa-cream)]"
      >
        ← Все проекты
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{projectTitle}</h1>
      <nav className="flex flex-wrap gap-2">
        {sections.map((item) => {
          const href = item.href(projectId);
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={item.slug}
              href={href}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-[var(--santa-crimson)] text-[var(--santa-cream)]"
                  : "bg-white/5 text-[var(--santa-muted)] hover:text-[var(--santa-cream)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
