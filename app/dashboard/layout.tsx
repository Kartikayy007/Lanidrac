import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-[#EDEBEB]">
          <div className="sticky top-0 z-10 bg-[#EDEBEB] border-b border-gray-300/30 p-4 lg:hidden">
            <SidebarTrigger className="text-[#533E3D]" />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
