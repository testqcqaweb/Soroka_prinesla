"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { AppHeader } from "@/components/layout/app-header";
import { ScriptEditor } from "@/components/script/script-editor";
import { SetupNotice } from "@/components/setup/setup-notice";
import { fetchScriptEditorData } from "@/lib/firestore/projects";
import type { ScriptEditorData } from "@/lib/types/database";

export function ScriptPageClient({ projectId }: { projectId: string }) {
  const { user, configured, loading: authLoading } = useAuth();
  const [data, setData] = useState<ScriptEditorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!configured || authLoading || !user) return;

    let cancelled = false;
    setLoading(true);

    fetchScriptEditorData(projectId, user.uid)
      .then((result) => {
        if (!cancelled) {
          if (!result) setError("Проект не найден");
          else setData(result);
        }
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
  }, [projectId, user, configured, authLoading, reloadKey]);

  if (!configured) {
    return (
      <div className="min-h-full bg-[var(--santa-charcoal)]">
        <AppHeader />
        <div className="mx-auto max-w-3xl px-4 py-8">
          <SetupNotice />
        </div>
      </div>
    );
  }

  if (loading || authLoading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[var(--santa-charcoal)] text-[var(--santa-muted)]">
        Загрузка сценария…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-full bg-[var(--santa-charcoal)]">
        <AppHeader />
        <div className="mx-auto max-w-3xl px-4 py-8 text-[var(--santa-cream)]">
          {error ?? "Проект не найден"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[var(--santa-charcoal)] text-[var(--santa-cream)]">
      <AppHeader />
      <ScriptEditor data={data} onReload={() => setReloadKey((k) => k + 1)} />
    </div>
  );
}
