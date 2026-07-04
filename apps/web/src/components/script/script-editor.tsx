"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { SceneNav } from "@/components/script/scene-nav";
import {
  insertBlockAfter,
  normalizeBlocks,
  removeBlock,
  ScriptBlockRow,
} from "@/components/script/script-block-row";
import {
  loadScriptVersion,
  saveScriptBlocks,
  saveScriptVersion,
} from "@/lib/firestore/projects";
import type { ScriptEditorData } from "@/lib/types/database";
import type { ScriptBlock, ScriptBlockType } from "@/lib/types/database";

type ScriptEditorProps = {
  data: ScriptEditorData;
  onReload: () => void;
};

type SaveState = "idle" | "saving" | "saved" | "error";

export function ScriptEditor({ data, onReload }: ScriptEditorProps) {
  const { user } = useAuth();
  const [blocks, setBlocks] = useState<ScriptBlock[]>(data.blocks);
  const [versions, setVersions] = useState(data.versions);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [versionNumber, setVersionNumber] = useState(data.version.version_number);
  const [versionId, setVersionId] = useState(data.version.id);
  const [isSavingVersion, startVersionTransition] = useTransition();

  const blockRefs = useRef<Map<string, HTMLTextAreaElement>>(new Map());
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blocksRef = useRef(blocks);
  const isDirty = useRef(false);

  useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);

  useEffect(() => {
    setBlocks(data.blocks);
    setVersions(data.versions);
    setVersionId(data.version.id);
    setVersionNumber(data.version.version_number);
    isDirty.current = false;
    setSaveState("saved");
  }, [data]);

  const persistBlocks = useCallback(
    async (nextBlocks: ScriptBlock[]) => {
      setSaveState("saving");
      try {
        await saveScriptBlocks(
          data.project.id,
          data.script.id,
          versionId,
          nextBlocks.map((b) => ({
            id: b.id,
            sort_order: b.sort_order,
            type: b.type,
            content: b.content,
            scene_number: b.scene_number,
          })),
        );
        isDirty.current = false;
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    },
    [data.project.id, data.script.id, versionId],
  );

  const scheduleAutosave = useCallback(() => {
    isDirty.current = true;
    setSaveState("idle");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void persistBlocks(blocksRef.current);
    }, 2000);
  }, [persistBlocks]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  function updateBlocks(updater: (prev: ScriptBlock[]) => ScriptBlock[]) {
    setBlocks((prev) => {
      const next = updater(prev);
      blocksRef.current = next;
      scheduleAutosave();
      return next;
    });
  }

  function handleChange(id: string, content: string) {
    updateBlocks((prev) =>
      normalizeBlocks(prev.map((b) => (b.id === id ? { ...b, content } : b))),
    );
  }

  function handleTypeChange(id: string, type: ScriptBlockType) {
    updateBlocks((prev) =>
      normalizeBlocks(prev.map((b) => (b.id === id ? { ...b, type } : b))),
    );
  }

  function handleEnter(id: string) {
    const { blocks: next, newBlockId } = insertBlockAfter(blocksRef.current, id);
    blocksRef.current = next;
    setBlocks(next);
    scheduleAutosave();
    requestAnimationFrame(() => blockRefs.current.get(newBlockId)?.focus());
  }

  function handleBackspaceEmpty(id: string) {
    const { blocks: next, focusId } = removeBlock(blocksRef.current, id);
    if (focusId) {
      blocksRef.current = next;
      setBlocks(next);
      scheduleAutosave();
      requestAnimationFrame(() => blockRefs.current.get(focusId)?.focus());
    }
  }

  function scrollToBlock(blockId: string) {
    setActiveBlockId(blockId);
    document.getElementById(`block-${blockId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    blockRefs.current.get(blockId)?.focus();
  }

  function handleSaveVersion() {
    if (!user) return;

    startVersionTransition(async () => {
      const note = window.prompt("Комментарий к версии (необязательно):") ?? undefined;
      try {
        const result = await saveScriptVersion(
          data.project.id,
          data.script.id,
          user.uid,
          blocksRef.current.map((b) => ({
            id: b.id,
            sort_order: b.sort_order,
            type: b.type,
            content: b.content,
            scene_number: b.scene_number,
          })),
          note,
        );

        setVersionId(result.versionId);
        setVersionNumber(result.versionNumber);
        isDirty.current = false;
        setSaveState("saved");
        onReload();
      } catch {
        setSaveState("error");
      }
    });
  }

  function handleLoadVersion(targetVersionId: string) {
    if (isDirty.current && !window.confirm("Есть несохранённые изменения. Переключить версию?")) {
      return;
    }

    const target = versions.find((v) => v.id === targetVersionId);
    if (!target) return;

    startVersionTransition(async () => {
      try {
        await loadScriptVersion(
          data.project.id,
          data.script.id,
          targetVersionId,
          target.version_number,
        );
        onReload();
      } catch {
        setSaveState("error");
      }
    });
  }

  const saveLabel =
    saveState === "saving"
      ? "Сохранение…"
      : saveState === "saved"
        ? "Сохранено"
        : saveState === "error"
          ? "Ошибка"
          : isDirty.current
            ? "Изменения…"
            : "Автосохранение";

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3">
        <div className="min-w-0">
          <Link
            href="/"
            className="text-xs text-[var(--santa-muted)] transition-colors hover:text-[var(--santa-cream)]"
          >
            ← {data.project.title}
          </Link>
          <h1 className="truncate text-lg font-medium">Сценарий</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[var(--santa-muted)] sm:inline">{saveLabel}</span>

          <select
            value={versionId}
            onChange={(e) => handleLoadVersion(e.target.value)}
            className="rounded-lg border border-white/10 bg-[var(--santa-ink)] px-2 py-1.5 text-xs outline-none"
          >
            {versions.map((v) => (
              <option key={v.id} value={v.id}>
                v{v.version_number}
                {v.label ? ` — ${v.label}` : ""}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleSaveVersion}
            disabled={isSavingVersion}
            className="rounded-lg bg-[var(--santa-crimson)] px-3 py-1.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-[var(--santa-crimson-dark)] disabled:opacity-60"
          >
            Сохранить версию
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[240px_1fr]">
        <SceneNav
          blocks={blocks}
          activeBlockId={activeBlockId}
          onSelect={scrollToBlock}
        />

        <div className="overflow-y-auto px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-3xl font-mono text-sm">
            <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-[var(--santa-muted)]">
              {data.project.title} · v{versionNumber}
            </p>

            {blocks.map((block) => (
              <ScriptBlockRow
                key={block.id}
                block={block}
                onChange={handleChange}
                onTypeChange={handleTypeChange}
                onEnter={handleEnter}
                onBackspaceEmpty={handleBackspaceEmpty}
                onFocus={setActiveBlockId}
                registerRef={(id, el) => {
                  if (el) blockRefs.current.set(id, el);
                  else blockRefs.current.delete(id);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
