"use client"

import { useState } from "react"
import { Check, Loader2, Save, Info, Navigation, ExternalLink } from "lucide-react"
import type { Report, ReportStatus } from "@/lib/report.api"
import { REPORT_STATUS } from "@/lib/constant"
import { updateReportStatus } from "@/lib/report.api"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

type Props = {
    report: Report
    onUpdate?: (r: Report) => void
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function AdminStatusUpdater({ report, onUpdate }: Props) {
    const [status, setStatus] = useState<ReportStatus>(report.status)
    const [lastSavedStatus, setLastSavedStatus] = useState<ReportStatus>(report.status)
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    const hasChanged = status !== lastSavedStatus

    const handleSave = async () => {
        if (!hasChanged || loading) return
        setLoading(true)
        try {
            const updated = await updateReportStatus(report.id, {
                status,
                priority: report.priority,
            })
            onUpdate?.(updated)
            setLastSavedStatus(status)
            setSaved(true)
            setTimeout(() => setSaved(false), 2500)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    const hasCoords = report.latitude && report.longitude

    return (
        <div className="space-y-3">
            {/* ── Status picker ── */}
            <Section title="Ubah Status">
                <div className="space-y-1.5">
                    {(Object.keys(REPORT_STATUS) as ReportStatus[]).map((s) => {
                        const cfg = REPORT_STATUS[s]
                        const active = status === s
                        return (
                            <button
                                key={s}
                                onClick={() => setStatus(s)}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-all"
                                style={
                                    active
                                        ? {
                                              background:
                                                  "linear-gradient(135deg, #0F766E, #14B8A6)",
                                              color: "#fff",
                                              boxShadow:
                                                  "0 2px 8px rgba(15,118,110,0.25)",
                                          }
                                        : {
                                              background: "transparent",
                                              color: "#6B7280",
                                          }
                                }
                            >
                                <span
                                    className="h-2 w-2 shrink-0 rounded-full"
                                    style={{ background: cfg.dot }}
                                />
                                <span className="flex-1 text-left">
                                    {cfg.label}
                                </span>
                                {active && <Check size={14} />}
                            </button>
                        )
                    })}
                </div>
            </Section>

            {/* ── Save button ── */}
            <button
                onClick={handleSave}
                disabled={loading || !hasChanged || saved}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold transition-all active:scale-[0.98] disabled:active:scale-100"
                style={{
                    background: saved
                        ? "linear-gradient(135deg, #065F46, #10B981)"
                        : hasChanged
                            ? "linear-gradient(135deg, #0F766E, #14B8A6)"
                            : "#F1EDE2",
                    color: hasChanged || saved ? "#fff" : "#9CA3AF",
                    boxShadow:
                        hasChanged || saved
                            ? "0 4px 14px rgba(15,118,110,0.25)"
                            : "none",
                    cursor:
                        loading || !hasChanged || saved
                            ? "not-allowed"
                            : "pointer",
                }}
            >
                {loading ? (
                    <Loader2 size={15} className="animate-spin" />
                ) : saved ? (
                    <>
                        <Check size={15} /> Tersimpan
                    </>
                ) : (
                    <>
                        <Save size={14} /> Simpan Perubahan
                    </>
                )}
            </button>

            {/* ── Info ── */}
            <Section title="Info Laporan" icon={<Info size={12} />}>
                <div className="space-y-2.5">
                    <InfoRow label="Pelapor" value={report.name} />
                    <InfoRow label="Kategori" value={report.category} />
                    <div className="flex items-center justify-between gap-3 text-[12px]">
                        <span style={{ color: "#9CA3AF" }}>Prioritas</span>
                        <PriorityBadge priority={report.priority} />
                    </div>
                    <InfoRow
                        label="Dibuat"
                        value={formatDate(report.created_at)}
                    />
                    <InfoRow
                        label="Diupdate"
                        value={formatDate(report.updated_at)}
                    />
                </div>
            </Section>
        </div>
    )
}

/* ── Helpers ── */

function Section({
    title,
    icon,
    children,
}: {
    title: string
    icon?: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <div
            className="rounded-xl p-4"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            <div className="mb-3 flex items-center gap-1.5">
                {icon}
                <p
                    className="text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: "#6B7280" }}
                >
                    {title}
                </p>
            </div>
            {children}
        </div>
    )
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-3 text-[12px]">
            <span style={{ color: "#9CA3AF" }}>{label}</span>
            <span
                className="truncate text-right font-semibold"
                style={{ color: "#374151" }}
            >
                {value}
            </span>
        </div>
    )
}