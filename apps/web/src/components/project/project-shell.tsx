"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ProjectNav } from "@/components/project/project-nav";

export function ProjectShell({
  projectId,
  projectTitle,
  children,
}: {
  projectId: string;
  projectTitle: string;
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <div className="space-y-6">
        <ProjectNav projectId={projectId} projectTitle={projectTitle} />
        {children}
      </div>
    </AppShell>
  );
}
