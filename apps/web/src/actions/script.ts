"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { renumberScenes } from "@/lib/script/constants";
import type { ScriptBlock, ScriptBlockType, ScriptEditorData } from "@/lib/types/database";

export async function getScriptEditorData(projectId: string): Promise<ScriptEditorData | null> {
  const supabase = await createClient();

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (projectError || !project) return null;

  const { data: script, error: scriptError } = await supabase
    .from("scripts")
    .select("*")
    .eq("project_id", projectId)
    .single();

  if (scriptError || !script?.current_version_id) return null;

  const { data: version, error: versionError } = await supabase
    .from("script_versions")
    .select("*")
    .eq("id", script.current_version_id)
    .single();

  if (versionError || !version) return null;

  const { data: blocks, error: blocksError } = await supabase
    .from("script_blocks")
    .select("*")
    .eq("version_id", version.id)
    .order("sort_order", { ascending: true });

  if (blocksError) return null;

  const { data: versions } = await supabase
    .from("script_versions")
    .select("id, version_number, label, created_at")
    .eq("script_id", script.id)
    .order("version_number", { ascending: false });

  return {
    project,
    script,
    version,
    blocks: blocks ?? [],
    versions: versions ?? [],
  };
}

type BlockInput = {
  id: string;
  sort_order: number;
  type: ScriptBlockType;
  content: string;
  scene_number: number | null;
};

export async function saveScriptBlocks(
  projectId: string,
  versionId: string,
  blocks: BlockInput[],
) {
  const supabase = await createClient();

  const sceneMap = renumberScenes(blocks);
  const normalized = blocks.map((block) => ({
    ...block,
    scene_number: sceneMap.get(block.id) ?? null,
  }));

  const { error: deleteError } = await supabase
    .from("script_blocks")
    .delete()
    .eq("version_id", versionId);

  if (deleteError) return { error: deleteError.message };

  if (normalized.length > 0) {
    const { error: insertError } = await supabase.from("script_blocks").insert(
      normalized.map((block) => ({
        id: block.id,
        version_id: versionId,
        sort_order: block.sort_order,
        type: block.type,
        content: block.content,
        scene_number: block.scene_number,
      })),
    );

    if (insertError) return { error: insertError.message };
  }

  await supabase
    .from("projects")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", projectId);

  revalidatePath(`/projects/${projectId}/script`);
  return { success: true, savedAt: new Date().toISOString() };
}

export async function saveScriptVersion(
  projectId: string,
  scriptId: string,
  currentVersionId: string,
  blocks: BlockInput[],
  note?: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Необходима авторизация" };

  const { data: latest } = await supabase
    .from("script_versions")
    .select("version_number")
    .eq("script_id", scriptId)
    .order("version_number", { ascending: false })
    .limit(1)
    .single();

  const nextNumber = (latest?.version_number ?? 0) + 1;

  const { data: newVersion, error: versionError } = await supabase
    .from("script_versions")
    .insert({
      script_id: scriptId,
      version_number: nextNumber,
      label: `Версия ${nextNumber}`,
      note: note?.trim() || null,
      created_by: user.id,
    })
    .select("id, version_number")
    .single();

  if (versionError || !newVersion) return { error: versionError?.message ?? "Ошибка версии" };

  const sceneMap = renumberScenes(blocks);
  const normalized = blocks.map((block) => ({
    id: crypto.randomUUID(),
    version_id: newVersion.id,
    sort_order: block.sort_order,
    type: block.type,
    content: block.content,
    scene_number: sceneMap.get(block.id) ?? null,
  }));

  if (normalized.length > 0) {
    const { error: blocksError } = await supabase.from("script_blocks").insert(normalized);
    if (blocksError) return { error: blocksError.message };
  }

  const { error: scriptError } = await supabase
    .from("scripts")
    .update({ current_version_id: newVersion.id })
    .eq("id", scriptId);

  if (scriptError) return { error: scriptError.message };

  revalidatePath(`/projects/${projectId}/script`);
  return {
    success: true,
    versionId: newVersion.id,
    versionNumber: newVersion.version_number,
  };
}

export async function loadScriptVersion(projectId: string, scriptId: string, versionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("scripts")
    .update({ current_version_id: versionId })
    .eq("id", scriptId);

  if (error) return { error: error.message };

  revalidatePath(`/projects/${projectId}/script`);
  return { success: true };
}
