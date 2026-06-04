"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { RiMapPin2Fill, RiLogoutBoxRLine, RiShieldFill } from "react-icons/ri"
import { USER_ROLE_LABELS } from "@/lib/constant"
import { adminMenus } from "@/hooks/AdminMenus"
import type { UserRole } from "@/lib/constant"

type Props = {
    role: UserRole
    name: string
}

// Role accent on dark teal sidebar
const ACCENT: Record<UserRole, { dot: string; avatar: string; label: string }> = {
    user:       { dot: "#5EEAD4", avatar: "linear-gradient(135deg, #14B8A6, #5EEAD4)", label: "#5EEAD4" },
    admin:      { dot: "#5EEAD4", avatar: "linear-gradient(135deg, #0F766E, #14B8A6)", label: "#5EEAD4" },
    superadmin: { dot: "#FCD34D", avatar: "linear-gradient(135deg, #F59E0B, #EA580C)", label: "#FCD34D" },
}

export default function AdminSidebar({ role, name }: Props) {
    const pathname = usePathname()
    const ac = ACCENT[role]
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    const visibleMenus = adminMenus.filter((m) => !m.roles || m.roles.includes(role))

    const isActive = (href: string) => {
        if (pathname === href) return true
        if (href === "/admin") return false
        return pathname.startsWith(href)
    }

    return (
        <>
            <style jsx>{`
                .nav-item {
                    color: rgba(255, 255, 255, 0.65);
                    transition: all 0.18s ease;
                }
                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: #fff;
                }
                .nav-item-active {
                    background: rgba(255, 255, 255, 0.15);
                    color: #fff;
                }
                .logout-btn {
                    color: rgba(255, 255, 255, 0.55);
                    transition: all 0.18s ease;
                }
                .logout-btn:hover {
                    background: rgba(254, 226, 226, 0.12);
                    color: #FECACA;
                }
            `}</style>

            <aside
                className="sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col lg:flex"
                style={{
                    background: "linear-gradient(180deg, #115E59 0%, #0F766E 100%)",
                }}
            >
                {/* Logo */}
                <div
                    className="flex items-center gap-2.5 px-5 py-[18px]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
                >
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-xl"
                        style={{
                            background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                            boxShadow: "0 4px 12px rgba(245,158,11,0.30)",
                        }}
                    >
                        <RiMapPin2Fill size={15} className="text-white" />
                    </div>
                    <div>
                        <p className="text-[14px] font-extrabold leading-none tracking-tight text-white">
                            LaporAja
                        </p>
                        <p
                            className="mt-0.5 text-[10px] leading-none"
                            style={{ color: "rgba(255,255,255,0.50)" }}
                        >
                            {USER_ROLE_LABELS[role]}
                        </p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
                    <p
                        className="mb-2.5 px-2.5 text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: "rgba(255,255,255,0.40)" }}
                    >
                        Menu
                    </p>
                    {visibleMenus.map(({ href, label, Icon }) => {
                        const active = isActive(href)
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[13px] font-medium ${
                                    active ? "nav-item-active" : "nav-item"
                                }`}
                            >
                                <Icon size={16} className="shrink-0" />
                                <span className="flex-1">{label}</span>
                                {active && (
                                    <span
                                        className="h-1.5 w-1.5 rounded-full"
                                        style={{ background: ac.dot }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* User + logout */}
                <div
                    className="p-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
                >
                    {/* Role badge */}
                    <div
                        className="mb-2 flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                        <RiShieldFill size={12} style={{ color: ac.label }} />
                        <span
                            className="text-[11px] font-bold uppercase tracking-wider"
                            style={{ color: ac.label }}
                        >
                            {USER_ROLE_LABELS[role]}
                        </span>
                    </div>

                    {/* User row */}
                    <div className="flex items-center gap-2.5 rounded-xl px-2.5 py-2">
                        <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                            style={{ background: ac.avatar }}
                        >
                            {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p
                                className="truncate text-[12px] font-semibold"
                                style={{ color: "rgba(255,255,255,0.90)" }}
                            >
                                {name}
                            </p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="logout-btn mt-1 flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12px] font-medium"
                    >
                        <RiLogoutBoxRLine size={14} />
                        Keluar
                    </button>
                </div>
            </aside>
        </>
    )
}