import type { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AdminLayout from "@/layout/admin/AdminLayout"

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || !["admin", "superadmin"].includes(session.user.role)) {
    redirect("/auth/login")
  }

  return (
          <AdminLayout>
          {children}
          </AdminLayout>
  )
}