import { REPORT_STATUS, type ReportStatus } from "@/lib/constant"

type StatusBadgeProps = {
  status: ReportStatus
  showDot?: boolean
}

export default function StatusBadge({ status, showDot = true }: StatusBadgeProps) {
  const config = REPORT_STATUS[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.tw}`}>
      {showDot && (
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: config.dot }} />
      )}
      {config.label}
    </span>
  )
}