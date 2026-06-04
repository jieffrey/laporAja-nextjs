import Link from "next/link"
import { Users, ArrowRight } from "lucide-react"

export type UserStats = {
    total: number
    user: number
    admin: number
    superadmin: number
}

type StatItem = {
    label: string
    value: number
    color: string
}

const buildItems = (s: UserStats): StatItem[] => [
    { label: "Total User",  value: s.total,      color: "#111827" },
    { label: "User Biasa",  value: s.user,       color: "#0F766E" },
    { label: "Admin",       value: s.admin,      color: "#14B8A6" },
    { label: "Super Admin", value: s.superadmin, color: "#EA580C" },
]

type Props = {
    userStats: UserStats
}

export default function UserStatsCard({ userStats }: Props) {
    const items = buildItems(userStats)

    return (
        <div
            className="overflow-hidden rounded-2xl"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: "1px solid #F1EDE2" }}
            >
                <div className="flex items-center gap-2">
                    <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{ background: "#FEF3C7", color: "#92400E" }}
                    >
                        <Users size={14} />
                    </span>
                    <p
                        className="text-[14px] font-bold"
                        style={{ color: "#111827" }}
                    >
                        Statistik Pengguna
                    </p>
                </div>
                <Link
                    href="/admin/users"
                    className="flex items-center gap-1 text-[12px] font-semibold hover:underline"
                    style={{ color: "#EA580C" }}
                >
                    Kelola <ArrowRight size={12} />
                </Link>
            </div>

            {/* Stats row */}
            <div
                className="grid grid-cols-2 sm:grid-cols-4"
                style={{ background: "#FCFBF8" }}
            >
                {items.map((u, i) => (
                    <div
                        key={u.label}
                        className="px-5 py-4 text-center"
                        style={{
                            borderRight:
                                i < items.length - 1 ? "1px solid #F1EDE2" : undefined,
                        }}
                    >
                        <p
                            className="text-[28px] font-extrabold"
                            style={{ color: u.color }}
                        >
                            {u.value}
                        </p>
                        <p className="mt-0.5 text-[11px]" style={{ color: "#9CA3AF" }}>
                            {u.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}