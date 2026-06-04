import { ReactNode } from "react"
import { Inbox } from "lucide-react"

type EmptyStateProps = {
    icon?: ReactNode | string
    title: string
    description?: string
    action?: ReactNode
}

export default function EmptyState({
    icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="py-14 text-center">
            <div
                className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
                style={{ background: "#CCFBF1", color: "#0F766E" }}
            >
                {icon ?? <Inbox size={28} />}
            </div>

            <p
                className="text-[14px] font-semibold"
                style={{ color: "#374151" }}
            >
                {title}
            </p>

            {description && (
                <p className="mt-1 text-[12px]" style={{ color: "#9CA3AF" }}>
                    {description}
                </p>
            )}

            {action && <div className="mt-4">{action}</div>}
        </div>
    )
}