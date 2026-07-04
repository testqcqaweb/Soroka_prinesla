export function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-xl border border-[var(--santa-crimson)]/30 bg-[var(--santa-charcoal-soft)] p-6">
      <h2 className="text-lg font-medium text-[var(--santa-cream)]">Нужна настройка Supabase</h2>
      <p className="text-sm text-[var(--santa-muted)]">
        Скопируйте <code className="text-[var(--santa-cream)]">.env.example</code> в{" "}
        <code className="text-[var(--santa-cream)]">.env.local</code> и укажите ключи проекта.
        Затем выполните SQL-миграцию из{" "}
        <code className="text-[var(--santa-cream)]">supabase/migrations/001_phase1.sql</code>.
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--santa-muted)]">
        <li>Создайте проект на supabase.com</li>
        <li>Settings → API → скопируйте URL и anon key</li>
        <li>SQL Editor → вставьте миграцию и выполните</li>
        <li>Перезапустите <code className="text-[var(--santa-cream)]">npm run dev</code></li>
      </ol>
    </div>
  );
}
