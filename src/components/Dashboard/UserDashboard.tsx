"use client"

import type { Report } from "@/lib/report.api"
import UserWelcomeBanner from "@/components/Dashboard/users-section/WelcomeBanner"
import UserStatCards, {
    type UserStats,
} from "@/components/Dashboard/users-section/UserStatCard"
import UserLevelCard from "@/components/Dashboard/users-section/UserLevelCard"
import UserQuickActions from "@/components/Dashboard/users-section/UserQuickActions"
import UserRecentReports from "@/components/Dashboard/users-section/UserRecentReports"
import NearbyReports from "@/components/Dashboard/users-section/NearbyReports"

type Props = {
    name: string
    points: number
    stats: UserStats
    myRecentReports: Report[]
    allReports: Report[]
    loading: boolean
}

export default function UserDashboard({
    name,
    points,
    stats,
    myRecentReports,
    allReports,
    loading,
}: Props) {
    return (
        <div className="space-y-5">
            <UserWelcomeBanner
                name={name}
                points={points}
                totalReports={stats.total}
            />

            <UserStatCards stats={stats} loading={loading} />

            <UserQuickActions
                totalReports={stats.total}
                resolvedReports={stats.resolved}
            />

            <UserLevelCard points={points} />

            {/* Laporan sekitar — semua laporan, bukan cuma milik user */}
            <NearbyReports reports={allReports} />

            {/* Laporan saya terbaru — tracking */}
            <UserRecentReports
                reports={myRecentReports}
                loading={loading}
            />
        </div>
    )
}