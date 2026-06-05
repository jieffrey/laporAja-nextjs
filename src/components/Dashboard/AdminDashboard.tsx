"use client"

import type { Session } from "next-auth"
import type { Report } from "@/lib/report.api"
import WelcomeBanner from "@/components/Dashboard/Admin-section/Welcomebanner"
import StatCardGrid from "@/components/Dashboard/Admin-section/StatCardGrid"
import UserStatsCard, {
    type UserStats,
} from "@/components/Dashboard/Admin-section/UserStatsCard"
import QuickActions from "@/components/Dashboard/Admin-section/QuickActions"
import RecentReportsTable from "@/components/Dashboard/Admin-section/RecentReportsTable"

export type DashboardStats = {
    total: number
    pending: number
    inProgress: number
    resolved: number
    rejected: number
}

type Props = {
    session: Session | null
    stats: DashboardStats
    userStats: UserStats | null
    recentReports: Report[]
    isSuperAdmin: boolean
}

export default function AdminDashboardClient({
    session,
    stats,
    userStats,
    recentReports,
    isSuperAdmin,
}: Props) {
    const name = session?.user?.name?.split(" ")[0] ?? "Admin"

    return (
        <div className="space-y-6">
            <WelcomeBanner
                name={name}
                isSuperAdmin={isSuperAdmin}
                stats={stats}
            />

            <StatCardGrid stats={stats} />

            {isSuperAdmin && userStats && (
                <UserStatsCard userStats={userStats} />
            )}

            <QuickActions
                pending={stats.pending}
                inProgress={stats.inProgress}
                totalUsers={userStats?.total ?? 0}
                isSuperAdmin={isSuperAdmin}
            />

            <RecentReportsTable reports={recentReports} />
        </div>
    )
}