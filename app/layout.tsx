import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mnemo – AI MCQ Flashcard Generator",
  description: "Generate MCQ flashcards instantly using Mnemo, an AI-powered study tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Mnemo – AI MCQ Flashcard Generator</title>
        <meta name="description" content="Generate MCQ flashcards instantly using Mnemo, an AI-powered study tool." />
        <meta name="google-site-verification" content="uZS0_SLvUTswAuer28AF_JXCgdmZO0IN12UglJH7nLs" />

        {/* Open Graph for general sharing */}
        <meta property="og:title" content="Mnemo Pi Live Demo" />
        <meta property="og:description" content="Try the interactive memory app now!" />
        <meta property="og:url" content="https://mnemo-pi.vercel.app" />
        <meta property="og:type" content="video.other" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:image" content="mnemoscnsht.jpg" />  {/* Fallback image */}

        {/* Twitter Card for Twitter sharing */}
        <meta name="twitter:card" content="app" />
        <meta name="twitter:app:country" content="US" />
        <meta name="twitter:app:name:iphone" content="Mnemo Pi" />
        <meta name="twitter:app:url:iphone" content="mnemo-pi://demo" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >{children}

        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
