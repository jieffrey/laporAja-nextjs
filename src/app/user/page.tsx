"use client"

import { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import UserDashboard from "@/components/Dashboard/UserDashboard"
import type { UserStats } from "@/components/Dashboard/users-section/UserStatCard"

const computeStats = (reports: Report[]): UserStats => ({
    total: reports.length,
    resolved: reports.filter((r) => r.status === "Resolved").length,
    inProgress: reports.filter((r) => r.status === "In Progress").length,
    pending: reports.filter((r) => r.status === "Pending").length,
})

const sortByNewest = (reports: Report[]) =>
    [...reports].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

export default function UserDashboardPage() {
    const { data: session, status } = useSession()
    const [allReports, setAllReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status !== "authenticated") return

        const fetchReports = async () => {
            try {
                const data = await getReports()
                setAllReports(data)
            } catch (e) {
                console.warn(e)
            }
            setLoading(false)
        }

        void fetchReports()
    }, [status])

    const userId = Number(session?.user?.id)
    const name = session?.user?.name?.split(" ")[0] ?? "Pengguna"
    const points = session?.user?.points ?? 0

    const myReports = useMemo(
        () => allReports.filter((r) => r.user_id === userId),
        [allReports, userId]
    )
    const stats = useMemo(() => computeStats(myReports), [myReports])
    const myRecentReports = useMemo(
        () => sortByNewest(myReports).slice(0, 5),
        [myReports]
    )

    return (
        <UserDashboard
            name={name}
            points={points}
            stats={stats}
            myRecentReports={myRecentReports}
            allReports={allReports}
            loading={loading}
        />
    )
}