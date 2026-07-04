import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";

export default function NewProjectPage() {
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
            Форма создания проекта появится вместе с подключением базы данных.
          </p>
        </div>

        <form className="space-y-4 rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-6">
          <Field label="Название" placeholder="Рабочее название фильма" />
          <Field label="Логлайн" placeholder="Одно предложение о сюжете" />
          <div className="space-y-1.5">
            <label className="text-sm text-[var(--santa-muted)]">Тип</label>
            <select className="w-full rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none focus:border-[var(--santa-crimson)]">
              <option>Полнометражный фильм</option>
              <option>Короткий метр</option>
              <option>Сериал / пилот</option>
              <option>Другое</option>
            </select>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-[var(--santa-crimson)] px-4 py-2.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-[var(--santa-crimson-dark)]"
          >
            Создать проект
          </button>
        </form>
      </div>
    </AppShell>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-[var(--santa-muted)]">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none placeholder:text-[var(--santa-muted)]/60 focus:border-[var(--santa-crimson)]"
      />
    </div>
  );
}
