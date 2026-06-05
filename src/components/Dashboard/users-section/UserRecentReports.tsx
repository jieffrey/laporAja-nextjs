import Link from "next/link"
import { ArrowRight, Inbox } from "lucide-react"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"

type Props = {
    reports: Report[]
    loading?: boolean
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function UserRecentReports({ reports, loading }: Props) {
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

            {/* Content */}
            {loading ? (
                <LoadingState />
            ) : reports.length === 0 ? (
                <EmptyState />
            ) : (
                <ReportList reports={reports} />
            )}
        </div>
    )
}

function LoadingState() {
    return (
        <div className="flex h-32 items-center justify-center">
            <div
                className="h-6 w-6 animate-spin rounded-full"
                style={{
                    border: "2px solid #CCFBF1",
                    borderTopColor: "#0F766E",
                }}
            />
        </div>
    )
}

function EmptyState() {
    return (
        <div className="py-12 text-center">
            <div
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "#CCFBF1", color: "#0F766E" }}
            >
                <Inbox size={24} />
            </div>
            <p
                className="text-[13px] font-semibold"
                style={{ color: "#374151" }}
            >
                Belum ada laporan
            </p>
            <p className="mt-1 text-[12px]" style={{ color: "#9CA3AF" }}>
                Mulai buat laporan pertamamu
            </p>
            <Link
                href="/user/laporan/buat"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
                style={{
                    background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                    boxShadow: "0 4px 14px rgba(15,118,110,0.25)",
                }}
            >
                Buat Laporan
            </Link>
        </div>
    )
}

function ReportList({ reports }: { reports: Report[] }) {
    return (
        <div>
            {reports.map((r, idx) => (
                <Link
                    key={r.id}
                    href={`/user/laporan/${r.id}`}
                    className="group flex items-center gap-3 px-5 py-3.5 transition-colors"
                    style={{
                        borderBottom:
                            idx < reports.length - 1
                                ? "1px solid #F1EDE2"
                                : undefined,
                        background: idx % 2 !== 0 ? "#F8F6F0" : "#FCFBF8",
                    }}
                >
                    {/* Left accent dot based on status */}
                    <div
                        className="h-8 w-1 flex-shrink-0 rounded-full"
                        style={{
                            background:
                                r.status === "Resolved"
                                    ? "#065F46"
                                    : r.status === "In Progress"
                                        ? "#F59E0B"
                                        : r.status === "Rejected"
                                            ? "#991B1B"
                                            : "#D1D5DB",
                        }}
                    />

                    {/* Content */}
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
                            {r.category} · {formatDate(r.created_at)}
                        </p>
                    </div>

                    {/* Status + arrow */}
                    <StatusBadge status={r.status} />
                    <ArrowRight
                        size={14}
                        className="flex-shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        style={{ color: "#0F766E" }}
                    />
                </Link>
            ))}
        </div>
    )
}