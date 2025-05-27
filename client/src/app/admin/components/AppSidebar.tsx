import { Settings, LayoutDashboard, Truck, HandPlatter } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Food menu",
    url: "/admin/foodmenu",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/admin",
    icon: Truck,
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex gap-2 justify-center items-center mt-5 px-4 py-3">
              <HandPlatter className="text-red-500 fill-red-500" />
              <div>
                <p className="text-18px font-semibold text-black">NomNom</p>
                <p className="text-12px font-normal">Swift delivery</p>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-8 px-4 py-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="active:bg-black active:text-white"
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
