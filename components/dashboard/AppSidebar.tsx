"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, FileText, LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="bg-[#8C2221]! border-r border-gray-300/30">
      <SidebarHeader className="bg-[#8C2221]!  p-4">
        <Link href="/dashboard" className="flex items-center justify-start">
          <Image
            src="/fotter.avif"
            alt="Cardinal Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-[#8C2221]!">
        <SidebarGroup className="bg-[#8C2221]!">
          <SidebarGroupContent className="bg-[#8C2221]!">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-[#6d2421]! transition-colors data-[active=true]:bg-[#6d2421]!">
                  <Link href="/dashboard" className="flex items-center gap-3 text-[#F3EDED] font-semibold">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-[#6d2421]! transition-colors data-[active=true]:bg-[#6d2421]!">
                  <Link href="/dashboard/files" className="flex items-center gap-3 text-[#F3EDED] font-semibold">
                    <FileText className="h-5 w-5" />
                    <span>My Files</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#8C2221]!  p-4">
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 text-[#F3EDED] font-semibold px-3 py-2 hover:bg-[#6d2421] transition-colors rounded-md"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
