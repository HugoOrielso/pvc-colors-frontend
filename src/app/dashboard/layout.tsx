// app/dashboard/layout.tsx

import type { Metadata } from "next";

import SessionInitializer from "@/components/common/SessionInitializer";
import DashboardSidebar from "@/components/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import LogoutButton from "@/components/common/LogoutButton";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | PVC Colors",
    template: "%s | Dashboard",
  },
  description: "Panel administrativo de PVC Colors",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SessionInitializer />

      <TooltipProvider>
        <DashboardSidebar />

        <SidebarInset className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex shrink-0 items-center justify-between border-b bg-white px-4 py-3">
            <SidebarTrigger className="cursor-pointer" />

            <div className="flex items-center gap-3">
              <LogoutButton />
            </div>
          </header>

          <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="min-w-0 max-w-full overflow-hidden">
              {children}
            </div>
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}