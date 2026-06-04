"use client"

import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

// Wrapper ini penting — pass session dari server ke client
// Mencegah stale token di cookie saat pertama kali project dirun
export default function SessionWrapper({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={true}   // refresh session saat tab difokus
      refetchInterval={5 * 60}      // refresh tiap 5 menit
    >
      {children}
    </SessionProvider>
  )
}