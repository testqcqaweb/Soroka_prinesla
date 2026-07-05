"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { AppShell } from "@/components/layout/app-shell";
import { ProjectShell } from "@/components/project/project-shell";
import { fetchUpcomingEvents } from "@/lib/firestore/calendar";
import { fetchProject } from "@/lib/firestore/projects";
import { countTasksByStatus } from "@/lib/firestore/tasks";
import { fetchCharacters, fetchBeats } from "@/lib/firestore/development";
import type { CalendarEvent, ProjectWithScript } from "@/lib/types/database";

const statusLabels: Record<string, string> = {
  development: "Разработка",
  pre_production: "Препродакшн",
  production: "Производство",
  archived: "Архив",
};

export function OverviewPageClient({ projectId }: { projectId: string }) {
  const { user } = useAuth();
  const [project, setProject] = useState<ProjectWithScript | null>(null);
  const [openTasks, setOpenTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [characters, setCharacters] = useState(0);
  const [beats, setBeats] = useState(0);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function load() {
      const [p, tasks, chars, beatList, upcoming] = await Promise.all([
        fetchProject(projectId, user!.uid),
        countTasksByStatus(projectId),
        fetchCharacters(projectId),
        fetchBeats(projectId),
        fetchUpcomingEvents(user!.uid, 5),
      ]);

      if (cancelled) return;
      setProject(p);
      setOpenTasks(tasks.open);
      setDoneTasks(tasks.done);
      setCharacters(chars.length);
      setBeats(beatList.length);
      setEvents(upcoming.filter((e) => e.project_id === projectId || !e.project_id));
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [projectId, user]);

  if (loading || !project) {
    return (
      <AppShell>
        <p className="text-[var(--santa-muted)]">Загрузка…</p>
      </AppShell>
    );
  }

  return (
    <ProjectShell projectId={projectId} projectTitle={project.title}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Сценарий" value={project.version_number ? `v${project.version_number}` : "—"} />
        <Stat label="Открытые задачи" value={String(openTasks)} />
        <Stat label="Персонажи" value={String(characters)} />
        <Stat label="Биты" value={String(beats)} />
      </div>

      {project.logline && (
        <section className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5">
          <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--santa-muted)]">
            Логлайн
          </h2>
          <p className="mt-2 text-[var(--santa-cream)]">{project.logline}</p>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Быстрые действия</h2>
            <span className="text-xs text-[var(--santa-muted)]">
              {statusLabels[project.status]}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionLink href={`/projects/${projectId}/script`} label="Сценарий" />
            <ActionLink href={`/projects/${projectId}/tasks`} label="Задачи" />
            <ActionLink href={`/projects/${projectId}/development`} label="Разработка" />
          </div>
          <p className="mt-4 text-sm text-[var(--santa-muted)]">
            Выполнено задач: {doneTasks}
          </p>
        </div>

        <div className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Ближайшие дедлайны</h2>
            <Link href="/calendar" className="text-xs text-[var(--santa-muted)] hover:text-[var(--santa-cream)]">
              Календарь →
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="text-sm text-[var(--santa-muted)]">Нет предстоящих событий</p>
          ) : (
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="text-sm">
                  <span className="text-[var(--santa-crimson)]">
                    {formatDate(event.start_at)}
                  </span>
                  <span className="mx-2 text-[var(--santa-muted)]">·</span>
                  <span className="text-[var(--santa-cream)]">{event.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </ProjectShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] px-5 py-4">
      <p className="text-sm text-[var(--santa-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ActionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-white/10 px-3 py-1.5 text-sm transition-colors hover:border-[var(--santa-crimson)]/50 hover:text-[var(--santa-cream)]"
    >
      {label}
    </Link>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(
    new Date(iso),
  );
}
