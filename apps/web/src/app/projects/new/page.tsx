import Link from "next/link";
import { createProjectFromForm } from "@/actions/projects";
import { AppShell } from "@/components/layout/app-shell";
import { SetupNotice } from "@/components/setup/setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function NewProjectPage() {
  if (!isSupabaseConfigured()) {
    return (
      <AppShell>
        <SetupNotice />
      </AppShell>
    );
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

        <form
          action={createProjectFromForm}
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
            className="w-full rounded-lg bg-[var(--santa-crimson)] px-4 py-2.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-[var(--santa-crimson-dark)]"
          >
            Создать проект
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
