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
  updateDoc,
  where,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";
import { toIso, touchProject } from "@/lib/firestore/helpers";
import type { Task, TaskPriority, TaskStatus } from "@/lib/types/database";

function tasksCol(projectId: string) {
  return collection(getClientFirestore(), "projects", projectId, "tasks");
}

function mapTask(projectId: string, id: string, data: Record<string, unknown>): Task {
  return {
    id,
    project_id: projectId,
    title: String(data.title),
    description: (data.description as string | null) ?? null,
    status: data.status as TaskStatus,
    priority: data.priority as TaskPriority,
    due_date: data.due_date ? toIso(data.due_date as { toDate: () => Date }) : null,
    created_at: toIso(data.created_at as { toDate: () => Date }),
    completed_at: data.completed_at
      ? toIso(data.completed_at as { toDate: () => Date })
      : null,
  };
}

export async function fetchTasks(projectId: string): Promise<Task[]> {
  const snapshot = await getDocs(query(tasksCol(projectId), orderBy("created_at", "desc")));
  return snapshot.docs.map((d) => mapTask(projectId, d.id, d.data()));
}

export async function createTask(
  projectId: string,
  input: { title: string; priority?: TaskPriority; due_date?: string | null },
) {
  const ref = await addDoc(tasksCol(projectId), {
    title: input.title.trim(),
    description: null,
    status: "todo",
    priority: input.priority ?? "medium",
    due_date: input.due_date ? new Date(input.due_date) : null,
    created_at: serverTimestamp(),
    completed_at: null,
  });
  await touchProject(projectId);
  return ref.id;
}

export async function updateTaskStatus(
  projectId: string,
  taskId: string,
  status: TaskStatus,
) {
  await updateDoc(doc(getClientFirestore(), "projects", projectId, "tasks", taskId), {
    status,
    completed_at: status === "done" ? serverTimestamp() : null,
  });
  await touchProject(projectId);
}

export async function deleteTask(projectId: string, taskId: string) {
  await deleteDoc(doc(getClientFirestore(), "projects", projectId, "tasks", taskId));
  await touchProject(projectId);
}

export async function countTasksByStatus(projectId: string) {
  const tasks = await fetchTasks(projectId);
  return {
    open: tasks.filter((t) => t.status !== "done").length,
    done: tasks.filter((t) => t.status === "done").length,
  };
}
