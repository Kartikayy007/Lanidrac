import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import FilesList from "@/components/dashboard/FilesList";

export default async function FilesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-[#533E3D] text-3xl sm:text-5xl font-gaisyr mb-2">
            My Files
          </h1>
          <p className="text-[#533E3D] text-base sm:text-lg">
            Manage your uploaded documents
          </p>
        </div>

        <FilesList />
      </div>
    </div>
  );
}
