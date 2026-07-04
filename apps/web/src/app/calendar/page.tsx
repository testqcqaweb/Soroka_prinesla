import { AppShell } from "@/components/layout/app-shell";

export default function CalendarPage() {
  return (
    <AppShell>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Календарь</h1>
        <p className="text-[var(--santa-muted)]">
          Дедлайны и встречи по всем проектам — в следующей итерации.
        </p>
      </div>
    </AppShell>
  );
}
