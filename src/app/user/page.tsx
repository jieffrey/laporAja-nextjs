"use client"

import { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import {
    FileText,
    CheckCircle2,
    Loader,
    Clock,
    PlusCircle,
    List,
    ArrowRight,
    Inbox,
    Sparkles,
    Trophy,
    ClipboardList,
    Flame,
} from "lucide-react"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import { POINTS_CONFIG } from "@/lib/constant"
import StatusBadge from "@/components/common-ui/StatusBadge"

export default function UserDashboardPage() {
    const { data: session, status } = useSession()
    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status !== "authenticated") return
        getReports()
            .then((data) => {
                const userId = Number(session?.user?.id)
                setReports(data.filter((r) => r.user_id === userId))
            })
            .finally(() => setLoading(false))
    }, [status, session?.user?.id])

    const name = session?.user?.name?.split(" ")[0] ?? "Pengguna"
    const points = session?.user?.points ?? 0
    const total = reports.length
    const resolved = reports.filter((r) => r.status === "Resolved").length
    const inProgress = reports.filter((r) => r.status === "In Progress").length
    const pending = reports.filter((r) => r.status === "Pending").length

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

    const STATS = [
        {
            label: "Total Laporan",
            value: total,
            icon: <FileText size={16} />,
            iconBg: "#CCFBF1",
            iconColor: "#0F766E",
            valueColor: "#0F766E",
        },
        {
            label: "Selesai",
            value: resolved,
            icon: <CheckCircle2 size={16} />,
            iconBg: "#D1FAE5",
            iconColor: "#065F46",
            valueColor: "#065F46",
        },
        {
            label: "Diproses",
            value: inProgress,
            icon: <Loader size={16} />,
            iconBg: "#FEF3C7",
            iconColor: "#92400E",
            valueColor: "#92400E",
        },
        {
            label: "Pending",
            value: pending,
            icon: <Clock size={16} />,
            iconBg: "#F1EDE2",
            iconColor: "#5F5E5A",
            valueColor: "#5F5E5A",
        },
    ]

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })

    return (
        <div className="w-full space-y-5">
            {/* ── Welcome banner ── */}
            <div
                className="relative overflow-hidden rounded-2xl px-6 py-5 text-white"
                style={{
                    background:
                        "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #F59E0B 100%)",
                    boxShadow: "0 12px 32px rgba(15,118,110,0.20)",
                }}
            >
                <div
                    className="pointer-events-none absolute right-0 top-0 h-full w-64"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.20) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                        opacity: 0.5,
                    }}
                />
                <div className="relative flex items-start justify-between gap-4">
                    <div>
                        <p
                            className="flex items-center gap-1.5 text-[13px] font-semibold"
                            style={{ color: "rgba(255,255,255,0.80)" }}
                        >
                            Selamat datang kembali
                        </p>
                        <h1 className="mt-0.5 text-[22px] font-extrabold tracking-tight">
                            {name}
                        </h1>
                        <p
                            className="mt-1.5 flex items-center gap-1.5 text-[13px]"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                            {total === 0 ? (
                                "Belum ada laporan. Yuk mulai kontribusi!"
                            ) : (
                                <>
                                    Kamu sudah membuat {total} laporan{" "}
                                    <Sparkles size={14} />
                                </>
                            )}
                        </p>
                    </div>
                    <div
                        className="hidden flex-shrink-0 flex-col items-center justify-center rounded-2xl px-4 py-3 sm:flex"
                        style={{
                            background: "rgba(255,255,255,0.18)",
                            border: "1px solid rgba(255,255,255,0.20)",
                        }}
                    >
                        <div className="flex items-center gap-1">
                            <Trophy size={16} />
                            <p className="text-[28px] font-extrabold leading-none">
                                {points.toLocaleString("id-ID")}
                            </p>
                        </div>
                        <p
                            className="mt-1 text-[11px] font-medium"
                            style={{ color: "rgba(255,255,255,0.80)" }}
                        >
                            Poin Kamu
                        </p>
                    </div>
                </div>

                {/* Point rules strip */}
                <div className="relative mt-4 flex flex-wrap gap-2">
                    {[
                        {
                            icon: <ClipboardList size={11} />,
                            label: "Buat laporan",
                            pts: `+${POINTS_CONFIG.CREATE_REPORT}`,
                        },
                        {
                            icon: <Loader size={11} />,
                            label: "In Progress",
                            pts: `+${POINTS_CONFIG.IN_PROGRESS}`,
                        },
                        {
                            icon: <Flame size={11} />,
                            label: "Resolved",
                            pts: `+${POINTS_CONFIG.RESOLVED}`,
                        },
                    ].map((p) => (
                        <div
                            key={p.label}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1"
                            style={{
                                background: "rgba(255,255,255,0.14)",
                                border: "1px solid rgba(255,255,255,0.18)",
                            }}
                        >
                            {p.icon}
                            <span className="text-[12px] font-bold">
                                {p.pts}
                            </span>
                            <span
                                className="text-[11px]"
                                style={{ color: "rgba(255,255,255,0.80)" }}
                            >
                                {p.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {STATS.map((s) => (
                    <div
                        key={s.label}
                        className="rounded-2xl px-4 py-4"
                        style={{
                            background: "#FCFBF8",
                            border: "1px solid #E8E4D9",
                            boxShadow:
                                "0 1px 3px rgba(15,118,110,0.04)",
                        }}
                    >
                        <div
                            className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                            style={{
                                background: s.iconBg,
                                color: s.iconColor,
                            }}
                        >
                            {s.icon}
                        </div>
                        <p
                            className="text-[24px] font-extrabold tracking-tight"
                            style={{ color: s.valueColor }}
                        >
                            {loading ? (
                                <span className="skeleton inline-block h-6 w-8" />
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

            {/* ── Quick actions ── */}
            <div className="grid gap-3 sm:grid-cols-2">
                <Link
                    href="/user/laporan/buat"
                    className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                        boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                    }}
                >
                    <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{
                            background:
                                "linear-gradient(135deg, #0F766E, #14B8A6)",
                            color: "#fff",
                            boxShadow:
                                "0 4px 12px rgba(15,118,110,0.25)",
                        }}
                    >
                        <PlusCircle size={20} />
                    </div>
                    <div>
                        <p
                            className="text-[14px] font-bold"
                            style={{ color: "#111827" }}
                        >
                            Buat Laporan Baru
                        </p>
                        <p
                            className="text-[12px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            Laporkan masalah di sekitarmu
                        </p>
                    </div>
                    <ArrowRight
                        size={16}
                        className="ml-auto flex-shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: "#0F766E" }}
                    />
                </Link>
                <Link
                    href="/user/laporan"
                    className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                        boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                    }}
                >
                    <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{
                            background: "#CCFBF1",
                            color: "#0F766E",
                        }}
                    >
                        <List size={20} />
                    </div>
                    <div>
                        <p
                            className="text-[14px] font-bold"
                            style={{ color: "#111827" }}
                        >
                            Lihat Laporan Saya
                        </p>
                        <p
                            className="text-[12px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            {total} laporan · {resolved} selesai
                        </p>
                    </div>
                    <ArrowRight
                        size={16}
                        className="ml-auto flex-shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: "#0F766E" }}
                    />
                </Link>
            </div>

            {/* ── Recent reports ── */}
            <div
                className="overflow-hidden rounded-2xl"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: "1px solid #F1EDE2" }}
                >
                    <p
                        className="text-[14px] font-bold"
                        style={{ color: "#111827" }}
                    >
                        Laporan Terbaru
                    </p>
                    <Link
                        href="/user/laporan"
                        className="flex items-center gap-1 text-[12px] font-semibold hover:underline"
                        style={{ color: "#0F766E" }}
                    >
                        Lihat semua <ArrowRight size={12} />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex h-32 items-center justify-center">
                        <div
                            className="h-6 w-6 animate-spin rounded-full"
                            style={{
                                border: "2px solid #CCFBF1",
                                borderTopColor: "#0F766E",
                            }}
                        />
                    </div>
                ) : recent.length === 0 ? (
                    <div className="py-10 text-center">
                        <div
                            className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl"
                            style={{
                                background: "#CCFBF1",
                                color: "#0F766E",
                            }}
                        >
                            <Inbox size={22} />
                        </div>
                        <p
                            className="text-[13px] font-semibold"
                            style={{ color: "#374151" }}
                        >
                            Belum ada laporan
                        </p>
                        <p
                            className="mt-1 text-[12px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            Mulai buat laporan pertamamu
                        </p>
                    </div>
                ) : (
                    <div>
                        {recent.map((r, idx) => (
                            <Link
                                key={r.id}
                                href={`/user/laporan/${r.id}`}
                                className="flex items-center gap-3 px-5 py-3.5 transition-colors"
                                style={{
                                    borderBottom:
                                        idx < recent.length - 1
                                            ? "1px solid #F1EDE2"
                                            : undefined,
                                    background:
                                        idx % 2 !== 0
                                            ? "#F8F6F0"
                                            : "#FCFBF8",
                                }}
                            >
                                <div className="min-w-0 flex-1">
                                    <p
                                        className="truncate text-[13px] font-bold"
                                        style={{ color: "#111827" }}
                                    >
                                        {r.title}
                                    </p>
                                    <p
                                        className="mt-0.5 text-[11px]"
                                        style={{ color: "#9CA3AF" }}
                                    >
                                        {r.category} ·{" "}
                                        {formatDate(r.created_at)}
                                    </p>
                                </div>
                                <StatusBadge status={r.status} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}