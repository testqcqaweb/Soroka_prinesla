import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";
import { toIso, touchProject } from "@/lib/firestore/helpers";
import type { Beat, BeatAct, Character, Synopsis } from "@/lib/types/database";

function charactersCol(projectId: string) {
  return collection(getClientFirestore(), "projects", projectId, "characters");
}

function beatsCol(projectId: string) {
  return collection(getClientFirestore(), "projects", projectId, "beats");
}

function synopsisDoc(projectId: string) {
  return doc(getClientFirestore(), "projects", projectId, "development", "synopsis");
}

export async function fetchSynopsis(projectId: string): Promise<Synopsis> {
  const snap = await getDoc(synopsisDoc(projectId));
  if (!snap.exists()) {
    return {
      project_id: projectId,
      short_logline: null,
      extended_synopsis: null,
      treatment: null,
      updated_at: new Date().toISOString(),
    };
  }
  const data = snap.data();
  return {
    project_id: projectId,
    short_logline: (data.short_logline as string | null) ?? null,
    extended_synopsis: (data.extended_synopsis as string | null) ?? null,
    treatment: (data.treatment as string | null) ?? null,
    updated_at: toIso(data.updated_at as { toDate: () => Date }),
  };
}

export async function saveSynopsis(
  projectId: string,
  data: Pick<Synopsis, "short_logline" | "extended_synopsis" | "treatment">,
) {
  await setDoc(
    synopsisDoc(projectId),
    {
      short_logline: data.short_logline,
      extended_synopsis: data.extended_synopsis,
      treatment: data.treatment,
      updated_at: serverTimestamp(),
    },
    { merge: true },
  );
  await touchProject(projectId);
}

export async function fetchCharacters(projectId: string): Promise<Character[]> {
  const snapshot = await getDocs(query(charactersCol(projectId), orderBy("order", "asc")));
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      project_id: projectId,
      name: String(data.name),
      age: (data.age as string | null) ?? null,
      description: (data.description as string | null) ?? null,
      arc: (data.arc as string | null) ?? null,
      notes: (data.notes as string | null) ?? null,
      order: Number(data.order),
    };
  });
}

export async function createCharacter(projectId: string, name: string) {
  const existing = await fetchCharacters(projectId);
  const ref = await addDoc(charactersCol(projectId), {
    name: name.trim(),
    age: null,
    description: null,
    arc: null,
    notes: null,
    order: existing.length,
  });
  await touchProject(projectId);
  return ref.id;
}

export async function updateCharacter(
  projectId: string,
  characterId: string,
  data: Partial<Pick<Character, "name" | "age" | "description" | "arc" | "notes">>,
) {
  await updateDoc(
    doc(getClientFirestore(), "projects", projectId, "characters", characterId),
    data,
  );
  await touchProject(projectId);
}

export async function deleteCharacter(projectId: string, characterId: string) {
  await deleteDoc(
    doc(getClientFirestore(), "projects", projectId, "characters", characterId),
  );
  await touchProject(projectId);
}

export async function fetchBeats(projectId: string): Promise<Beat[]> {
  const snapshot = await getDocs(query(beatsCol(projectId), orderBy("order", "asc")));
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      project_id: projectId,
      act: data.act as BeatAct,
      order: Number(data.order),
      title: String(data.title),
      description: (data.description as string | null) ?? null,
    };
  });
}

export async function createBeat(
  projectId: string,
  input: { act: BeatAct; title: string },
) {
  const existing = await fetchBeats(projectId);
  const ref = await addDoc(beatsCol(projectId), {
    act: input.act,
    title: input.title.trim(),
    description: null,
    order: existing.length,
  });
  await touchProject(projectId);
  return ref.id;
}

export async function updateBeat(
  projectId: string,
  beatId: string,
  data: Partial<Pick<Beat, "act" | "title" | "description" | "order">>,
) {
  await updateDoc(doc(getClientFirestore(), "projects", projectId, "beats", beatId), data);
  await touchProject(projectId);
}

export async function deleteBeat(projectId: string, beatId: string) {
  await deleteDoc(doc(getClientFirestore(), "projects", projectId, "beats", beatId));
  await touchProject(projectId);
}
