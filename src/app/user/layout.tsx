import type { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserSidebar from "@/layout/user/sidebar"
import UserAppbar from "@/layout/user/appbar"

export default async function UserLayout({
    children,
}: {
    children: ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "user") {
        redirect("/auth/login")
    }

    return (
        <div className="flex min-h-screen" style={{ background: "#F8F6F0" }}>
            <UserSidebar
                name={session.user.name ?? "Pengguna"}
                points={session.user.points}
            />
            <div className="flex min-w-0 flex-1 flex-col">
                <UserAppbar />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}