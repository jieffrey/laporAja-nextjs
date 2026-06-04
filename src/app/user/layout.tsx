import type { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Sidebar from "@/layout/sidebar"
import Appbar from "@/layout/appbar"

export default async function UserLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "user") {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="user" name={session.user.name ?? "Pengguna"} points={session.user.points} />
      <div className="flex flex-1 flex-col min-w-0">
        <Appbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}