import { Building2, Sparkles } from "lucide-react"
import { REPORT_STATUS } from "@/lib/constant"
import type { ReportStatus } from "@/lib/constant"

export type BannerStats = {
    total: number
    pending: number
    inProgress: number
    resolved: number
    rejected: number
}

type Props = {
    name: string
    isSuperAdmin: boolean
    stats: BannerStats
}

export default function WelcomeBanner({ name, isSuperAdmin, stats }: Props) {
    const resolvedPct =
        stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0

    const countByStatus = (s: ReportStatus) =>
        s === "Pending"
            ? stats.pending
            : s === "In Progress"
                ? stats.inProgress
                : s === "Resolved"
                    ? stats.resolved
                    : stats.rejected

    return (
        <div
            className="relative overflow-hidden rounded-2xl px-6 py-5 text-white"
            style={{
                background:
                    "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #F59E0B 100%)",
                boxShadow: "0 12px 32px rgba(15,118,110,0.20)",
            }}
        >
            {/* Dot grid overlay */}
            <div
                className="pointer-events-none absolute right-0 top-0 h-full w-80"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.20) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    opacity: 0.5,
                }}
            />

            {/* Header row */}
            <div className="relative flex items-start justify-between">
                <div>
                    <p
                        className="text-[13px] font-semibold"
                        style={{ color: "rgba(255,255,255,0.80)" }}
                    >
                        {isSuperAdmin ? "Super Admin" : "Admin"} Panel
                    </p>
                    <h1 className="mt-0.5 text-[22px] font-extrabold tracking-tight">
                        Selamat datang, {name}
                    </h1>
                    <p
                        className="mt-1.5 flex items-center gap-1.5 text-[13px]"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                        {stats.pending > 0 ? (
                            `${stats.pending} laporan menunggu tindakan`
                        ) : (
                            <>
                                Semua laporan sudah ditangani <Sparkles size={14} />
                            </>
                        )}
                    </p>
                </div>
                <div
                    className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl sm:flex"
                    style={{ background: "rgba(255,255,255,0.20)" }}
                >
                    <Building2 size={28} />
                </div>
            </div>

            {/* Progress */}
            <div className="relative mt-5">
                <div className="mb-1.5 flex justify-between text-[12px]">
                    <span style={{ color: "rgba(255,255,255,0.80)" }}>
                        Progress penyelesaian
                    </span>
                    <span className="font-bold text-white">{resolvedPct}%</span>
                </div>
                <div
                    className="h-2 w-full rounded-full"
                    style={{ background: "rgba(255,255,255,0.20)" }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${resolvedPct}%`, background: "#FCFBF8" }}
                    />
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                    {(Object.keys(REPORT_STATUS) as ReportStatus[]).map((s) => (
                        <div key={s} className="flex items-center gap-1.5">
                            <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: REPORT_STATUS[s].dot }}
                            />
                            <span
                                className="text-[11px]"
                                style={{ color: "rgba(255,255,255,0.80)" }}
                            >
                                {REPORT_STATUS[s].label}{" "}
                                <span className="font-bold text-white">
                                    {countByStatus(s)}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}