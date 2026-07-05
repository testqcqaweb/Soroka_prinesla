"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { AppShell } from "@/components/layout/app-shell";
import { SetupNotice } from "@/components/setup/setup-notice";
import { BRAND } from "@/lib/brand";
import { fetchProjects } from "@/lib/firestore/projects";
import type { ProjectWithScript } from "@/lib/types/database";

const statusLabels: Record<string, string> = {
  development: "Разработка",
  pre_production: "Препродакшн",
  production: "Производство",
  archived: "Архив",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(new Date(value));
}

export function DashboardPage() {
  const { user, configured, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<ProjectWithScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!configured || authLoading || !user) return;

    let cancelled = false;
    setLoading(true);

    fetchProjects(user.uid)
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Ошибка загрузки");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, configured, authLoading]);

  if (!configured) {
    return (
      <AppShell>
        <SetupNotice />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <section className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--santa-crimson)]">
            {BRAND.name}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--santa-cream)]">
            Дашборд
          </h1>
          <p className="max-w-2xl text-[var(--santa-muted)]">{BRAND.tagline}</p>
        </section>

        {error && (
          <p className="rounded-lg bg-[var(--santa-crimson)]/20 px-4 py-3 text-sm text-[var(--santa-cream)]">
            {error}
          </p>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Проекты" value={String(projects.length)} />
          <StatCard
            label="Версии сценариев"
            value={String(projects.filter((p) => p.version_number).length)}
          />
          <StatCard
            label="В разработке"
            value={String(projects.filter((p) => p.status === "development").length)}
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-medium">Проекты</h2>
            <Link
              href="/projects/new"
              className="text-sm text-[var(--santa-cream)]/70 transition-colors hover:text-[var(--santa-cream)]"
            >
              Создать проект →
            </Link>
          </div>

          {loading ? (
            <p className="text-sm text-[var(--santa-muted)]">Загрузка проектов…</p>
          ) : projects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/12 px-6 py-12 text-center">
              <p className="text-[var(--santa-muted)]">Пока нет проектов.</p>
              <Link
                href="/projects/new"
                className="mt-4 inline-block rounded-lg bg-[var(--santa-crimson)] px-4 py-2 text-sm font-medium text-[var(--santa-cream)]"
              >
                Создать первый проект
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}/overview`}
                  className="group rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5 transition-colors hover:border-[var(--santa-crimson)]/40"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-[var(--santa-cream)] group-hover:text-white">
                        {project.title}
                      </h3>
                      {project.logline && (
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--santa-muted)]">
                          {project.logline}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full bg-[var(--santa-crimson)]/15 px-2.5 py-0.5 text-xs text-[var(--santa-cream)]">
                      {statusLabels[project.status] ?? project.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-[var(--santa-muted)]">
                    {project.version_number && <span>Сценарий v{project.version_number}</span>}
                    <span>{formatDate(project.updated_at)}</span>
                  </div>
                </Link>
              ))}

              <Link
                href="/projects/new"
                className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-white/12 text-[var(--santa-muted)] transition-colors hover:border-[var(--santa-crimson)]/50 hover:text-[var(--santa-cream)]"
              >
                <span className="text-2xl leading-none">+</span>
                <span className="mt-2 text-sm">Новый проект</span>
              </Link>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] px-5 py-4">
      <p className="text-sm text-[var(--santa-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[var(--santa-cream)]">{value}</p>
    </div>
  );
}
