"use client"

import { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { PlusCircle, Search, List } from "lucide-react"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import { REPORT_CATEGORIES, REPORT_STATUS } from "@/lib/constant"
import type { ReportStatus } from "@/lib/constant"
import ReportCard from "@/components/report/ReportCard"
import EmptyState from "@/components/common-ui/Emptystate"

const STATUS_OPTIONS = ["Semua", ...Object.keys(REPORT_STATUS)] as string[]

const filterReports = (
    reports: Report[],
    status: string,
    category: string,
    search: string
) =>
    reports.filter((r) => {
        const q = search.toLowerCase()
        return (
            (status === "Semua" || r.status === status) &&
            (category === "Semua" || r.category === category) &&
            r.title.toLowerCase().includes(q)
        )
    })

export default function UserReportsPage() {
    const { data: session, status: authStatus } = useSession()
    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("Semua")
    const [category, setCategory] = useState("Semua")
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (authStatus !== "authenticated") return
        getReports()
            .then((data) => {
                const userId = Number(session?.user?.id)
                setReports(data.filter((r) => r.user_id === userId))
            })
            .finally(() => setLoading(false))
    }, [authStatus, session?.user?.id])

    const filtered = useMemo(
        () => filterReports(reports, filter, category, search),
        [reports, filter, category, search]
    )

    return (
        <div className="space-y-4">
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
                        style={{ background: "#CCFBF1", color: "#0F766E" }}
                    >
                        <List size={20} />
                    </div>
                    <div>
                        <h1
                            className="text-[20px] font-extrabold tracking-tight"
                            style={{ color: "#111827" }}
                        >
                            Laporan Saya
                        </h1>
                        <p
                            className="mt-0.5 text-[13px]"
                            style={{ color: "#6B7280" }}
                        >
                            {reports.length} laporan ditemukan
                        </p>
                    </div>
                </div>
                <Link
                    href="/user/laporan/buat"
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{
                        background:
                            "linear-gradient(135deg, #0F766E, #14B8A6)",
                        boxShadow: "0 4px 14px rgba(15,118,110,0.25)",
                    }}
                >
                    <PlusCircle size={15} /> Buat Laporan
                </Link>
            </div>

            {/* Filter bar */}
            <div
                className="flex flex-wrap gap-2.5 rounded-2xl px-4 py-3"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                {/* Search */}
                <div className="relative min-w-[180px] flex-1">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#9CA3AF" }}
                    />
                    <input
                        type="text"
                        placeholder="Cari laporan..."
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

                {/* Status pills */}
                <div className="flex flex-wrap gap-1.5">
                    {STATUS_OPTIONS.map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className="rounded-xl px-3 py-1.5 text-[12px] font-bold transition-all"
                            style={
                                filter === s
                                    ? {
                                          background:
                                              "linear-gradient(135deg, #0F766E, #14B8A6)",
                                          color: "#fff",
                                          border: "1px solid transparent",
                                          boxShadow:
                                              "0 2px 6px rgba(15,118,110,0.20)",
                                      }
                                    : {
                                          background: "#FCFBF8",
                                          color: "#6B7280",
                                          border: "1px solid #E8E4D9",
                                      }
                            }
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="cursor-pointer rounded-xl px-3 py-2 text-[13px] outline-none"
                    style={{
                        background: "#F8F6F0",
                        border: "1px solid #E8E4D9",
                        color: "#374151",
                    }}
                >
                    <option>Semua</option>
                    {REPORT_CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Filter count */}
            {filtered.length !== reports.length && !loading && (
                <p className="text-[12px]" style={{ color: "#9CA3AF" }}>
                    Menampilkan{" "}
                    <span className="font-bold" style={{ color: "#0F766E" }}>
                        {filtered.length}
                    </span>{" "}
                    dari {reports.length} laporan
                </p>
            )}

            {/* Content */}
            {loading ? (
                <div className="flex h-48 items-center justify-center">
                    <div
                        className="h-7 w-7 animate-spin rounded-full"
                        style={{
                            border: "2px solid #CCFBF1",
                            borderTopColor: "#0F766E",
                        }}
                    />
                </div>
            ) : filtered.length === 0 ? (
                <EmptyState
                    icon={<Search size={28} />}
                    title={
                        reports.length === 0
                            ? "Belum ada laporan"
                            : "Tidak ada hasil"
                    }
                    description={
                        reports.length === 0
                            ? "Mulai buat laporan pertamamu"
                            : "Coba ubah filter pencarian"
                    }
                    action={
                        reports.length === 0 ? (
                            <Link
                                href="/user/laporan/buat"
                                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-bold text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0F766E, #14B8A6)",
                                    boxShadow:
                                        "0 4px 14px rgba(15,118,110,0.25)",
                                }}
                            >
                                <PlusCircle size={14} /> Buat Laporan
                            </Link>
                        ) : undefined
                    }
                />
            ) : (
                <div className="space-y-3">
                    {filtered.map((r) => (
                        <ReportCard key={r.id} report={r} />
                    ))}
                </div>
            )}
        </div>
    )
}