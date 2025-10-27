"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirecting() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 1500); // delay 1.5s

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 animate-pulse">Redirecting to your dashboard...</p>
    </div>
  );
}
