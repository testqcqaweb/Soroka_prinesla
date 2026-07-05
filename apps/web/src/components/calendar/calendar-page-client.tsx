"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { AppShell } from "@/components/layout/app-shell";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  fetchCalendarEvents,
} from "@/lib/firestore/calendar";
import { fetchProjects } from "@/lib/firestore/projects";
import type { CalendarEvent, CalendarEventType, ProjectWithScript } from "@/lib/types/database";

const typeLabels: Record<CalendarEventType, string> = {
  deadline: "Дедлайн",
  meeting: "Встреча",
  milestone: "Веха",
  other: "Другое",
};

export function CalendarPageClient() {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [projects, setProjects] = useState<ProjectWithScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<CalendarEventType>("deadline");
  const [projectId, setProjectId] = useState("");

  async function reload() {
    if (!user) return;
    const [ev, pr] = await Promise.all([
      fetchCalendarEvents(user.uid),
      fetchProjects(user.uid),
    ]);
    setEvents(ev);
    setProjects(pr);
  }

  useEffect(() => {
    if (!user) return;
    void reload().finally(() => setLoading(false));
  }, [user]);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    if (!user || !title.trim() || !date) return;

    const project = projects.find((p) => p.id === projectId);
    await createCalendarEvent(user.uid, {
      title: title.trim(),
      type,
      start_at: new Date(date).toISOString(),
      project_id: projectId || null,
      project_title: project?.title ?? null,
    });
    setTitle("");
    setDate("");
    setProjectId("");
    await reload();
  }

  const grouped = groupByMonth(events);

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Календарь</h1>
          <p className="mt-1 text-[var(--santa-muted)]">Дедлайны и события по всем проектам</p>
        </div>

        <form
          onSubmit={handleCreate}
          className="grid gap-3 rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Событие"
            className="rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none lg:col-span-2"
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as CalendarEventType)}
            className="rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none"
          >
            {Object.entries(typeLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none"
          >
            <option value="">Без проекта</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-[var(--santa-crimson)] px-4 py-2 text-sm font-medium text-[var(--santa-cream)] sm:col-span-2 lg:col-span-5"
          >
            Добавить событие
          </button>
        </form>

        {loading ? (
          <p className="text-[var(--santa-muted)]">Загрузка…</p>
        ) : events.length === 0 ? (
          <p className="text-[var(--santa-muted)]">Пока нет событий</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([month, monthEvents]) => (
              <section key={month}>
                <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--santa-muted)]">
                  {month}
                </h2>
                <ul className="space-y-2">
                  {monthEvents.map((event) => (
                    <li
                      key={event.id}
                      className="flex items-center justify-between rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] px-4 py-3"
                    >
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-[var(--santa-muted)]">
                          {formatDateTime(event.start_at)} · {typeLabels[event.type]}
                          {event.project_title ? ` · ${event.project_title}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          await deleteCalendarEvent(event.id);
                          await reload();
                        }}
                        className="text-xs text-[var(--santa-crimson)] hover:underline"
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function groupByMonth(events: CalendarEvent[]) {
  return events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    const month = new Intl.DateTimeFormat("ru-RU", {
      month: "long",
      year: "numeric",
    }).format(new Date(event.start_at));
    acc[month] = acc[month] ?? [];
    acc[month].push(event);
    return acc;
  }, {});
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
