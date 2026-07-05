import { TasksPageClient } from "@/components/projects/tasks-page-client";

type PageProps = { params: Promise<{ id: string }> };

export default async function TasksPage({ params }: PageProps) {
  const { id } = await params;
  return <TasksPageClient projectId={id} />;
}
