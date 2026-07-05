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

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type CalendarEventType = "deadline" | "meeting" | "milestone" | "other";
export type BeatAct = 1 | 2 | 3 | "other";

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

export type Task = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  created_at: string;
  completed_at: string | null;
};

export type Character = {
  id: string;
  project_id: string;
  name: string;
  age: string | null;
  description: string | null;
  arc: string | null;
  notes: string | null;
  order: number;
};

export type Beat = {
  id: string;
  project_id: string;
  act: BeatAct;
  order: number;
  title: string;
  description: string | null;
};

export type Synopsis = {
  project_id: string;
  short_logline: string | null;
  extended_synopsis: string | null;
  treatment: string | null;
  updated_at: string;
};

export type CalendarEvent = {
  id: string;
  owner_id: string;
  project_id: string | null;
  project_title?: string | null;
  title: string;
  type: CalendarEventType;
  start_at: string;
  end_at: string | null;
};

export type ProjectOverview = {
  project: ProjectWithScript;
  openTasks: number;
  doneTasks: number;
  characters: number;
  beats: number;
  upcomingEvents: CalendarEvent[];
};
