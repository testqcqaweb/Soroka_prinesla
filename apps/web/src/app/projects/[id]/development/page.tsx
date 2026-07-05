import { DevelopmentPageClient } from "@/components/projects/development-page-client";

type PageProps = { params: Promise<{ id: string }> };

export default async function DevelopmentPage({ params }: PageProps) {
  const { id } = await params;
  return <DevelopmentPageClient projectId={id} />;
}
