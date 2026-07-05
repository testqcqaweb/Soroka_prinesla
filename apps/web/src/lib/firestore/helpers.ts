import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";

export function toIso(value: { toDate?: () => Date } | string | undefined): string {
  if (!value) return new Date().toISOString();
  if (typeof value === "string") return value;
  return value.toDate?.().toISOString() ?? new Date().toISOString();
}

export async function touchProject(projectId: string) {
  await updateDoc(doc(getClientFirestore(), "projects", projectId), {
    updated_at: serverTimestamp(),
  });
}
