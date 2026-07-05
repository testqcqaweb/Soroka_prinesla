import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
  type Firestore,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";
import { renumberScenes } from "@/lib/script/constants";
import type {
  Project,
  ProjectType,
  ProjectWithScript,
  Script,
  ScriptBlock,
  ScriptBlockType,
  ScriptEditorData,
  ScriptVersion,
} from "@/lib/types/database";

const INITIAL_BLOCKS: Omit<ScriptBlock, "version_id">[] = [
  {
    id: crypto.randomUUID(),
    sort_order: 0,
    type: "scene_heading",
    content: "INT. МЕСТО — ДЕНЬ",
    scene_number: 1,
  },
  {
    id: crypto.randomUUID(),
    sort_order: 1,
    type: "action",
    content: "Описание действия.",
    scene_number: null,
  },
];

function db(): Firestore {
  return getClientFirestore();
}

function toIso(value: Timestamp | string | undefined): string {
  if (!value) return new Date().toISOString();
  if (typeof value === "string") return value;
  return value.toDate().toISOString();
}

function mapProject(id: string, data: Record<string, unknown>): Project {
  return {
    id,
    owner_id: String(data.owner_id),
    title: String(data.title),
    type: data.type as Project["type"],
    status: data.status as Project["status"],
    logline: (data.logline as string | null) ?? null,
    created_at: toIso(data.created_at as Timestamp | string),
    updated_at: toIso(data.updated_at as Timestamp | string),
  };
}

function mapScript(id: string, data: Record<string, unknown>): Script {
  return {
    id,
    project_id: String(data.project_id),
    title: String(data.title),
    current_version_id: (data.current_version_id as string | null) ?? null,
    created_at: toIso(data.created_at as Timestamp | string),
  };
}

function mapVersion(id: string, data: Record<string, unknown>): ScriptVersion {
  return {
    id,
    script_id: String(data.script_id),
    version_number: Number(data.version_number),
    label: (data.label as string | null) ?? null,
    note: (data.note as string | null) ?? null,
    created_at: toIso(data.created_at as Timestamp | string),
    created_by: String(data.created_by),
  };
}

function mapBlocks(raw: unknown[], versionId: string): ScriptBlock[] {
  return (raw ?? []).map((item) => {
    const block = item as Record<string, unknown>;
    return {
      id: String(block.id),
      version_id: versionId,
      sort_order: Number(block.sort_order),
      type: block.type as ScriptBlockType,
      content: String(block.content ?? ""),
      scene_number: block.scene_number == null ? null : Number(block.scene_number),
    };
  });
}

export async function fetchProject(
  projectId: string,
  ownerId: string,
): Promise<ProjectWithScript | null> {
  const snap = await getDoc(doc(db(), "projects", projectId));
  if (!snap.exists()) return null;
  const data = snap.data();
  if (data.owner_id !== ownerId) return null;
  return {
    ...mapProject(snap.id, data),
    script_id: String(data.script_id ?? ""),
    current_version_id: (data.current_version_id as string | null) ?? null,
    version_number: (data.version_number as number | null) ?? null,
  };
}

export async function fetchProjects(ownerId: string): Promise<ProjectWithScript[]> {
  const projectsQuery = query(
    collection(db(), "projects"),
    where("owner_id", "==", ownerId),
    orderBy("updated_at", "desc"),
  );
  const snapshot = await getDocs(projectsQuery);

  return snapshot.docs.map((projectDoc) => {
    const data = projectDoc.data();
    return {
      ...mapProject(projectDoc.id, data),
      script_id: String(data.script_id ?? ""),
      current_version_id: (data.current_version_id as string | null) ?? null,
      version_number: (data.version_number as number | null) ?? null,
    };
  });
}

