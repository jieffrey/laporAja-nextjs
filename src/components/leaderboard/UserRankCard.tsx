"use client"

import { Trophy, TrendingUp } from "lucide-react"
import type { User } from "@/lib/user.api"

type Props = {
    currentUser: User
    rank: number
    totalUsers: number
}

function getLevel(points: number) {
    if (points >= 500) return { label: "Warga Aktif", stars: 3 }
    if (points >= 200) return { label: "Kontributor", stars: 2 }
    if (points >= 50) return { label: "Pemula", stars: 1 }
    return { label: "Baru", stars: 0 }
}

export default function UserRankCard({
    currentUser,
    rank,
    totalUsers,
}: Props) {
    const level = getLevel(currentUser.points)
    const topPercent =
        totalUsers > 0 ? Math.round((rank / totalUsers) * 100) : 100

    return (
        <div
            className="relative overflow-hidden rounded-2xl px-5 py-5"
            style={{
                background:
                    "linear-gradient(135deg, #115E59 0%, #0F766E 50%, #14B8A6 100%)",
                boxShadow: "0 8px 24px rgba(15,118,110,0.20)",
            }}
        >
            {/* Dot pattern */}
            <div
                className="pointer-events-none absolute right-0 top-0 h-full w-48"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                    opacity: 0.5,
                }}
            />

            <div className="relative flex flex-wrap items-center gap-6">
                {/* Rank number */}
                <div className="flex flex-col items-center">
                    <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-[28px] font-extrabold"
                        style={{
                            background: "rgba(255,255,255,0.18)",
                            color: "#FCD34D",
                        }}
                    >
                        #{rank}
                    </div>
                    <p
                        className="mt-1.5 text-[10px] font-medium"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                        dari {totalUsers} warga
                    </p>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <p
                        className="text-[11px] font-semibold"
                        style={{ color: "rgba(255,255,255,0.70)" }}
                    >
                        Peringkatmu saat ini
                    </p>
                    <p className="mt-0.5 text-[20px] font-extrabold text-white">
                        {currentUser.name}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3">
                        {/* Level */}
                        <span
                            className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                            style={{
                                background: "rgba(252,211,77,0.25)",
                                color: "#FCD34D",
                            }}
                        >
                            {level.label} {"★".repeat(level.stars)}
                            {"☆".repeat(3 - level.stars)}
                        </span>

                        {/* Top percent */}
                        <span
                            className="flex items-center gap-1 text-[11px] font-medium"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                            <TrendingUp size={12} />
                            Top {topPercent}%
                        </span>
                    </div>
                </div>

                {/* Points */}
                <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                        <Trophy size={18} style={{ color: "#FCD34D" }} />
                        <p className="text-[32px] font-extrabold leading-none text-white">
                            {currentUser.points.toLocaleString("id-ID")}
                        </p>
                    </div>
                    <p
                        className="mt-1 text-[11px] font-medium"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                        poin
                    </p>
                </div>
            </div>
        </div>
    )
}