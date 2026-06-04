"use client"

import Link from "next/link"
import type { Session } from "next-auth"
import type { Report } from "@/lib/report.api"
import { REPORT_STATUS } from "@/lib/constant"
import type { ReportStatus } from "@/lib/constant"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

type Stats = {
    total: number
    pending: number
    inProgress: number
    resolved: number
    rejected: number
}

type UserStats = {
    total: number
    user: number
    admin: number
    superadmin: number
} | null

type Props = {
    session: Session | null
    stats: Stats
    userStats: UserStats
    recentReports: Report[]
    isSuperAdmin: boolean
}

const STAT_CARDS = (s: Stats) => [
    { label: "Total Laporan", value: s.total, icon: "📋", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", href: "/admin/laporan" },
    { label: "Pending", value: s.pending, icon: "🕐", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200", href: "/admin/laporan?status=Pending" },
    { label: "In Progress", value: s.inProgress, icon: "⏳", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", href: "/admin/laporan?status=In+Progress" },
    { label: "Resolved", value: s.resolved, icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", href: "/admin/laporan?status=Resolved" },
    { label: "Rejected", value: s.rejected, icon: "✕", color: "text-red-600", bg: "bg-red-50", border: "border-red-100", href: "/admin/laporan?status=Rejected" },
]

export default function AdminDashboardClient({ session, stats, userStats, recentReports, isSuperAdmin }: Props) {
    const name = session?.user?.name?.split(" ")[0] ?? "Admin"

    // Hitung persentase selesai
    const resolvedPct = stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0

    return (
        <div className="space-y-6 max-w-5xl">

            {/* Welcome banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-5 text-white shadow-lg">
                <div className="absolute right-0 top-0 h-full w-64 opacity-5"
                    style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                />
                <div className="relative flex items-start justify-between">
                    <div>
                        <p className="text-slate-400 text-[13px] font-medium">
                            {isSuperAdmin ? "Super Admin" : "Admin"} Panel
                        </p>
                        <h1 className="mt-0.5 text-[22px] font-extrabold tracking-tight">
                            Selamat datang, {name} 👋
                        </h1>
                        <p className="mt-1.5 text-slate-300 text-[13px]">
                            {stats.pending > 0
                                ? `${stats.pending} laporan menunggu tindakan`
                                : "Semua laporan sudah ditangani 🎉"}
                        </p>
                    </div>
                    <div className="hidden sm:flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                        🏛️
                    </div>
                </div>

                {/* Progress bar resolved */}
                <div className="relative mt-5">
                    <div className="mb-1.5 flex items-center justify-between text-[12px]">
                        <span className="text-slate-400">Progress penyelesaian laporan</span>
                        <span className="font-bold text-white">{resolvedPct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10">
                        <div
                            className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                            style={{ width: `${resolvedPct}%` }}
                        />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-3">
                        {(Object.keys(REPORT_STATUS) as ReportStatus[]).map(s => (
                            <div key={s} className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: REPORT_STATUS[s].dot }} />
                                <span className="text-[11px] text-slate-400">
                                    {REPORT_STATUS[s].label}{" "}
                                    <span className="font-semibold text-white">
                                        {s === "Pending" ? stats.pending
                                            : s === "In Progress" ? stats.inProgress
                                                : s === "Resolved" ? stats.resolved
                                                    : stats.rejected}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {STAT_CARDS(stats).map(s => (
                    <Link key={s.label} href={s.href}
                        className={`group rounded-2xl border ${s.border} bg-white p-4 shadow-sm hover:shadow-md transition-all`}
                    >
                        <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${s.bg} text-lg group-hover:scale-110 transition-transform`}>
                            {s.icon}
                        </div>
                        <p className={`text-[26px] font-extrabold tracking-tight ${s.color}`}>{s.value}</p>
                        <p className="mt-0.5 text-[11px] text-slate-500">{s.label}</p>
                    </Link>
                ))}
            </div>

            {/* User stats — superadmin only */}
            {isSuperAdmin && userStats && (
                <div className="rounded-2xl border border-violet-100 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-sm">👥</span>
                            <p className="text-[14px] font-bold text-slate-900">Statistik Pengguna</p>
                        </div>
                        <Link href="/admin/users" className="text-[12px] font-medium text-violet-600 hover:underline">
                            Kelola →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
                        {[
                            { label: "Total User", value: userStats.total, color: "text-slate-800" },
                            { label: "User Biasa", value: userStats.user, color: "text-blue-600" },
                            { label: "Admin", value: userStats.admin, color: "text-amber-600" },
                            { label: "Super Admin", value: userStats.superadmin, color: "text-violet-600" },
                        ].map(u => (
                            <div key={u.label} className="px-5 py-4 text-center">
                                <p className={`text-[28px] font-extrabold ${u.color}`}>{u.value}</p>
                                <p className="text-[11px] text-slate-400 mt-0.5">{u.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick actions */}
            <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/admin/laporan"
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
                >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl group-hover:bg-blue-100 transition-colors">📋</div>
                    <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-slate-900">Kelola Laporan</p>
                        <p className="text-[12px] text-slate-400 truncate">
                            {stats.pending} laporan pending · {stats.inProgress} in progress
                        </p>
                    </div>
                    <span className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0">→</span>
                </Link>

                {isSuperAdmin && (
                    <Link href="/admin/users"
                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-violet-200 hover:shadow-md transition-all"
                    >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xl group-hover:bg-violet-100 transition-colors">👥</div>
                        <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-slate-900">Kelola Pengguna</p>
                            <p className="text-[12px] text-slate-400">
                                {userStats?.total ?? 0} pengguna terdaftar
                            </p>
                        </div>
                        <span className="ml-auto text-slate-300 group-hover:text-violet-400 transition-colors flex-shrink-0">→</span>
                    </Link>
                )}
            </div>

            {/* Recent reports table */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <p className="text-[14px] font-bold text-slate-900">Laporan Terbaru</p>
                    <Link href="/admin/laporan" className="text-[12px] text-blue-600 hover:underline font-medium">
                        Lihat semua →
                    </Link>
                </div>

                {recentReports.length === 0 ? (
                    <div className="py-14 text-center">
                        <p className="text-4xl mb-3">📭</p>
                        <p className="text-[14px] font-semibold text-slate-600">Belum ada laporan masuk</p>
                        <p className="text-[12px] text-slate-400 mt-1">Laporan dari warga akan muncul di sini</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-[13px]">
                            <thead>
                                <tr className="bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                    <th className="px-5 py-3">Laporan</th>
                                    <th className="px-4 py-3 hidden sm:table-cell">Kategori</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Pelapor</th>
                                    <th className="px-4 py-3 hidden lg:table-cell">Tanggal</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentReports.map(r => (
                                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-5 py-3.5 max-w-[200px]">
                                            <p className="font-semibold text-slate-900 truncate">{r.title}</p>
                                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{r.description}</p>
                                        </td>
                                        <td className="px-4 py-3.5 hidden sm:table-cell">
                                            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 whitespace-nowrap">
                                                {r.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <PriorityBadge priority={r.priority} />
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <StatusBadge status={r.status} />
                                        </td>
                                        <td className="px-4 py-3.5 hidden md:table-cell">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 flex-shrink-0">
                                                    {r.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-slate-600 truncate max-w-[100px]">{r.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap hidden lg:table-cell">
                                            {new Date(r.created_at).toLocaleDateString("id-ID", {
                                                day: "numeric", month: "short", year: "numeric"
                                            })}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <Link
                                                href={`/admin/laporan/${r.id}`}
                                                className="inline-flex items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-[12px] font-semibold text-blue-600 hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                Review →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}