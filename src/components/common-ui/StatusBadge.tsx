import { REPORT_STATUS, type ReportStatus } from "@/lib/constant"

type StatusBadgeProps = {
    status: ReportStatus
    showDot?: boolean
}

// Local style mapping — overrides constant.tw to stay on-brand
const STATUS_STYLE: Record<ReportStatus, { bg: string; color: string }> = {
    "Pending":     { bg: "#F1EDE2", color: "#5F5E5A" },
    "In Progress": { bg: "#FEF3C7", color: "#92400E" },
    "Resolved":    { bg: "#D1FAE5", color: "#065F46" },
    "Rejected":    { bg: "#FEE2E2", color: "#991B1B" },
}

export default function StatusBadge({ status, showDot = true }: StatusBadgeProps) {
    const config = REPORT_STATUS[status]
    const style = STATUS_STYLE[status]

    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap"
            style={{
                background: style.bg,
                color: style.color,
            }}
        >
            {showDot && (
                <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: style.color }}
                />
            )}
            {config.label}
        </span>
    )
}