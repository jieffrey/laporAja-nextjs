"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getReports } from "@/lib/report.api"
import { getUsers } from "@/lib/user.api"
import type { Report } from "@/lib/report.api"
import type { User } from "@/lib/user.api"
import AdminDashboardClient, {
    type DashboardStats,
} from "@/components/Dashboard/AdminDashboard"
import type { UserStats } from "@/components/Dashboard/Admin-section/UserStatsCard"

const EMPTY_STATS: DashboardStats = {
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
}

const computeStats = (reports: Report[]): DashboardStats => ({
    total: reports.length,
    pending: reports.filter((r) => r.status === "Pending").length,
    inProgress: reports.filter((r) => r.status === "In Progress").length,
    resolved: reports.filter((r) => r.status === "Resolved").length,
    rejected: reports.filter((r) => r.status === "Rejected").length,
})

const computeUserStats = (users: User[]): UserStats => ({
    total: users.length,
    user: users.filter((u) => u.role === "user").length,
    admin: users.filter((u) => u.role === "admin").length,
    superadmin: users.filter((u) => u.role === "superadmin").length,
})

const sortByNewest = (reports: Report[]) =>
    [...reports].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

export default function AdminDashboardPage() {
    const { data: session, status } = useSession()
    const isSuperAdmin = session?.user?.role === "superadmin"

    const [reports, setReports] = useState<Report[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status !== "authenticated") return

        const fetchAll = async () => {
            try {
                const [r, u] = await Promise.all([
                    getReports(),
                    isSuperAdmin ? getUsers() : Promise.resolve([]),
                ])
                setReports(r)
                setUsers(u)
            } finally {
                setLoading(false)
            }
        }

        fetchAll()
    }, [status, isSuperAdmin])

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div
                    className="h-8 w-8 animate-spin rounded-full"
                    style={{
                        border: "3px solid #CCFBF1",
                        borderTopColor: "#0F766E",
                    }}
                />
            </div>
        )
    }

    const stats = computeStats(reports)
    const userStats = isSuperAdmin ? computeUserStats(users) : null
    const recentReports = sortByNewest(reports).slice(0, 10)

    return (
        <AdminDashboardClient
            session={session}
            stats={stats}
            userStats={userStats}
            recentReports={recentReports}
            isSuperAdmin={isSuperAdmin}
        />
    )
}