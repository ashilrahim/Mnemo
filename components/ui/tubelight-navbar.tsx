"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, LucideIcon, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"
import LoginButton from "../loginLogoutButton"

interface NavItem {
  name: string
  url?: string
  icon?: LucideIcon,
  component?: React.ReactNode
}


const items: NavItem[] = [
  { name: 'Home', url: '#', icon: Home },
  { name: 'How it Works', url: '#', icon: Workflow },
  { name: 'Login', component: <LoginButton /> },
]

export function NavBar({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div

      className={cn(
        "fixed  sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 pt-6",
        className,
      )}
    >
      <div className="flex  items-center gap-3 bg-background/5 border border-border backdrop-blur-lg rounded-full shadow-lg">
        {items.map((item) => {
          const isActive = activeTab === item.name
          const Component = item.component
          return (
            <div key={item.name} className="relative">
              {
                Component ? (
                  Component
                ) : <Link
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                    "text-foreground/80 hover:text-primary",
                    " text-xs sm:text-sm md:text-base",
                    isActive && "bg-muted text-primary",
                  )}
                >
                  <span className="hidden md:inline">{item.name}</span>
                  {item.icon && (
                    <span className="md:hidden">
                      <item.icon size={18} strokeWidth={2.5} />
                    </span>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              }

            </div>
          )
        })}
      </div>
    </div>
  )
}
