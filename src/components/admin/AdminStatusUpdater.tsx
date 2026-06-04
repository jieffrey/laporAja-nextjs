"use client"

import { useState, useEffect } from "react"
import { Check, Loader2, Info } from "lucide-react"
import type { Report, ReportStatus, ReportPriority } from "@/lib/report.api"
import { REPORT_STATUS, REPORT_PRIORITY } from "@/lib/constant"
import { updateReportStatus } from "@/lib/report.api"

type Props = {
    report: Report
    onUpdate?: (r: Report) => void
}

// Local priority button styles (override constant.tw)
const PRIORITY_ACTIVE: Record<ReportPriority, { bg: string; color: string }> = {
    "Low":    { bg: "#CCFBF1", color: "#0F766E" },
    "Medium": { bg: "#FEF3C7", color: "#92400E" },
    "High":   { bg: "#FEE2E2", color: "#991B1B" },
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function AdminStatusUpdater({ report, onUpdate }: Props) {
    const [status, setStatus] = useState<ReportStatus>(report.status)
    const [priority, setPriority] = useState<ReportPriority>(report.priority)
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    // Auto-save whenever status or priority changes
    useEffect(() => {
        const saveChanges = async () => {
            setLoading(true)
            try {
                const updated = await updateReportStatus(report.id, { status, priority })
                onUpdate?.(updated)
                setSaved(true)
                setTimeout(() => setSaved(false), 1500)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        // Don't save on initial mount
        if (status !== report.status || priority !== report.priority) {
            saveChanges()
        }
    }, [status, priority, report.id, report.status, report.priority, onUpdate])

    const handleStatusChange = (newStatus: ReportStatus) => {
        setStatus(newStatus)
    }

    const handlePriorityChange = (newPriority: ReportPriority) => {
        setPriority(newPriority)
    }

    return (
        <div className="space-y-3">
            {/* ── Status picker ── */}
            <Section title="Status">
                <div className="space-y-1.5">
                    {(Object.keys(REPORT_STATUS) as ReportStatus[]).map((s) => {
                        const cfg = REPORT_STATUS[s]
                        const active = status === s
                        return (
                            <StatusOption
                                key={s}
                                label={cfg.label}
                                dot={cfg.dot}
                                active={active}
                                onClick={() => handleStatusChange(s)}
                                loading={loading}
                            />
                        )
                    })}
                </div>
            </Section>

            {/* ── Priority picker ── */}
            <Section title="Priority">
                <div className="grid grid-cols-3 gap-1.5">
                    {(Object.keys(REPORT_PRIORITY) as ReportPriority[]).map((p) => {
                        const active = priority === p
                        const activeStyle = PRIORITY_ACTIVE[p]
                        return (
                            <button
                                key={p}
                                onClick={() => handlePriorityChange(p)}
                                disabled={loading}
                                className="rounded-lg py-2 text-[12px] font-bold transition-all disabled:opacity-50"
                                style={
                                    active
                                        ? {
                                              background: activeStyle.bg,
                                              color: activeStyle.color,
                                              border: `1px solid ${activeStyle.color}30`,
                                          }
                                        : {
                                              background: "#F8F6F0",
                                              color: "#6B7280",
                                              border: "1px solid #E8E4D9",
                                          }
                                }
                            >
                                {p}
                            </button>
                        )
                    })}
                </div>
            </Section>

            {/* ── Auto-save status ── */}
            {(loading || saved) && (
                <div
                    className="flex items-center justify-center gap-2 rounded-lg py-2 text-[12px] font-semibold"
                    style={{
                        background: saved ? "#D1FAE5" : "#F0F9FF",
                        color: saved ? "#065F46" : "#0369A1",
                    }}
                >
                    {loading ? (
                        <>
                            <Loader2 size={14} className="animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Check size={14} />
                            Tersimpan
                        </>
                    )}
                </div>
            )}

            {/* ── Info ── */}
            <Section title="Info" icon={<Info size={12} />}>
                <div className="space-y-2">
                    {[
                        ["Pelapor", report.name],
                        ["Kategori", report.category],
                        ["Dibuat", formatDate(report.created_at)],
                        ["Diupdate", formatDate(report.updated_at)],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="flex justify-between gap-3 text-[12px]"
                        >
                            <span style={{ color: "#9CA3AF" }}>{label}</span>
                            <span
                                className="truncate text-right font-semibold"
                                style={{ color: "#374151" }}
                            >
                                {value}
                            </span>
                        </div>
                    ))}
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

function StatusOption({
    label,
    dot,
    active,
    onClick,
    loading,
}: {
    label: string
    dot: string
    active: boolean
    onClick: () => void
    loading: boolean
}) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition-all disabled:opacity-50"
            style={
                active
                    ? {
                          background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                          color: "#fff",
                          boxShadow: "0 2px 8px rgba(15,118,110,0.25)",
                      }
                    : {
                          background: "transparent",
                          color: "#6B7280",
                      }
            }
        >
            <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: dot }}
            />
            <span className="flex-1 text-left">{label}</span>
            {active && <Check size={14} />}
        </button>
    )
}