"use client"

import { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import {
    Trophy,
    Medal,
    Award,
    Star,
    ClipboardList,
    CheckCircle2,
    Flame,
    Search,
} from "lucide-react"
import { getUsers } from "@/lib/user.api"
import type { User } from "@/lib/user.api"
import { POINTS_CONFIG } from "@/lib/constant"
import UserRankCard from "@/components/leaderboard/UserRankCard"

function getRankIcon(rank: number) {
    if (rank === 1) return <Trophy size={14} style={{ color: "#F59E0B" }} />
    if (rank === 2) return <Medal size={14} style={{ color: "#9CA3AF" }} />
    if (rank === 3) return <Award size={14} style={{ color: "#D97706" }} />
    return <Star size={12} style={{ color: "#D1D5DB" }} />
}

const POINT_RULES = [
    { icon: <ClipboardList size={14} />, label: "Buat laporan", key: "CREATE_REPORT" as const, color: "#0F766E" },
    { icon: <CheckCircle2 size={14} />,  label: "Laporan diterima", key: "IN_PROGRESS" as const, color: "#F59E0B" },
    { icon: <Flame size={14} />,         label: "Laporan selesai", key: "RESOLVED" as const, color: "#EA580C" },
]

export default function LeaderboardPage() {
    const { data: session, status } = useSession()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (status !== "authenticated") return
        getUsers()
            .then(setUsers)
            .finally(() => setLoading(false))
    }, [status])

    const sorted = useMemo(
        () =>
            [...users]
                .filter((u) => u.role === "user")
                .sort((a, b) => b.points - a.points),
        [users]
    )

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return sorted.filter(
            (u) =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q)
        )
    }, [sorted, search])

    const currentUserId = Number(session?.user?.id)
    const currentUser = sorted.find((u) => u.id === currentUserId)
    const myRank = currentUser
        ? sorted.findIndex((u) => u.id === currentUserId) + 1
        : 0

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div
                    className="h-8 w-8 animate-spin rounded-full"
                    style={{ border: "3px solid #CCFBF1", borderTopColor: "#0F766E" }}
                />
            </div>
        )
    }

    return (
        <div className="w-full space-y-5">
            {/* Header */}
            <div
                className="flex items-center justify-between rounded-2xl px-5 py-4"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                            boxShadow: "0 4px 12px rgba(245,158,11,0.25)",
                        }}
                    >
                        <Trophy size={20} style={{ color: "#fff" }} />
                    </div>
                    <div>
                        <h1 className="text-[20px] font-extrabold tracking-tight" style={{ color: "#111827" }}>
                            Leaderboard
                        </h1>
                        <p className="mt-0.5 text-[13px]" style={{ color: "#6B7280" }}>
                            Peringkat warga aktif
                        </p>
                    </div>
                </div>
            </div>

            {/* My rank card */}
            {currentUser && (
                <UserRankCard
                    currentUser={currentUser}
                    rank={myRank}
                    totalUsers={sorted.length}
                />
            )}

            {/* Point rules */}
            <div className="grid gap-3 sm:grid-cols-3">
                {POINT_RULES.map((p) => (
                    <div
                        key={p.label}
                        className="flex items-center gap-3 rounded-2xl p-4"
                        style={{
                            background: "#FCFBF8",
                            border: "1px solid #E8E4D9",
                            boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                        }}
                    >
                        <div
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                            style={{ background: "#FCFBF8", color: p.color, border: `1px solid ${p.color}30` }}
                        >
                            {p.icon}
                        </div>
                        <div>
                            <p className="text-[12px]" style={{ color: "#6B7280" }}>{p.label}</p>
                            <p className="text-[15px] font-extrabold" style={{ color: p.color }}>
                                +{POINTS_CONFIG[p.key]} poin
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div
                className="rounded-2xl px-4 py-3"
                style={{ background: "#FCFBF8", border: "1px solid #E8E4D9", boxShadow: "0 1px 3px rgba(15,118,110,0.04)" }}
            >
                <div className="relative max-w-sm">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
                    <input
                        type="text"
                        placeholder="Cari pengguna..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl py-2 pl-9 pr-3 text-[13px] outline-none transition-all focus:bg-white"
                        style={{ background: "#F8F6F0", border: "1px solid #E8E4D9", color: "#374151" }}
                    />
                </div>
            </div>

            {/* Leaderboard table */}
            <div
                className="overflow-hidden rounded-2xl"
                style={{ background: "#FCFBF8", border: "1px solid #E8E4D9", boxShadow: "0 1px 3px rgba(15,118,110,0.04)" }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr
                                className="text-left text-[11px] font-bold uppercase tracking-wider"
                                style={{ background: "#F1EDE2", color: "#6B7280", borderBottom: "1px solid #E8E4D9" }}
                            >
                                <th className="w-16 px-5 py-3">#</th>
                                <th className="px-4 py-3">Pengguna</th>
                                <th className="px-4 py-3 text-right">Poin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u, idx) => {
                                const rank = sorted.indexOf(u) + 1
                                const isMe = u.id === currentUserId
                                const isTop3 = rank <= 3

                                return (
                                    <tr
                                        key={u.id}
                                        className="transition-colors"
                                        style={{
                                            borderBottom: idx < filtered.length - 1 ? "1px solid #F1EDE2" : undefined,
                                            background: isMe
                                                ? "linear-gradient(90deg, rgba(20,184,166,0.08), transparent 70%)"
                                                : rank === 1
                                                    ? "linear-gradient(90deg, rgba(245,158,11,0.08), transparent 70%)"
                                                    : idx % 2 !== 0 ? "#F8F6F0" : "#FCFBF8",
                                        }}
                                    >
                                        {/* Rank */}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-bold"
                                                    style={
                                                        isTop3
                                                            ? {
                                                                  background: rank === 1 ? "linear-gradient(135deg, #F59E0B, #EA580C)" : rank === 2 ? "#E8E4D9" : "#FEF3C7",
                                                                  color: rank === 1 ? "#fff" : rank === 2 ? "#5F5E5A" : "#92400E",
                                                                  boxShadow: rank === 1 ? "0 4px 10px rgba(245,158,11,0.30)" : "none",
                                                              }
                                                            : { background: "#F1EDE2", color: "#9CA3AF" }
                                                    }
                                                >
                                                    {rank}
                                                </div>
                                                {getRankIcon(rank)}
                                            </div>
                                        </td>

                                        {/* User */}
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                                                    style={{
                                                        background: isTop3
                                                            ? "linear-gradient(135deg, #F59E0B, #EA580C)"
                                                            : "linear-gradient(135deg, #0F766E, #14B8A6)",
                                                    }}
                                                >
                                                    {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="flex items-center gap-1.5 truncate font-bold" style={{ color: "#111827" }}>
                                                        {u.name}
                                                        {isMe && (
                                                            <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: "#CCFBF1", color: "#0F766E" }}>
                                                                Kamu
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="truncate text-[11px]" style={{ color: "#9CA3AF" }}>{u.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Points */}
                                        <td className="px-4 py-3.5 text-right">
                                            <span
                                                className="text-[16px] font-extrabold"
                                                style={{ color: rank === 1 ? "#F59E0B" : "#0F766E" }}
                                            >
                                                {u.points.toLocaleString("id-ID")}
                                            </span>
                                            <span className="ml-1 text-[10px] uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
                                                pts
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div
                    className="flex items-center justify-center gap-2 px-5 py-3 text-[12px]"
                    style={{ background: "#F8F6F0", borderTop: "1px solid #F1EDE2", color: "#6B7280" }}
                >
                    <Trophy size={12} style={{ color: "#F59E0B" }} />
                    Terus buat laporan untuk naik peringkat
                </div>
            </div>
        </div>
    )
}