"use client";

import type { ScriptBlock } from "@/lib/types/database";
import { getSceneHeadings } from "@/lib/script/constants";

type SceneNavProps = {
  blocks: ScriptBlock[];
  activeBlockId: string | null;
  onSelect: (blockId: string) => void;
};

export function SceneNav({ blocks, activeBlockId, onSelect }: SceneNavProps) {
  const scenes = getSceneHeadings(blocks);

  return (
    <aside className="flex h-full flex-col border-r border-white/8 bg-[var(--santa-charcoal-soft)]">
      <div className="border-b border-white/8 px-4 py-3">
        <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--santa-muted)]">
          Сцены
        </h2>
        <p className="mt-1 text-sm text-[var(--santa-cream)]">{scenes.length} сцен</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {scenes.length === 0 ? (
          <p className="px-2 py-4 text-xs text-[var(--santa-muted)]">
            Добавьте заголовок сцены (INT./EXT.)
          </p>
        ) : (
          <ul className="space-y-1">
            {scenes.map((scene) => (
              <li key={scene.id}>
                <button
                  type="button"
                  onClick={() => onSelect(scene.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeBlockId === scene.id
                      ? "bg-[var(--santa-crimson)]/20 text-[var(--santa-cream)]"
                      : "text-[var(--santa-muted)] hover:bg-white/5 hover:text-[var(--santa-cream)]"
                  }`}
                >
                  <span className="mr-2 text-xs text-[var(--santa-crimson)]">
                    {scene.sceneNumber}.
                  </span>
                  <span className="line-clamp-2">{scene.content}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
