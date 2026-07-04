export type ProjectType = "feature" | "short" | "series" | "pilot" | "other";
export type ProjectStatus =
  | "development"
  | "pre_production"
  | "production"
  | "archived";

export type ScriptBlockType =
  | "scene_heading"
  | "action"
  | "character"
  | "dialogue"
  | "parenthetical";

export type Project = {
  id: string;
  owner_id: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  logline: string | null;
  created_at: string;
  updated_at: string;
};

export type Script = {
  id: string;
  project_id: string;
  title: string;
  current_version_id: string | null;
  created_at: string;
};

export type ScriptVersion = {
  id: string;
  script_id: string;
  version_number: number;
  label: string | null;
  note: string | null;
  created_at: string;
  created_by: string;
};

export type ScriptBlock = {
  id: string;
  version_id: string;
  sort_order: number;
  type: ScriptBlockType;
  content: string;
  scene_number: number | null;
};

export type ProjectWithScript = Project & {
  script_id: string;
  current_version_id: string | null;
  version_number: number | null;
};

export type ScriptEditorData = {
  project: Project;
  script: Script;
  version: ScriptVersion;
  blocks: ScriptBlock[];
  versions: Pick<ScriptVersion, "id" | "version_number" | "label" | "created_at">[];
};
