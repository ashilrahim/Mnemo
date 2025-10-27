"use client";

import BlurText from "@/components/BlurText";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HeroSection() {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleAnimationComplete = () => {
        console.log("Animation completed!");
    };

    return (
        <section
            className="flex-1 flex flex-col items-center justify-center text-center px-6 py-30 md:py-55"
            id="home"
        >
            {!mounted && (
                <h1 className="text-4xl md:text-6xl font-sans text-gray-900 mb-6 dark:text-white">
                    Turn Your Documents into Smart Flashcards
                </h1>
            )}
            <AnimatePresence
                mode="wait">
                {mounted && (
                    <motion.div
                        key="animated"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <BlurText
                            text="Turn Your Documents into Smart Flashcards"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            onAnimationComplete={handleAnimationComplete}
                            className="text-4xl md:text-6xl font-sans text-gray-900 mb-6 dark:text-white"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 in-dark:text-amber-50">
                Upload your study materials and instantly generate flashcards powered by AI.
                Save time, remember more, and make learning effortless.
            </p>
            <Link href="/login">
                <InteractiveHoverButton />
            </Link>
        </section>
    );
}
