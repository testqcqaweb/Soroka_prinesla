import type { ScriptBlock, ScriptBlockType } from "@/lib/types/database";

export const SCRIPT_BLOCK_TYPES: ScriptBlockType[] = [
  "scene_heading",
  "action",
  "character",
  "dialogue",
  "parenthetical",
];

export const BLOCK_TYPE_LABELS: Record<ScriptBlockType, string> = {
  scene_heading: "Заголовок сцены",
  action: "Действие",
  character: "Персонаж",
  dialogue: "Реплика",
  parenthetical: "Ремарка",
};

export const BLOCK_TYPE_SHORTCUTS: Record<ScriptBlockType, string> = {
  scene_heading: "Сцена",
  action: "Действие",
  character: "Имя",
  dialogue: "Реплика",
  parenthetical: "Ремарка",
};

export function nextBlockType(current: ScriptBlockType): ScriptBlockType {
  const index = SCRIPT_BLOCK_TYPES.indexOf(current);
  return SCRIPT_BLOCK_TYPES[(index + 1) % SCRIPT_BLOCK_TYPES.length];
}

export function defaultBlockAfter(current: ScriptBlockType): ScriptBlockType {
  switch (current) {
    case "scene_heading":
      return "action";
    case "character":
      return "dialogue";
    case "parenthetical":
      return "dialogue";
    case "dialogue":
      return "character";
    default:
      return "action";
  }
}

export function createEmptyBlock(
  sortOrder: number,
  type: ScriptBlockType = "scene_heading",
): Omit<ScriptBlock, "id" | "version_id"> & { id: string } {
  return {
    id: crypto.randomUUID(),
    sort_order: sortOrder,
    type,
    content: "",
    scene_number: type === "scene_heading" ? 1 : null,
  };
}

export function renumberScenes(
  blocks: Array<Pick<ScriptBlock, "id" | "type" | "scene_number">>,
): Map<string, number | null> {
  let sceneCount = 0;
  const updates = new Map<string, number | null>();

  for (const block of blocks) {
    if (block.type === "scene_heading") {
      sceneCount += 1;
      updates.set(block.id, sceneCount);
    } else {
      updates.set(block.id, null);
    }
  }

  return updates;
}

export function getSceneHeadings(
  blocks: ScriptBlock[],
): Array<{ id: string; sceneNumber: number; content: string }> {
  return blocks
    .filter((b) => b.type === "scene_heading" && b.content.trim())
    .map((b) => ({
      id: b.id,
      sceneNumber: b.scene_number ?? 0,
      content: b.content.trim(),
    }));
}
