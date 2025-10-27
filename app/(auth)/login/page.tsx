import React from "react";
import { createClient } from "@/utils/supabase/server";
import { LoginForm } from "./components/loginForm";
import Redirecting from "./components/redirect";

const LoginPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
     return <Redirecting />;
  }
  return (
    <div className="flex h-svh items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
