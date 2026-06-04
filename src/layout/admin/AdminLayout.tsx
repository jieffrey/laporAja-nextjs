import type { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AdminSidebar from "@/layout/admin/sidebar"
import AdminAppbar  from "@/layout/admin/appbar"
import type { UserRole } from "@/lib/constant"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || !["admin", "superadmin"].includes(session.user.role)) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar — desktop only, sticky */}
      <AdminSidebar
        role={session.user.role as UserRole}
        name={session.user.name ?? "Admin"}
      />

      {/* Right column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminAppbar />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}