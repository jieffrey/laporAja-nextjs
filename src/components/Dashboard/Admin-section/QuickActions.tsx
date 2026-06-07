import Link from "next/link"
import { ReactNode } from "react"
import { ClipboardList, Users, ArrowRight } from "lucide-react"

type ActionCard = {
    href: string
    icon: ReactNode
    iconBg: string
    iconColor: string
    title: string
    subtitle: string
    arrowColor: string
}

type Props = {
    pending: number
    inProgress: number
    totalUsers: number
    isSuperAdmin: boolean
}

export default function QuickActions({
    pending,
    inProgress,
    totalUsers,
    isSuperAdmin,
}: Props) {
    const actions: ActionCard[] = [
        {
            href: "/admin/laporan",
            icon: <ClipboardList size={18} />,
            iconBg: "#CCFBF1",
            iconColor: "#0F766E",
            title: "Kelola Laporan",
            subtitle: `${pending} pending · ${inProgress} in progress`,
            arrowColor: "#0F766E",
        },
    ]

    actions.push({
        href: "/admin/users",
        icon: <Users size={18} />,
        iconBg: "#FEF3C7",
        iconColor: "#92400E",
        title: "Kelola Pengguna",
        subtitle: `${totalUsers} pengguna terdaftar`,
        arrowColor: "#EA580C",
    })

    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {actions.map((a) => (
                <Link
                    key={a.href}
                    href={a.href}
                    className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                        boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                    }}
                >
                    <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ background: a.iconBg, color: a.iconColor }}
                    >
                        {a.icon}
                    </div>
                    <div className="min-w-0">
                        <p
                            className="text-[14px] font-bold"
                            style={{ color: "#111827" }}
                        >
                            {a.title}
                        </p>
                        <p
                            className="truncate text-[12px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            {a.subtitle}
                        </p>
                    </div>
                    <ArrowRight
                        size={16}
                        className="ml-auto flex-shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: a.arrowColor }}
                    />
                </Link>
            ))}
        </div>
    )
}