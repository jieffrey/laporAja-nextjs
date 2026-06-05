"use client"

import type { Report } from "@/lib/report.api"
import WelcomeBanner from "@/components/Dashboard/users-section/WelcomeBanner"
import UserStatCards, {
    type UserStats,
} from "@/components/Dashboard/users-section/UserStatCard"
import UserLevelCard from "@/components/Dashboard/users-section/UserLevelCard"
import UserQuickActions from "@/components/Dashboard/users-section/UserQuickActions"
import UserRecentReports from "@/components/Dashboard/users-section/UserRecentReports"

type Props = {
    name: string
    points: number
    stats: UserStats
    recentReports: Report[]
    loading: boolean
}

export default function UserDashboard({
    name,
    points,
    stats,
    recentReports,
    loading,
}: Props) {
    return (
        <div className="max-w-4xl space-y-5">
            <WelcomeBanner
                name={name}
                points={points}
                totalReports={stats.total}
            />

            <UserStatCards stats={stats} loading={loading} />

            <UserLevelCard points={points} />

            <UserQuickActions
                totalReports={stats.total}
                resolvedReports={stats.resolved}
            />

            <UserRecentReports reports={recentReports} loading={loading} />
        </div>
    )
}