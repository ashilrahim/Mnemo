"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";

const LoginButton = () => {
  const [user, setUser] = useState<unknown>(null);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (isMounted) setUser(user);
    };

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;
        if (event === "SIGNED_IN") {
          setUser(session?.user ?? null);
          router.replace("/dashboard");
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          router.replace("/");
        }
      }
    );

    bootstrap();

    return () => {
      isMounted = false;
      subscription.subscription?.unsubscribe();
    };
  }, [supabase, router]);
  if (user) {
    return (
      <Button
        onClick={() => {
          signout();
          setUser(null);
        }}
      >
        Log out
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
