import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LoginForm } from "./components/loginForm";

const LoginPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    setTimeout(() => {
      redirect("/dashboard");
    }, 2000);
  }
  return (
    <div className="flex h-svh items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
