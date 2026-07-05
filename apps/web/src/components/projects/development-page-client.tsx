"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { ProjectShell } from "@/components/project/project-shell";
import { fetchProject } from "@/lib/firestore/projects";
import {
  createBeat,
  createCharacter,
  deleteBeat,
  deleteCharacter,
  fetchBeats,
  fetchCharacters,
  fetchSynopsis,
  saveSynopsis,
  updateBeat,
  updateCharacter,
} from "@/lib/firestore/development";
import type { Beat, BeatAct, Character, Synopsis } from "@/lib/types/database";

export function DevelopmentPageClient({ projectId }: { projectId: string }) {
  const { user } = useAuth();
  const [projectTitle, setProjectTitle] = useState("");
  const [synopsis, setSynopsis] = useState<Synopsis | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function reload() {
    const [syn, chars, beatList] = await Promise.all([
      fetchSynopsis(projectId),
      fetchCharacters(projectId),
      fetchBeats(projectId),
    ]);
    setSynopsis(syn);
    setCharacters(chars);
    setBeats(beatList);
  }

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function load() {
      const project = await fetchProject(projectId, user!.uid);
      if (cancelled) return;
      setProjectTitle(project?.title ?? "Проект");
      await reload();
      if (!cancelled) setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [projectId, user]);

  async function handleSaveSynopsis() {
    if (!synopsis) return;
    setSaving(true);
    await saveSynopsis(projectId, {
      short_logline: synopsis.short_logline,
      extended_synopsis: synopsis.extended_synopsis,
      treatment: synopsis.treatment,
    });
    setSaving(false);
  }

  async function addCharacter() {
    const name = window.prompt("Имя персонажа:");
    if (!name?.trim()) return;
    await createCharacter(projectId, name);
    await reload();
  }

  async function addBeat() {
    const title = window.prompt("Название бита:");
    if (!title?.trim()) return;
    const act = Number(window.prompt("Акт (1, 2, 3):", "1") ?? "1") as BeatAct;
    await createBeat(projectId, { act: act === 2 || act === 3 ? act : 1, title });
    await reload();
  }

  if (loading || !synopsis) {
    return <p className="text-[var(--santa-muted)]">Загрузка…</p>;
  }

  return (
    <ProjectShell projectId={projectId} projectTitle={projectTitle}>
      <section className="space-y-4 rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5">
        <h2 className="font-medium">Синопсис</h2>
        <Field
          label="Короткий логлайн"
          value={synopsis.short_logline ?? ""}
          onChange={(v) => setSynopsis({ ...synopsis, short_logline: v || null })}
        />
        <TextArea
          label="Расширенный синопсис"
          value={synopsis.extended_synopsis ?? ""}
          onChange={(v) => setSynopsis({ ...synopsis, extended_synopsis: v || null })}
        />
        <TextArea
          label="Treatment"
          value={synopsis.treatment ?? ""}
          onChange={(v) => setSynopsis({ ...synopsis, treatment: v || null })}
          rows={6}
        />
        <button
          type="button"
          onClick={handleSaveSynopsis}
          disabled={saving}
          className="rounded-lg bg-[var(--santa-crimson)] px-4 py-2 text-sm font-medium text-[var(--santa-cream)] disabled:opacity-60"
        >
          {saving ? "Сохранение…" : "Сохранить синопсис"}
        </button>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Персонажи</h2>
            <button
              type="button"
              onClick={addCharacter}
              className="text-sm text-[var(--santa-crimson)] hover:underline"
            >
              + Добавить
            </button>
          </div>
          <ul className="space-y-3">
            {characters.map((char) => (
              <li key={char.id} className="rounded-lg border border-white/8 p-3">
                <input
                  value={char.name}
                  onChange={(e) =>
                    setCharacters((prev) =>
                      prev.map((c) => (c.id === char.id ? { ...c, name: e.target.value } : c)),
                    )
                  }
                  onBlur={() =>
                    updateCharacter(projectId, char.id, { name: char.name })
                  }
                  className="w-full bg-transparent font-medium outline-none"
                />
                <textarea
                  value={char.description ?? ""}
                  placeholder="Описание…"
                  onChange={(e) =>
                    setCharacters((prev) =>
                      prev.map((c) =>
                        c.id === char.id ? { ...c, description: e.target.value || null } : c,
                      ),
                    )
                  }
                  onBlur={() =>
                    updateCharacter(projectId, char.id, { description: char.description })
                  }
                  className="mt-2 w-full resize-none bg-transparent text-sm text-[var(--santa-muted)] outline-none"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={async () => {
                    await deleteCharacter(projectId, char.id);
                    await reload();
                  }}
                  className="mt-2 text-xs text-[var(--santa-crimson)]"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Beat sheet</h2>
            <button
              type="button"
              onClick={addBeat}
              className="text-sm text-[var(--santa-crimson)] hover:underline"
            >
              + Добавить
            </button>
          </div>
          <ul className="space-y-3">
            {beats.map((beat) => (
              <li key={beat.id} className="rounded-lg border border-white/8 p-3">
                <div className="flex items-center gap-2 text-xs text-[var(--santa-muted)]">
                  Акт {beat.act}
                </div>
                <input
                  value={beat.title}
                  onChange={(e) =>
                    setBeats((prev) =>
                      prev.map((b) => (b.id === beat.id ? { ...b, title: e.target.value } : b)),
                    )
                  }
                  onBlur={() => updateBeat(projectId, beat.id, { title: beat.title })}
                  className="mt-1 w-full bg-transparent font-medium outline-none"
                />
                <textarea
                  value={beat.description ?? ""}
                  placeholder="Описание бита…"
                  onChange={(e) =>
                    setBeats((prev) =>
                      prev.map((b) =>
                        b.id === beat.id ? { ...b, description: e.target.value || null } : b,
                      ),
                    )
                  }
                  onBlur={() =>
                    updateBeat(projectId, beat.id, { description: beat.description })
                  }
                  className="mt-2 w-full resize-none bg-transparent text-sm text-[var(--santa-muted)] outline-none"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={async () => {
                    await deleteBeat(projectId, beat.id);
                    await reload();
                  }}
                  className="mt-2 text-xs text-[var(--santa-crimson)]"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ProjectShell>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-[var(--santa-muted)]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none focus:border-[var(--santa-crimson)]"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-[var(--santa-muted)]">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none focus:border-[var(--santa-crimson)]"
      />
    </div>
  );
}
