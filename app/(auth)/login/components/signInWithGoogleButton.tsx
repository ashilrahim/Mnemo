"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import Image from "next/image";
import React from "react";

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      Login with <Image
        src="/google.svg"
        alt="google logomark"
        width={20}
        height={20}
      />
    </Button>
  );
};

export default SignInWithGoogleButton;