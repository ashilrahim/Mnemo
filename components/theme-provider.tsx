"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // 🚫 Render nothing on the server
    // ✅ Prevents mismatch when client applies the theme
    return null
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

