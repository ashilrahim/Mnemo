"use client";

import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./togglemode";
import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const supabase = createClient();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.error("Auth error:", authError);
          if (mounted) setLoading(false);
          return;
        }

          if (!user) {
            // no user - clear
            if (mounted) {
              setUserName(null);
              setUserEmail(null);
              setLoading(false);
            }
            return;
          }

          

          if (mounted) {
            setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Unknown");
            setUserEmail(user.user_metadata?.email );
            setLoading(false);
          }

        
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (mounted) setLoading(false);
      }
    }

    fetchUser()

    return () => {
      mounted = false;
    };

  }, [supabase])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mnemo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenuButton className="w-full justify-between gap-3 h-12">
            <div className="flex items-center justify-between gap-4">
              <User className="h-5 w-5 rounded-md" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {loading ? "..." : userName ?? "Not signed in"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {loading ? "..." : userEmail}
                </span>
              </div>
            </div>

          </SidebarMenuButton>

        </SidebarGroup>

      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
