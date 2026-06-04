import type { ReactNode } from "react"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SessionWrapper from "@/components/common-ui/SessionWrapper"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "LaporAja — Smart Geo Complaint System",
  description: "Platform pengaduan masyarakat berbasis peta interaktif",
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="id">
      <body>
        <SessionWrapper session={session}>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}