"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectType, ProjectWithScript } from "@/lib/types/database";

const INITIAL_BLOCKS = [
  { sort_order: 0, type: "scene_heading", content: "INT. МЕСТО — ДЕНЬ", scene_number: 1 },
  { sort_order: 1, type: "action", content: "Описание действия.", scene_number: null },
] as const;

export async function getProjects(): Promise<ProjectWithScript[]> {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!projects?.length) return [];

  const projectIds = projects.map((p) => p.id);
  const { data: scripts } = await supabase
    .from("scripts")
    .select("id, project_id, current_version_id")
    .in("project_id", projectIds);

  const scriptByProject = new Map((scripts ?? []).map((s) => [s.project_id, s]));
  const versionIds = (scripts ?? [])
    .map((s) => s.current_version_id)
    .filter(Boolean) as string[];

  const { data: versions } = versionIds.length
    ? await supabase
        .from("script_versions")
        .select("id, version_number")
        .in("id", versionIds)
    : { data: [] };

  const versionById = new Map((versions ?? []).map((v) => [v.id, v.version_number]));

  return projects.map((row) => {
    const script = scriptByProject.get(row.id);
    return {
      id: row.id,
      owner_id: row.owner_id,
      title: row.title,
      type: row.type,
      status: row.status,
      logline: row.logline,
      created_at: row.created_at,
      updated_at: row.updated_at,
      script_id: script?.id ?? "",
      current_version_id: script?.current_version_id ?? null,
      version_number: script?.current_version_id
        ? (versionById.get(script.current_version_id) ?? null)
        : null,
    };
  });
}

export async function getProject(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const title = String(formData.get("title") ?? "").trim();
  const logline = String(formData.get("logline") ?? "").trim() || null;
  const type = String(formData.get("type") ?? "feature") as ProjectType;

  if (!title) throw new Error("Укажите название проекта");

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({ owner_id: user.id, title, logline, type })
    .select("id")
    .single();

  if (projectError) throw new Error(projectError.message);

  const { data: script, error: scriptError } = await supabase
    .from("scripts")
    .insert({ project_id: project.id, title })
    .select("id")
    .single();

  if (scriptError) throw new Error(scriptError.message);

  const { data: version, error: versionError } = await supabase
    .from("script_versions")
    .insert({
      script_id: script.id,
      version_number: 1,
      label: "Черновик",
      created_by: user.id,
    })
    .select("id")
    .single();

  if (versionError) throw new Error(versionError.message);

  const { error: blocksError } = await supabase.from("script_blocks").insert(
    INITIAL_BLOCKS.map((block) => ({
      version_id: version.id,
      ...block,
    })),
  );

  if (blocksError) throw new Error(blocksError.message);

  const { error: linkError } = await supabase
    .from("scripts")
    .update({ current_version_id: version.id })
    .eq("id", script.id);

  if (linkError) throw new Error(linkError.message);

  revalidatePath("/");
  redirect(`/projects/${project.id}/script`);
}

export async function createProjectFromForm(formData: FormData) {
  await createProject(formData);
}

export async function updateProject(
  projectId: string,
  data: { title?: string; logline?: string | null; type?: ProjectType; status?: string },
) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").update(data).eq("id", projectId);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) return { error: error.message };

  revalidatePath("/");
  redirect("/");
}
