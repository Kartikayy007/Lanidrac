import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DocumentViewer from "@/components/dashboard/DocumentViewer";

interface PageProps {
  params: Promise<{
    job_id: string;
  }>;
}

export default async function DocumentDetailsPage({ params }: PageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { job_id } = await params;

  return (
    <div className="flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        <DocumentViewer jobId={job_id} />
      </div>
    </div>
  );
}
