"use client"

import { useState, useMemo } from "react"
import {
    Search,
    Trophy,
    Medal,
    Award,
    Star,
} from "lucide-react"
import type { User } from "@/lib/user.api"
import RoleBadge from "@/components/common-ui/RoleBadge"

type Props = {
    users: User[]
}

import PointsGuide from "@/components/common-ui/PointsGuide"

function getRankIcon(rank: number) {
    if (rank === 1) return <Trophy size={14} style={{ color: "#F59E0B" }} />
    if (rank === 2) return <Medal size={14} style={{ color: "#9CA3AF" }} />
    if (rank === 3) return <Award size={14} style={{ color: "#D97706" }} />
    return <Star size={12} style={{ color: "#D1D5DB" }} />
}

export default function PointsLeaderboard({ users }: Props) {
    const [search, setSearch] = useState("")

    const sorted = useMemo(
        () => [...users].sort((a, b) => b.points - a.points),
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

    return (
        <div className="space-y-5">
            {/* Point rules */}
            <PointsGuide />

            {/* Search */}
            <div
                className="rounded-2xl px-4 py-3"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                <div className="relative max-w-sm">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#9CA3AF" }}
                    />
                    <input
                        type="text"
                        placeholder="Cari pengguna..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl py-2 pl-9 pr-3 text-[13px] outline-none transition-all focus:bg-white"
                        style={{
                            background: "#F8F6F0",
                            border: "1px solid #E8E4D9",
                            color: "#374151",
                        }}
                    />
                </div>
            </div>

            {/* Leaderboard table */}
            <div
                className="overflow-hidden rounded-2xl"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                {/* Table header hint */}
                <div
                    className="flex items-center justify-between px-5 py-3.5"
                    style={{ borderBottom: "1px solid #F1EDE2" }}
                >
                    <div className="flex items-center gap-2">
                        <Trophy size={14} style={{ color: "#F59E0B" }} />
                        <p
                            className="text-[14px] font-bold"
                            style={{ color: "#111827" }}
                        >
                            Peringkat Pengguna
                        </p>
                    </div>
                    <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                        style={{ background: "#F1EDE2", color: "#5F5E5A" }}
                    >
                        {filtered.length} pengguna
                    </span>
                </div>

                {filtered.length === 0 ? (
                    <div className="py-12 text-center">
                        <p
                            className="text-[13px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            Tidak ada pengguna ditemukan
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-[13px]">
                            <thead>
                                <tr
                                    className="text-left text-[11px] font-bold uppercase tracking-wider"
                                    style={{
                                        background: "#F1EDE2",
                                        color: "#6B7280",
                                        borderBottom: "1px solid #E8E4D9",
                                    }}
                                >
                                    <th className="w-16 px-5 py-3">#</th>
                                    <th className="px-4 py-3">Pengguna</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3 text-right">
                                        Poin
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((u, idx) => {
                                    const rank = sorted.indexOf(u) + 1
                                    const isTop3 = rank <= 3

                                    return (
                                        <tr
                                            key={u.id}
                                            className="transition-colors"
                                            style={{
                                                borderBottom:
                                                    idx < filtered.length - 1
                                                        ? "1px solid #F1EDE2"
                                                        : undefined,
                                                background:
                                                    rank === 1
                                                        ? "linear-gradient(90deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0) 70%)"
                                                        : idx % 2 !== 0
                                                            ? "#F8F6F0"
                                                            : "#FCFBF8",
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
                                                                    background:
                                                                        rank === 1
                                                                            ? "linear-gradient(135deg, #F59E0B, #EA580C)"
                                                                            : rank === 2
                                                                                ? "#E8E4D9"
                                                                                : "#FEF3C7",
                                                                    color:
                                                                        rank === 1
                                                                            ? "#fff"
                                                                            : rank === 2
                                                                                ? "#5F5E5A"
                                                                                : "#92400E",
                                                                    boxShadow:
                                                                        rank === 1
                                                                            ? "0 4px 10px rgba(245,158,11,0.30)"
                                                                            : "none",
                                                                }
                                                                : {
                                                                    background: "#F1EDE2",
                                                                    color: "#9CA3AF",
                                                                }
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
                                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                                                        style={{
                                                            background:
                                                                isTop3
                                                                    ? "linear-gradient(135deg, #F59E0B, #EA580C)"
                                                                    : "linear-gradient(135deg, #0F766E, #14B8A6)",
                                                        }}
                                                    >
                                                        {u.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .slice(0, 2)
                                                            .join("")
                                                            .toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p
                                                            className="truncate font-bold"
                                                            style={{
                                                                color: "#111827",
                                                            }}
                                                        >
                                                            {u.name}
                                                        </p>
                                                        <p
                                                            className="truncate text-[11px]"
                                                            style={{
                                                                color: "#9CA3AF",
                                                            }}
                                                        >
                                                            {u.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role */}
                                            <td className="px-4 py-3.5">
                                                <RoleBadge role={u.role} />
                                            </td>

                                            {/* Points */}
                                            <td className="px-4 py-3.5 text-right">
                                                <span
                                                    className="text-[16px] font-extrabold"
                                                    style={{
                                                        color:
                                                            rank === 1
                                                                ? "#F59E0B"
                                                                : "#0F766E",
                                                    }}
                                                >
                                                    {u.points.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </span>
                                                <span
                                                    className="ml-1 text-[10px] uppercase tracking-wider"
                                                    style={{ color: "#9CA3AF" }}
                                                >
                                                    pts
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer hint */}
                <div
                    className="flex items-center justify-center gap-2 px-5 py-3 text-[12px]"
                    style={{
                        background: "#F8F6F0",
                        borderTop: "1px solid #F1EDE2",
                        color: "#6B7280",
                    }}
                >
                    <Trophy size={12} style={{ color: "#F59E0B" }} />
                    Poin diperbarui secara otomatis setelah laporan diproses
                </div>
            </div>
        </div>
    )
}