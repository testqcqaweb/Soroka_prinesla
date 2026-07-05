import { OverviewPageClient } from "@/components/projects/overview-page-client";

type PageProps = { params: Promise<{ id: string }> };

export default async function OverviewPage({ params }: PageProps) {
  const { id } = await params;
  return <OverviewPageClient projectId={id} />;
}
