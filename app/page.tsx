

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Link from "next/link";

import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

import { Features } from "@/components/features-1";

import { PricingInteraction } from "@/components/ui/pricing-interaction";
import { FloatingHeader } from "@/components/floating-header";
import HeroSection from "@/components/HeroSection";






export default async function Home() {

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };


  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

 if (user) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
        <p className="text-gray-500 dark:text-gray-200 animate-pulse text-lg">
          Redirecting to your dashboard...
        </p>
        {redirect("/dashboard")}
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* navbar section */}
      <FloatingHeader />
      {/* Hero Section */}
      <HeroSection />
        
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


    
      {/* How It Works */}
      <section className="px-6 py-20" id="features">

        <Features />



      </section>
      {/* pricing section */}

      <section className="px-6 py-10 flex items-center justify-center flex-col" id="pricing">
        <h2 className="text-4xl font-sans text-center mb-12">Pricing</h2>
        <PricingInteraction starterMonth={3.99}
          starterAnnual={1.49}
          proMonth={6.99}
          proAnnual={3.49} />
      </section>

      {/* Sample Flashcards Section */}
      <section className="px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Sample Flashcards</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <p className="font-medium mb-4">Q: What is the capital of France?</p>
            <ul className="space-y-2 text-gray-700 dark:text-white text-sm">
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
            <ul className="space-y-2 text-gray-700 dark:text-white text-sm">
              <li>Newton</li>
              <li className="font-semibold text-green-600">Einstein ✅</li>
              <li>Galileo</li>
              <li>Bohr</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <p className="font-medium mb-4">Q: 2 + 2 × 2 = ?</p>
            <ul className="space-y-2 text-gray-700 dark:text-white text-sm">
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
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-white">
          <p>© {new Date().getFullYear()} Mnemo. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/home">Home</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
