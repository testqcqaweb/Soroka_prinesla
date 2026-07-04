import { notFound } from "next/navigation";
import { getScriptEditorData } from "@/actions/script";
import { AppHeader } from "@/components/layout/app-header";
import { ScriptEditor } from "@/components/script/script-editor";
import { SetupNotice } from "@/components/setup/setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ScriptPage({ params }: PageProps) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-full bg-[var(--santa-charcoal)]">
        <AppHeader />
        <div className="mx-auto max-w-3xl px-4 py-8">
          <SetupNotice />
        </div>
      </div>
    );
  }

  const data = await getScriptEditorData(id);
  if (!data) notFound();

  return (
    <div className="min-h-full bg-[var(--santa-charcoal)] text-[var(--santa-cream)]">
      <AppHeader />
      <ScriptEditor data={data} />
    </div>
  );
}
