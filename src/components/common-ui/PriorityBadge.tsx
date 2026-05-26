import { REPORT_PRIORITY, type ReportPriority } from "@/lib/constant"

type PriorityBadgeProps = {
  priority: ReportPriority
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = REPORT_PRIORITY[priority]
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.tw}`}>
      {config.label}
    </span>
  )
}