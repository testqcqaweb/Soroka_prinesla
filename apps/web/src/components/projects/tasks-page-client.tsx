"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { ProjectShell } from "@/components/project/project-shell";
import { fetchProject } from "@/lib/firestore/projects";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTaskStatus,
} from "@/lib/firestore/tasks";
import type { Task, TaskPriority, TaskStatus } from "@/lib/types/database";

const columns: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "К выполнению" },
  { status: "in_progress", label: "В работе" },
  { status: "done", label: "Готово" },
];

const priorityColors: Record<TaskPriority, string> = {
  low: "text-[var(--santa-muted)]",
  medium: "text-[var(--santa-cream)]",
  high: "text-[var(--santa-crimson)]",
};

export function TasksPageClient({ projectId }: { projectId: string }) {
  const { user } = useAuth();
  const [projectTitle, setProjectTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

  async function reload() {
    const list = await fetchTasks(projectId);
    setTasks(list);
  }

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function load() {
      const project = await fetchProject(projectId, user!.uid);
      if (cancelled) return;
      setProjectTitle(project?.title ?? "Проект");
      await reload();
      if (!cancelled) setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [projectId, user]);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    if (!newTitle.trim()) return;
    await createTask(projectId, { title: newTitle.trim() });
    setNewTitle("");
    await reload();
  }

  async function moveTask(taskId: string, status: TaskStatus) {
    await updateTaskStatus(projectId, taskId, status);
    await reload();
  }

  async function handleDelete(taskId: string) {
    await deleteTask(projectId, taskId);
    await reload();
  }

  if (loading) {
    return <p className="text-[var(--santa-muted)]">Загрузка…</p>;
  }

  return (
    <ProjectShell projectId={projectId} projectTitle={projectTitle}>
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Новая задача…"
          className="flex-1 rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none focus:border-[var(--santa-crimson)]"
        />
        <button
          type="submit"
          className="rounded-lg bg-[var(--santa-crimson)] px-4 py-2 text-sm font-medium text-[var(--santa-cream)]"
        >
          Добавить
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.status}
            className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-4"
          >
            <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--santa-muted)]">
              {col.label}
            </h2>
            <ul className="space-y-2">
              {tasks
                .filter((t) => t.status === col.status)
                .map((task) => (
                  <li
                    key={task.id}
                    className="rounded-lg border border-white/8 bg-[var(--santa-charcoal)] p-3"
                  >
                    <p className={`text-sm font-medium ${priorityColors[task.priority]}`}>
                      {task.title}
                    </p>
                    {task.due_date && (
                      <p className="mt-1 text-xs text-[var(--santa-muted)]">
                        до {formatDate(task.due_date)}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {columns
                        .filter((c) => c.status !== task.status)
                        .map((c) => (
                          <button
                            key={c.status}
                            type="button"
                            onClick={() => moveTask(task.id, c.status)}
                            className="rounded px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--santa-muted)] hover:bg-white/5 hover:text-[var(--santa-cream)]"
                          >
                            → {c.label}
                          </button>
                        ))}
                      <button
                        type="button"
                        onClick={() => handleDelete(task.id)}
                        className="ml-auto rounded px-2 py-0.5 text-[10px] text-[var(--santa-crimson)] hover:bg-white/5"
                      >
                        Удалить
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </ProjectShell>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(
    new Date(iso),
  );
}
