import React from "react";
import { createClient } from "@/utils/supabase/server";
import { LoginForm } from "./components/loginForm";
import { redirect } from "next/navigation";


const LoginPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
     redirect("/dashboard");
  }
  return (
    <div className="flex h-svh items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
