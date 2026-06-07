"use client"

import { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import {
    Edit3,
    Trophy,
    FileText,
    CheckCircle2,
    Loader,
    ClipboardList,
    Flame,
} from "lucide-react"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import { POINTS_CONFIG, USER_ROLE_LABELS } from "@/lib/constant"
import RoleBadge from "@/components/common-ui/RoleBadge"
import StatusBadge from "@/components/common-ui/StatusBadge"
import { useRealtimePoints } from "@/hooks/useRealtimePoints"
import EditProfileModal from "@/components/common-ui/EditProfileModal"

function getLevel(points: number) {
    if (points >= 500) return { label: "Warga Aktif", stars: 3, next: 1000 }
    if (points >= 200) return { label: "Kontributor", stars: 2, next: 500 }
    if (points >= 50) return { label: "Pemula", stars: 1, next: 200 }
    return { label: "Baru", stars: 0, next: 50 }
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function ProfileView() {
    const { data: session, status } = useSession()
    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)
    const [editOpen, setEditOpen] = useState(false)

    const name = session?.user?.name ?? "Pengguna"
    const email = session?.user?.email ?? ""
    const avatarUrl = session?.user?.avatar_url
    const points = useRealtimePoints()
    const role = (session?.user?.role ?? "user") as "user" | "admin" | "superadmin"
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    const isUser = role === "user"

    useEffect(() => {
        if (status !== "authenticated") return
        const fetchData = async () => {
            try {
                const data = isUser
                    ? (await getReports()).filter(
                          (r) => r.user_id === Number(session?.user?.id)
                      )
                    : await getReports()

                setReports(data)
            } catch (e) {
                console.warn(e)
            }

            setLoading(false)
        }

        void fetchData()
    }, [status, session?.user?.id, isUser])

    const level = getLevel(points)
    const pct = Math.min(Math.round((points / level.next) * 100), 100)

    const total = reports.length
    const resolved = reports.filter((r) => r.status === "Resolved").length
    const inProgress = reports.filter((r) => r.status === "In Progress").length

    // System-wide stats for admin/superadmin
    const totalUsers = useMemo(() => {
        const ids = new Set(reports.map((r) => r.user_id))
        return ids.size
    }, [reports])

    const pending = reports.filter((r) => r.status === "Pending").length
    const rejected = reports.filter((r) => r.status === "Rejected").length

    const recent = useMemo(
        () =>
            [...reports]
                .sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                )
                .slice(0, 5),
        [reports]
    )

    return (
        <div className="w-full space-y-5">
            {/* ── Profile header card ── */}
            <div
                className="overflow-hidden rounded-2xl"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                {/* Cover */}
                <div
                    className="h-24"
                    style={{
                        background:
                            "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #F59E0B 100%)",
                    }}
                />

                <div className="px-6 pb-5">
                    {/* Avatar row */}
                    <div className="-mt-8 mb-4 flex items-end justify-between">
                        <div
                            className="flex h-16 w-16 items-center justify-center rounded-2xl text-[20px] font-black text-white overflow-hidden"
                            style={{
                                background:
                                    avatarUrl ? "none" : "linear-gradient(135deg, #115E59, #0F766E)",
                                border: "4px solid #FCFBF8",
                                boxShadow: "0 4px 14px rgba(15,118,110,0.30)",
                            }}
                        >
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
                            ) : (
                                initials
                            )}
                        </div>
                        <button
                            onClick={() => setEditOpen(true)}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 mt-10 text-[12px] font-semibold transition-all hover:-translate-y-0.5"
                            style={{
                                background: "#F8F6F0",
                                border: "1px solid #E8E4D9",
                                color: "#0F766E",
                            }}
                        >
                            <Edit3 size={12} />
                            Edit Profil
                        </button>
                        <EditProfileModal
                            open={editOpen}
                            onClose={() => setEditOpen(false)}
                        />
                    </div>

                    {/* Info row */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1
                                className="text-[18px] font-extrabold"
                                style={{ color: "#111827" }}
                            >
                                {name}
                            </h1>
                            <p
                                className="mt-0.5 text-[13px]"
                                style={{ color: "#9CA3AF" }}
                            >
                                {email}
                            </p>
                            <div className="mt-2">
                                <RoleBadge role={role} />
                            </div>
                        </div>

                        {/* Points + level — user only */}
                        {isUser && (
                            <div className="text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                    <Trophy
                                        size={16}
                                        style={{ color: "#F59E0B" }}
                                    />
                                    <span
                                        className="text-[24px] font-black"
                                        style={{ color: "#111827" }}
                                    >
                                        {points.toLocaleString("id-ID")}
                                    </span>
                                    <span
                                        className="mb-0.5 self-end text-[12px]"
                                        style={{ color: "#9CA3AF" }}
                                    >
                                        poin
                                    </span>
                                </div>
                                <p
                                    className="text-[11px] font-semibold"
                                    style={{ color: "#F59E0B" }}
                                >
                                    {level.label}{" "}
                                    {"★".repeat(level.stars)}
                                </p>
                                {/* Progress */}
                                <div className="ml-auto mt-1.5 w-32">
                                    <div
                                        className="h-1.5 w-full rounded-full"
                                        style={{ background: "#E8E4D9" }}
                                    >
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{
                                                width: `${pct}%`,
                                                background:
                                                    "linear-gradient(90deg, #0F766E, #14B8A6)",
                                            }}
                                        />
                                    </div>
                                    <p
                                        className="mt-0.5 text-[10px]"
                                        style={{ color: "#9CA3AF" }}
                                    >
                                        {points} / {level.next} ke level
                                        berikutnya
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    {
                        icon: <FileText size={16} />,
                        label: "Total Laporan",
                        value: total,
                        iconBg: "#CCFBF1",
                        iconColor: "#0F766E",
                        valueColor: "#0F766E",
                    },
                    {
                        icon: <CheckCircle2 size={16} />,
                        label: "Selesai",
                        value: resolved,
                        iconBg: "#D1FAE5",
                        iconColor: "#065F46",
                        valueColor: "#065F46",
                    },
                    {
                        icon: <Loader size={16} />,
                        label: "Diproses",
                        value: inProgress,
                        iconBg: "#FEF3C7",
                        iconColor: "#92400E",
                        valueColor: "#92400E",
                    },
                ].map((s) => (
                    <div
                        key={s.label}
                        className="rounded-xl px-4 py-4"
                        style={{
                            background: "#FCFBF8",
                            border: "1px solid #E8E4D9",
                        }}
                    >
                        <div
                            className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg"
                            style={{
                                background: s.iconBg,
                                color: s.iconColor,
                            }}
                        >
                            {s.icon}
                        </div>
                        <p
                            className="text-[22px] font-extrabold"
                            style={{ color: s.valueColor }}
                        >
                            {loading ? (
                                <span className="skeleton inline-block h-5 w-8" />
                            ) : (
                                s.value
                            )}
                        </p>
                        <p
                            className="mt-0.5 text-[11px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Points guide removed from profile; centralized in PointsGuide component */}

            {/* ── Recent reports (user) / System overview (admin) ── */}
            {isUser ? (
                <div
                    className="overflow-hidden rounded-xl"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                    }}
                >
                    <div
                        className="flex items-center justify-between px-5 py-3.5"
                        style={{ borderBottom: "1px solid #F1EDE2" }}
                    >
                        <p
                            className="text-[13px] font-bold"
                            style={{ color: "#111827" }}
                        >
                            Laporan Terbaru
                        </p>
                        <span
                            className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                            style={{ background: "#F1EDE2", color: "#5F5E5A" }}
                        >
                            {reports.length}
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex h-24 items-center justify-center">
                            <div
                                className="h-5 w-5 animate-spin rounded-full"
                                style={{
                                    border: "2px solid #CCFBF1",
                                    borderTopColor: "#0F766E",
                                }}
                            />
                        </div>
                    ) : recent.length === 0 ? (
                        <div
                            className="py-8 text-center text-[13px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            Belum ada laporan
                        </div>
                    ) : (
                        <div>
                            {recent.map((r, idx) => (
                                <div
                                    key={r.id}
                                    className="flex items-center gap-3 px-5 py-3"
                                    style={{
                                        borderBottom:
                                            idx < recent.length - 1
                                                ? "1px solid #F1EDE2"
                                                : undefined,
                                        background:
                                            idx % 2 !== 0 ? "#F8F6F0" : "#FCFBF8",
                                    }}
                                >
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="truncate text-[13px] font-semibold"
                                            style={{ color: "#111827" }}
                                        >
                                            {r.title}
                                        </p>
                                        <p
                                            className="mt-0.5 text-[11px]"
                                            style={{ color: "#9CA3AF" }}
                                        >
                                            {r.category} · {formatDate(r.created_at)}
                                        </p>
                                    </div>
                                    <StatusBadge status={r.status} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="grid gap-4 sm:grid-cols-2"
                >
                    {/* System stats */}
                    {[
                        { label: "Total Laporan", value: total, color: "#0F766E", bg: "#CCFBF1" },
                        { label: "Pending", value: pending, color: "#F59E0B", bg: "#FEF3C7" },
                        { label: "Selesai", value: resolved, color: "#065F46", bg: "#D1FAE5" },
                        { label: "Pelapor Aktif", value: totalUsers, color: "#1E40AF", bg: "#DBEAFE" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl px-5 py-4"
                            style={{
                                background: "#FCFBF8",
                                border: "1px solid #E8E4D9",
                            }}
                        >
                            <p className="text-[28px] font-black" style={{ color: s.color }}>
                                {loading ? "-" : s.value}
                            </p>
                            <p className="mt-1 text-[12px]" style={{ color: "#6B7280" }}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}