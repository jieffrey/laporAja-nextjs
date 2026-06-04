import type { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Sidebar from "@/layout/sidebar"
import Appbar from "@/layout/appbar"
import type { UserRole } from "@/lib/constant"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || !["admin", "superadmin"].includes(session.user.role)) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={session.user.role as UserRole} name={session.user.name ?? "Admin"} />
      <div className="flex flex-1 flex-col min-w-0">
        <Appbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}