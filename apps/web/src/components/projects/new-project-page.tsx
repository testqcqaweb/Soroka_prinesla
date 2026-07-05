"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { AppShell } from "@/components/layout/app-shell";
import { SetupNotice } from "@/components/setup/setup-notice";
import { createProjectRecord } from "@/lib/firestore/projects";
import type { ProjectType } from "@/lib/types/database";

export function NewProjectPage() {
  const router = useRouter();
  const { user, configured } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!configured) {
    return (
      <AppShell>
        <SetupNotice />
      </AppShell>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const logline = String(formData.get("logline") ?? "").trim() || null;
    const type = String(formData.get("type") ?? "feature") as ProjectType;

    if (!title) {
      setError("Укажите название проекта");
      setLoading(false);
      return;
    }

    try {
      const { projectId } = await createProjectRecord(user.uid, { title, logline, type });
      router.push(`/projects/${projectId}/overview`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось создать проект");
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-lg space-y-6">
        <div className="space-y-2">
          <Link
            href="/"
            className="text-sm text-[var(--santa-muted)] transition-colors hover:text-[var(--santa-cream)]"
          >
            ← Назад к проектам
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Новый проект</h1>
          <p className="text-[var(--santa-muted)]">
            Создаст проект и пустой сценарий с первой сценой.
          </p>
        </div>

        {error && (
          <p className="rounded-lg bg-[var(--santa-crimson)]/20 px-4 py-3 text-sm text-[var(--santa-cream)]">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-6"
        >
          <Field label="Название" name="title" placeholder="Рабочее название фильма" required />
          <Field label="Логлайн" name="logline" placeholder="Одно предложение о сюжете" />
          <div className="space-y-1.5">
            <label htmlFor="type" className="text-sm text-[var(--santa-muted)]">
              Тип
            </label>
            <select
              id="type"
              name="type"
              className="w-full rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none focus:border-[var(--santa-crimson)]"
            >
              <option value="feature">Полнометражный фильм</option>
              <option value="short">Короткий метр</option>
              <option value="series">Сериал</option>
              <option value="pilot">Пилот</option>
              <option value="other">Другое</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--santa-crimson)] px-4 py-2.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-[var(--santa-crimson-dark)] disabled:opacity-60"
          >
            {loading ? "Создание…" : "Создать проект"}
          </button>
        </form>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm text-[var(--santa-muted)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none placeholder:text-[var(--santa-muted)]/60 focus:border-[var(--santa-crimson)]"
      />
    </div>
  );
}
