"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { RiEditLine, RiTrophyLine, RiFileList3Line, RiCheckLine, RiTimeLine } from "react-icons/ri"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import { POINTS_CONFIG, USER_ROLE_LABELS } from "@/lib/constant"
import StatusBadge from "@/components/common-ui/StatusBadge"

export default function UserProfilePage() {
    const { data: session, status } = useSession()
    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status !== "authenticated") return
        getReports()
            .then(data => setReports(data.filter(r => r.user_id === Number(session?.user?.id))))
            .finally(() => setLoading(false))
    }, [status, session?.user?.id])

    const name = session?.user?.name ?? "Pengguna"
    const email = session?.user?.email ?? ""
    const points = session?.user?.points ?? 0
    const role = session?.user?.role ?? "user"
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

    const total = reports.length
    const resolved = reports.filter(r => r.status === "Resolved").length
    const inProgress = reports.filter(r => r.status === "In Progress").length
    const recent = [...reports].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)

    // Hitung level berdasarkan poin
    const level = points >= 500 ? "Warga Aktif ⭐⭐⭐" : points >= 200 ? "Kontributor ⭐⭐" : points >= 50 ? "Pemula ⭐" : "Baru"
    const nextLevel = points >= 500 ? 1000 : points >= 200 ? 500 : points >= 50 ? 200 : 50
    const pct = Math.min(Math.round((points / nextLevel) * 100), 100)

    return (
        <div className="space-y-5 w-full">

            {/* Profile card */}
            <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
                {/* Cover */}
                <div className="h-24 bg-gradient-to-r from-zinc-900 to-zinc-800" />

                <div className="px-6 pb-5">
                    {/* Avatar */}
                    <div className="flex items-end justify-between -mt-8 mb-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500 text-[20px] font-black text-white border-4 border-white shadow-md">
                            {initials}
                        </div>
                        <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-[12px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                            <RiEditLine size={13} />
                            Edit Profil
                        </button>
                    </div>

                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-[18px] font-bold text-zinc-900">{name}</h1>
                            <p className="text-[13px] text-zinc-400 mt-0.5">{email}</p>
                            <span className="mt-2 inline-block rounded-full bg-teal-50 border border-teal-100 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700">
                                {USER_ROLE_LABELS[role]}
                            </span>
                        </div>

                        {/* Points + level */}
                        <div className="text-right">
                            <div className="flex items-center gap-1.5 justify-end">
                                <RiTrophyLine size={14} className="text-amber-500" />
                                <span className="text-[24px] font-black text-zinc-900">{points}</span>
                                <span className="text-[12px] text-zinc-400 self-end mb-0.5">poin</span>
                            </div>
                            <p className="text-[11px] text-zinc-400">{level}</p>
                            {/* Progress to next level */}
                            <div className="mt-1.5 w-32 ml-auto">
                                <div className="h-1.5 rounded-full bg-zinc-100">
                                    <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${pct}%` }} />
                                </div>
                                <p className="text-[10px] text-zinc-400 mt-0.5">{points} / {nextLevel} ke level berikutnya</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { icon: RiFileList3Line, label: "Total Laporan", value: total, color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: RiCheckLine, label: "Selesai", value: resolved, color: "text-teal-600", bg: "bg-teal-50" },
                    { icon: RiTimeLine, label: "Diproses", value: inProgress, color: "text-amber-600", bg: "bg-amber-50" },
                ].map(s => (
                    <div key={s.label} className="rounded-xl border border-zinc-200 bg-white px-4 py-4">
                        <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg ${s.bg}`}>
                            <s.icon size={15} className={s.color} />
                        </div>
                        <p className={`text-[22px] font-black ${s.color}`}>
                            {loading ? <span className="inline-block h-5 w-7 animate-pulse rounded bg-zinc-100" /> : s.value}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Points guide */}
            <div className="rounded-xl border border-zinc-200 bg-white px-5 py-4">
                <p className="text-[12px] font-semibold text-zinc-500 mb-3">Cara Dapat Poin</p>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: "Buat laporan", pts: `+${POINTS_CONFIG.CREATE_REPORT}` },
                        { label: "Laporan diproses", pts: `+${POINTS_CONFIG.IN_PROGRESS}` },
                        { label: "Laporan selesai", pts: `+${POINTS_CONFIG.RESOLVED}` },
                    ].map(p => (
                        <div key={p.label} className="flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200 px-3 py-1.5">
                            <span className="text-[12px] font-bold text-teal-600">{p.pts}</span>
                            <span className="text-[11px] text-zinc-500">{p.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent reports */}
            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100">
                    <p className="text-[13px] font-semibold text-zinc-800">Laporan Terbaru</p>
                </div>
                {loading ? (
                    <div className="flex h-24 items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
                    </div>
                ) : recent.length === 0 ? (
                    <div className="py-8 text-center text-[13px] text-zinc-400">Belum ada laporan</div>
                ) : (
                    <div className="divide-y divide-zinc-50">
                        {recent.map(r => (
                            <div key={r.id} className="flex items-center gap-3 px-5 py-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-medium text-zinc-800 truncate">{r.title}</p>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">{r.category}</p>
                                </div>
                                <StatusBadge status={r.status} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}