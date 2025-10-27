"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LoginForm } from "./components/loginForm";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/dashboard");
      } else {
        setChecking(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 animate-pulse">Redirecting to your dashboard...</p>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
}
