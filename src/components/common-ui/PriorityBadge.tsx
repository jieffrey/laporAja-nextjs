import { REPORT_PRIORITY, type ReportPriority } from "@/lib/constant"

type PriorityBadgeProps = {
    priority: ReportPriority
}

// Local style mapping — overrides constant.tw to stay on-brand
const PRIORITY_STYLE: Record<ReportPriority, { bg: string; color: string; dot: string }> = {
    "Low":    { bg: "#CCFBF1", color: "#0F766E", dot: "#14B8A6" },
    "Medium": { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
    "High":   { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
    const config = REPORT_PRIORITY[priority]
    const style = PRIORITY_STYLE[priority]

    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap"
            style={{
                background: style.bg,
                color: style.color,
            }}
        >
            <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: style.dot }}
            />
            {config.label}
        </span>
    )
}