export async function fetchScriptEditorData(
  projectId: string,
  ownerId: string,
): Promise<ScriptEditorData | null> {
  const projectRef = doc(db(), "projects", projectId);
  const projectSnap = await getDoc(projectRef);
  if (!projectSnap.exists()) return null;

  const project = mapProject(projectSnap.id, projectSnap.data());
  if (project.owner_id !== ownerId) return null;

  const scriptId = projectSnap.data().script_id as string | undefined;
  if (!scriptId) return null;

  const scriptSnap = await getDoc(doc(db(), "scripts", scriptId));
  if (!scriptSnap.exists()) return null;

  const script = mapScript(scriptSnap.id, scriptSnap.data());
  if (!script.current_version_id) return null;

  const versionSnap = await getDoc(
    doc(db(), "scripts", scriptId, "versions", script.current_version_id),
  );
  if (!versionSnap.exists()) return null;

  const versionData = versionSnap.data();
  const version = mapVersion(versionSnap.id, versionData);
  const blocks = mapBlocks(versionData.blocks as unknown[], version.id).sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  const versionsSnap = await getDocs(
    query(
      collection(db(), "scripts", scriptId, "versions"),
      orderBy("version_number", "desc"),
    ),
  );

  const versions = versionsSnap.docs.map((v) => {
    const data = v.data();
    return {
      id: v.id,
      version_number: Number(data.version_number),
      label: (data.label as string | null) ?? null,
      created_at: toIso(data.created_at as Timestamp | string),
    };
  });

  return { project, script, version, blocks, versions };
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
  scriptId: string,
  versionId: string,
  blocks: BlockInput[],
) {
  const sceneMap = renumberScenes(blocks);
  const normalized = blocks.map((block) => ({
    id: block.id,
    sort_order: block.sort_order,
    type: block.type,
    content: block.content,
    scene_number: sceneMap.get(block.id) ?? null,
  }));

  const batch = writeBatch(db());
  batch.update(doc(db(), "scripts", scriptId, "versions", versionId), {
    blocks: normalized,
  });
  batch.update(doc(db(), "projects", projectId), {
    updated_at: serverTimestamp(),
  });
  await batch.commit();

  return { success: true, savedAt: new Date().toISOString() };
}

export async function saveScriptVersion(
  projectId: string,
  scriptId: string,
  userId: string,
  blocks: BlockInput[],
  note?: string,
) {
  const versionsSnap = await getDocs(
    query(
      collection(db(), "scripts", scriptId, "versions"),
      orderBy("version_number", "desc"),
    ),
  );
  const latest = versionsSnap.docs[0]?.data();
  const nextNumber = (Number(latest?.version_number) || 0) + 1;

  const sceneMap = renumberScenes(blocks);
  const normalized = blocks.map((block) => ({
    id: crypto.randomUUID(),
    sort_order: block.sort_order,
    type: block.type,
    content: block.content,
    scene_number: sceneMap.get(block.id) ?? null,
  }));

  const versionRef = doc(collection(db(), "scripts", scriptId, "versions"));
  const batch = writeBatch(db());

  batch.set(versionRef, {
    script_id: scriptId,
    version_number: nextNumber,
    label: `Версия ${nextNumber}`,
    note: note?.trim() || null,
    created_at: serverTimestamp(),
    created_by: userId,
    blocks: normalized,
  });

  batch.update(doc(db(), "scripts", scriptId), {
    current_version_id: versionRef.id,
  });

  batch.update(doc(db(), "projects", projectId), {
    current_version_id: versionRef.id,
    version_number: nextNumber,
    updated_at: serverTimestamp(),
  });

  await batch.commit();

  return {
    success: true,
    versionId: versionRef.id,
    versionNumber: nextNumber,
  };
}

export async function loadScriptVersion(
  projectId: string,
  scriptId: string,
  versionId: string,
  versionNumber: number,
) {
  const batch = writeBatch(db());
  batch.update(doc(db(), "scripts", scriptId), { current_version_id: versionId });
  batch.update(doc(db(), "projects", projectId), {
    current_version_id: versionId,
    version_number: versionNumber,
    updated_at: serverTimestamp(),
  });
  await batch.commit();
  return { success: true };
}

export async function createProjectRecord(
  ownerId: string,
  input: { title: string; logline: string | null; type: ProjectType },
) {
  const batch = writeBatch(db());
  const projectRef = doc(collection(db(), "projects"));
  const scriptRef = doc(collection(db(), "scripts"));
  const versionRef = doc(collection(db(), "scripts", scriptRef.id, "versions"));

  const blocks = INITIAL_BLOCKS.map((block) => ({ ...block }));

  batch.set(projectRef, {
    owner_id: ownerId,
    title: input.title,
    logline: input.logline,
    type: input.type,
    status: "development",
    script_id: scriptRef.id,
    current_version_id: versionRef.id,
    version_number: 1,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });

  batch.set(scriptRef, {
    project_id: projectRef.id,
    title: input.title,
    current_version_id: versionRef.id,
    created_at: serverTimestamp(),
  });

  batch.set(versionRef, {
    script_id: scriptRef.id,
    version_number: 1,
    label: "Черновик",
    note: null,
    created_at: serverTimestamp(),
    created_by: ownerId,
    blocks,
  });

  await batch.commit();
  return { projectId: projectRef.id };
}
