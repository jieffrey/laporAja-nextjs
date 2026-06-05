import { ReactNode } from "react"
import { FileText, CheckCircle2, Loader, Clock } from "lucide-react"

export type UserStats = {
    total: number
    resolved: number
    inProgress: number
    pending: number
}

type CardConfig = {
    label: string
    value: number
    icon: ReactNode
    iconBg: string
    iconColor: string
    valueColor: string
}

const buildCards = (s: UserStats): CardConfig[] => [
    {
        label: "Total Laporan",
        value: s.total,
        icon: <FileText size={16} />,
        iconBg: "#CCFBF1",
        iconColor: "#0F766E",
        valueColor: "#0F766E",
    },
    {
        label: "Selesai",
        value: s.resolved,
        icon: <CheckCircle2 size={16} />,
        iconBg: "#D1FAE5",
        iconColor: "#065F46",
        valueColor: "#065F46",
    },
    {
        label: "Diproses",
        value: s.inProgress,
        icon: <Loader size={16} />,
        iconBg: "#FEF3C7",
        iconColor: "#92400E",
        valueColor: "#92400E",
    },
    {
        label: "Pending",
        value: s.pending,
        icon: <Clock size={16} />,
        iconBg: "#F1EDE2",
        iconColor: "#5F5E5A",
        valueColor: "#5F5E5A",
    },
]

type Props = {
    stats: UserStats
    loading?: boolean
}

export default function UserStatCards({ stats, loading }: Props) {
    const cards = buildCards(stats)

    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {cards.map((s) => (
                <div
                    key={s.label}
                    className="rounded-2xl px-4 py-4"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                        boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                    }}
                >
                    <div
                        className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{
                            background: s.iconBg,
                            color: s.iconColor,
                        }}
                    >
                        {s.icon}
                    </div>
                    <p
                        className="text-[24px] font-extrabold tracking-tight"
                        style={{ color: s.valueColor }}
                    >
                        {loading ? (
                            <span className="skeleton inline-block h-6 w-8" />
                        ) : (
                            s.value
                        )}
                    </p>
                    <p
                        className="mt-0.5 text-[11px]"
                        style={{ color: "#9CA3AF" }}
                    >
                        {s.label}
                    </p>
                </div>
            ))}
        </div>
    )
}