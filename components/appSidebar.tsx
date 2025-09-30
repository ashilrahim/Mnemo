"use client";

import {
  Home,
  WalletMinimal,
  User,
  LucideLogOut,
} from "lucide-react";
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
import LoginButton from "./loginLogoutButton";
import Image from "next/image";

const supabase = createClient();

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "pricing",
    url: "/pricing",
    icon: WalletMinimal,
  },


  {
    title: "Log Out",
    icon: LucideLogOut,
    onclick: async () => {
      supabase.auth.signOut();
      window.location.href = "/";
    },
  },
];

const AppSidebar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [credits, setcredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
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

        const { data: creditsData, error: error } = await supabase.from("user_credits").select("credits").eq("user_id", user.id).single()

        if (error) console.error("credits fetch error", error);


        if (mounted) {
          setUserName(
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "Unknown"
          );
          setUserEmail(user.user_metadata?.email);
          setcredits(creditsData?.credits ?? 0);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (mounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image src="/Logo.png" alt="logo" width={40}
              height={40} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.onclick ? (
                    <SidebarMenuButton asChild onClick={item.onclick}>
                      <button>
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
              <ModeToggle />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <div className="flex justify-start items-center mb-3 ml-3">
            <span className="text-sm font-medium">
              {loading ? "..." : `${credits ?? 0} Credits left`}
            </span>
          </div>
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
