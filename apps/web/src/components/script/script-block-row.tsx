"use client";

import type { ScriptBlock, ScriptBlockType } from "@/lib/types/database";
import {
  BLOCK_TYPE_SHORTCUTS,
  defaultBlockAfter,
  nextBlockType,
  renumberScenes,
} from "@/lib/script/constants";

const blockStyles: Record<ScriptBlockType, string> = {
  scene_heading:
    "uppercase font-semibold tracking-wide text-[var(--santa-cream)] placeholder:text-[var(--santa-muted)]/50",
  action: "text-[var(--santa-cream)]/90 leading-relaxed",
  character: "mx-auto max-w-md uppercase text-center font-medium tracking-wider",
  dialogue: "mx-auto max-w-lg text-center leading-relaxed",
  parenthetical: "mx-auto max-w-sm text-center text-[var(--santa-muted)] italic",
};

type ScriptBlockRowProps = {
  block: ScriptBlock;
  onChange: (id: string, content: string) => void;
  onTypeChange: (id: string, type: ScriptBlockType) => void;
  onEnter: (id: string) => void;
  onBackspaceEmpty: (id: string) => void;
  onFocus: (id: string) => void;
  registerRef: (id: string, el: HTMLTextAreaElement | null) => void;
};

export function ScriptBlockRow({
  block,
  onChange,
  onTypeChange,
  onEnter,
  onBackspaceEmpty,
  onFocus,
  registerRef,
}: ScriptBlockRowProps) {
  const isScene = block.type === "scene_heading";

  return (
    <div
      id={`block-${block.id}`}
      className="group relative grid grid-cols-[3rem_1fr] gap-3 py-1"
    >
      <div className="pt-2 text-right text-xs text-[var(--santa-muted)]/60">
        {isScene ? block.scene_number : ""}
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <select
            value={block.type}
            onChange={(e) => onTypeChange(block.id, e.target.value as ScriptBlockType)}
            className="rounded border border-white/10 bg-[var(--santa-ink)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--santa-muted)] outline-none"
          >
            {(Object.keys(BLOCK_TYPE_SHORTCUTS) as ScriptBlockType[]).map((type) => (
              <option key={type} value={type}>
                {BLOCK_TYPE_SHORTCUTS[type]}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-[var(--santa-muted)]/60">Tab — тип · Enter — новый блок</span>
        </div>

        <textarea
          ref={(el) => registerRef(block.id, el)}
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
          onFocus={() => onFocus(block.id)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              onTypeChange(block.id, nextBlockType(block.type));
            }
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onEnter(block.id);
            }
            if (e.key === "Backspace" && block.content === "") {
              e.preventDefault();
              onBackspaceEmpty(block.id);
            }
          }}
          rows={1}
          spellCheck={false}
          placeholder={placeholderFor(block.type)}
          className={`w-full resize-none overflow-hidden bg-transparent outline-none ${blockStyles[block.type]}`}
          style={{ fieldSizing: "content" } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

function placeholderFor(type: ScriptBlockType): string {
  switch (type) {
    case "scene_heading":
      return "INT. МЕСТО — ДЕНЬ";
    case "action":
      return "Описание действия…";
    case "character":
      return "ИМЯ ПЕРСОНАЖА";
    case "dialogue":
      return "Реплика…";
    case "parenthetical":
      return "(ремарка)";
  }
}

export function normalizeBlocks(blocks: ScriptBlock[]): ScriptBlock[] {
  const sceneMap = renumberScenes(blocks);
  return blocks.map((block, index) => ({
    ...block,
    sort_order: index,
    scene_number: sceneMap.get(block.id) ?? null,
  }));
}

export function insertBlockAfter(
  blocks: ScriptBlock[],
  afterId: string,
): { blocks: ScriptBlock[]; newBlockId: string } {
  const index = blocks.findIndex((b) => b.id === afterId);
  const current = blocks[index];
  const newBlock: ScriptBlock = {
    id: crypto.randomUUID(),
    version_id: current.version_id,
    sort_order: index + 1,
    type: defaultBlockAfter(current.type),
    content: "",
    scene_number: null,
  };

  const next = [...blocks];
  next.splice(index + 1, 0, newBlock);
  return { blocks: normalizeBlocks(next), newBlockId: newBlock.id };
}

export function removeBlock(
  blocks: ScriptBlock[],
  id: string,
): { blocks: ScriptBlock[]; focusId: string | null } {
  const index = blocks.findIndex((b) => b.id === id);
  if (index <= 0) return { blocks, focusId: null };

  const focusId = blocks[index - 1]?.id ?? null;
  const next = blocks.filter((b) => b.id !== id);
  return { blocks: normalizeBlocks(next), focusId };
}
