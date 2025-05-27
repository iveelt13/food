import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components";
import { AdminHeader } from "./components";

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <div className="flex flex-row justify-between p-5 bg-[#F4F4F5]">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
      <AdminHeader />
    </div>
  );
}

export default Layout;
