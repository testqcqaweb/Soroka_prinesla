import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";
import { toIso } from "@/lib/firestore/helpers";
import type { CalendarEvent, CalendarEventType } from "@/lib/types/database";

function eventsCol() {
  return collection(getClientFirestore(), "calendar_events");
}

function mapEvent(id: string, data: Record<string, unknown>): CalendarEvent {
  return {
    id,
    owner_id: String(data.owner_id),
    project_id: (data.project_id as string | null) ?? null,
    project_title: (data.project_title as string | null) ?? null,
    title: String(data.title),
    type: data.type as CalendarEventType,
    start_at: toIso(data.start_at as { toDate: () => Date }),
    end_at: data.end_at ? toIso(data.end_at as { toDate: () => Date }) : null,
  };
}

export async function fetchCalendarEvents(ownerId: string): Promise<CalendarEvent[]> {
  const snapshot = await getDocs(
    query(eventsCol(), where("owner_id", "==", ownerId), orderBy("start_at", "asc")),
  );
  return snapshot.docs.map((d) => mapEvent(d.id, d.data()));
}

export async function fetchProjectEvents(
  ownerId: string,
  projectId: string,
): Promise<CalendarEvent[]> {
  const snapshot = await getDocs(
    query(
      eventsCol(),
      where("owner_id", "==", ownerId),
      where("project_id", "==", projectId),
      orderBy("start_at", "asc"),
    ),
  );
  return snapshot.docs.map((d) => mapEvent(d.id, d.data()));
}

export async function createCalendarEvent(
  ownerId: string,
  input: {
    title: string;
    type: CalendarEventType;
    start_at: string;
    end_at?: string | null;
    project_id?: string | null;
    project_title?: string | null;
  },
) {
  const ref = await addDoc(eventsCol(), {
    owner_id: ownerId,
    project_id: input.project_id ?? null,
    project_title: input.project_title ?? null,
    title: input.title.trim(),
    type: input.type,
    start_at: Timestamp.fromDate(new Date(input.start_at)),
    end_at: input.end_at ? Timestamp.fromDate(new Date(input.end_at)) : null,
    created_at: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteCalendarEvent(eventId: string) {
  await deleteDoc(doc(getClientFirestore(), "calendar_events", eventId));
}

export async function fetchUpcomingEvents(
  ownerId: string,
  limit = 5,
): Promise<CalendarEvent[]> {
  const all = await fetchCalendarEvents(ownerId);
  const now = Date.now();
  return all.filter((e) => new Date(e.start_at).getTime() >= now).slice(0, limit);
}
