import { ScriptPageClient } from "@/components/projects/script-page-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ScriptPage({ params }: PageProps) {
  const { id } = await params;
  return <ScriptPageClient projectId={id} />;
}
