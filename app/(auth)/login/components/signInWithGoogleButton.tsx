"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import React, { useState } from "react";

const SignInWithGoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Error signing in with Google:", error);
        setIsLoading(false);
      } else if (data?.url) {
        // Immediately redirect to Google
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        "Redirecting to Google..."
      ) : (
        <>
          Login with{" "}
          <Image
            src="/google.svg"
            alt="google logomark"
            width={20}
            height={20}
          />
        </>
      )}
    </Button>
  );
};

export default SignInWithGoogleButton;
