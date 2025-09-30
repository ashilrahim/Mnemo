

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Link from "next/link";

import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/moving-border";
import { Features } from "@/components/features-1";
import { NavBar } from "@/components/ui/tubelight-navbar";



export default async function Home() {

  
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* navbar section */}
      <NavBar />
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-30 md:py-55">
        <h1 className="text-4xl md:text-6xl font-sans text-gray-900 mb-6">
          Turn Your Documents into Smart Flashcards
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Upload your study materials and instantly generate flashcards powered
          by AI. Save time, remember more, and make learning effortless.
        </p>
        <Link
          href=""
        >
          <Button borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800">
            Get Started
          </Button>
        </Link>
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-40%] h-[200%] skew-y-12",
          )}
        />


      </section>

      {/* How It Works */}
      <section className="px-6 py-20">

        <Features />



      </section>

      {/* Sample Flashcards Section */}
      <section className="px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Sample Flashcards</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <p className="font-medium mb-4">Q: What is the capital of France?</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Berlin</li>
              <li>Madrid</li>
              <li className="font-semibold text-green-600">Paris ✅</li>
              <li>Rome</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <p className="font-medium mb-4">
              Q: Who proposed the theory of relativity?
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Newton</li>
              <li className="font-semibold text-green-600">Einstein ✅</li>
              <li>Galileo</li>
              <li>Bohr</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <p className="font-medium mb-4">Q: 2 + 2 × 2 = ?</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>4</li>
              <li className="font-semibold text-green-600">6 ✅</li>
              <li>8</li>
              <li>2</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Mnemo. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
