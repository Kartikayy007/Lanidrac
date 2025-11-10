import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import UploadSection from "@/components/dashboard/UploadSection";
import RecentUploads from "@/components/dashboard/RecentUploads";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen flex p-6 sm:p-8  flex-col items-center bg-[#EDEBEB]">

      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-[#533E3D] text-3xl sm:text-4xl font-gaisyr mb-2">
            Dashboard
          </h1>
          <p className="text-[#533E3D] text-base sm:text-lg font-semibold">
            Welcome back, {user.email}
          </p>
        </div>

        <UploadSection />

        <RecentUploads />
      </div>
    </div>
  );
}
