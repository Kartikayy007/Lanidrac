import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-[#EDEBEB]">
      <div className="flex justify-center p-8">
        <div className="w-full max-w-6xl">
          <table className="w-full border-collapse border border-gray-300/30">
            <tbody>
              {/* Header Section */}
              <tr>
                <td className="border border-gray-300/30 px-8 py-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex justify-start mb-4">
                        <h1 className="p-1 bg-[#809ACF] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED]">
                          HEADER
                        </h1>
                      </div>
                      <h1 className="text-[#533E3D] text-5xl font-gaisyr">
                        Dashboard
                      </h1>
                      <p className="text-[#533E3D] text-lg mt-2">
                        Welcome back, {user.email}
                      </p>
                    </div>
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="bg-[#8C2221] text-white px-6 py-3 font-semibold hover:bg-[#6d2421] transition-colors"
                      >
                        Sign Out
                      </button>
                    </form>
                  </div>
                </td>
              </tr>

              {/* Content Section */}
              <tr>
                <td className="border border-gray-300/30 p-8">
                  <div className="flex justify-start mb-4">
                    <h1 className="p-1 bg-[#926AB0] flex justify-center items-center text-[10px] font-semibold text-[#F3EDED]">
                      CONTENT-BLOCK
                    </h1>
                  </div>
                  <div className="bg-[#f3eded17] p-12 border border-gray-300/30">
                    <div className="text-center">
                      <h2 className="text-[#533E3D] text-3xl font-gaisyr mb-4">
                        Coming Soon
                      </h2>
                      <p className="text-[#533E3D] text-lg mb-8">
                        Document processing features will be available here.
                      </p>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-6 border border-gray-300/30">
                          <h3 className="text-[#533E3D] text-xl font-bold mb-2">
                            Upload Documents
                          </h3>
                          <p className="text-[#533E3D]">
                            Upload and process your documents
                          </p>
                        </div>
                        <div className="bg-white p-6 border border-gray-300/30">
                          <h3 className="text-[#533E3D] text-xl font-bold mb-2">
                            View Results
                          </h3>
                          <p className="text-[#533E3D]">
                            Access processed document data
                          </p>
                        </div>
                        <div className="bg-white p-6 border border-gray-300/30">
                          <h3 className="text-[#533E3D] text-xl font-bold mb-2">
                            API Access
                          </h3>
                          <p className="text-[#533E3D]">
                            Integrate with your applications
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
