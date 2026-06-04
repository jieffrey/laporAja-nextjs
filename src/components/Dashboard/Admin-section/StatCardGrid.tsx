import Link from "next/link"
import { ReactNode } from "react"
import {
    ClipboardList,
    Clock,
    Loader,
    CheckCircle2,
    XCircle,
} from "lucide-react"

export type GridStats = {
    total: number
    pending: number
    inProgress: number
    resolved: number
    rejected: number
}

type StatCard = {
    label: string
    value: number
    icon: ReactNode
    iconBg: string
    iconColor: string
    valueColor: string
    href: string
}

const buildCards = (s: GridStats): StatCard[] => [
    {
        label: "Total Laporan",
        value: s.total,
        icon: <ClipboardList size={18} />,
        iconBg: "#CCFBF1",
        iconColor: "#0F766E",
        valueColor: "#0F766E",
        href: "/admin/laporan",
    },
    {
        label: "Pending",
        value: s.pending,
        icon: <Clock size={18} />,
        iconBg: "#F1EDE2",
        iconColor: "#5F5E5A",
        valueColor: "#5F5E5A",
        href: "/admin/laporan?status=Pending",
    },
    {
        label: "In Progress",
        value: s.inProgress,
        icon: <Loader size={18} />,
        iconBg: "#FEF3C7",
        iconColor: "#92400E",
        valueColor: "#92400E",
        href: "/admin/laporan?status=In+Progress",
    },
    {
        label: "Resolved",
        value: s.resolved,
        icon: <CheckCircle2 size={18} />,
        iconBg: "#D1FAE5",
        iconColor: "#065F46",
        valueColor: "#065F46",
        href: "/admin/laporan?status=Resolved",
    },
    {
        label: "Rejected",
        value: s.rejected,
        icon: <XCircle size={18} />,
        iconBg: "#FEE2E2",
        iconColor: "#991B1B",
        valueColor: "#991B1B",
        href: "/admin/laporan?status=Rejected",
    },
]

type Props = {
    stats: GridStats
}

export default function StatCardGrid({ stats }: Props) {
    const cards = buildCards(stats)

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {cards.map((s) => (
                <Link
                    key={s.label}
                    href={s.href}
                    className="group rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                        boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                    }}
                >
                    <div
                        className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                        style={{ background: s.iconBg, color: s.iconColor }}
                    >
                        {s.icon}
                    </div>
                    <p
                        className="text-[26px] font-extrabold tracking-tight"
                        style={{ color: s.valueColor }}
                    >
                        {s.value}
                    </p>
                    <p className="mt-0.5 text-[11px]" style={{ color: "#6B7280" }}>
                        {s.label}
                    </p>
                </Link>
            ))}
        </div>
    )
}