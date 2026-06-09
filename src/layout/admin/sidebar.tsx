"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
    RiMapPin2Fill,
    RiLogoutBoxRLine,
    RiShieldFill,
    RiArrowLeftSLine,
    RiArrowRightSLine,
} from "react-icons/ri"
import { USER_ROLE_LABELS } from "@/lib/constant"
import { adminMenus } from "@/hooks/AdminMenus"
import type { UserRole } from "@/lib/constant"

type Props = {
    role: UserRole
    name: string
}

const ACCENT: Record<UserRole, {
    dot: string
    avatar: string
    label: string
    hoverBg: string      // background saat hover
    hoverText: string    // text/icon color saat hover
    activeBg: string     // background active state
    activeText: string   // text/icon color active state
}> = {
    user: {
        dot: "#14B8A6",
        avatar: "linear-gradient(135deg, #14B8A6, #5EEAD4)",
        label: "#0F766E",
        hoverBg: "#14B8A6",
        hoverText: "#ffffff",
        activeBg: "#CCFBF1",
        activeText: "#0F766E",
    },
    admin: {
        dot: "#14B8A6",
        avatar: "linear-gradient(135deg, #0F766E, #14B8A6)",
        label: "#0F766E",
        hoverBg: "#14B8A6",
        hoverText: "#ffffff",
        activeBg: "#CCFBF1",
        activeText: "#0F766E",
    },
    superadmin: {
        dot: "#F59E0B",
        avatar: "linear-gradient(135deg, #F59E0B, #EA580C)",
        label: "#EA580C",
        hoverBg: "#F59E0B",
        hoverText: "#ffffff",
        activeBg: "#FEF3C7",
        activeText: "#B45309",
    },
}

export default function AdminSidebar({ role, name }: Props) {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)
    const [hoveredHref, setHoveredHref] = useState<string | null>(null)
    const [logoutHovered, setLogoutHovered] = useState(false)

    const ac = ACCENT[role]
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    const visibleMenus = adminMenus.filter(
        (m) => !m.roles || m.roles.includes(role)
    )

    const isActive = (href: string) => {
        if (pathname === href) return true
        if (href === "/admin") return false
        return pathname.startsWith(href)
    }

    return (
        <>
            <style jsx>{`
                .sidebar {
                    transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .toggle-btn {
                    color: #9CA3AF;
                    background: #F8F6F0;
                    border: 1px solid #E8E4D9;
                    transition: all 0.18s ease;
                }
                .toggle-btn:hover {
                    background: #CCFBF1;
                    color: #0F766E;
                    border-color: #5EEAD4;
                }
                .fade-label {
                    transition: opacity 0.2s ease, width 0.2s ease;
                    white-space: nowrap;
                    overflow: hidden;
                }
            `}</style>

            <aside
                className="sidebar sticky top-0 hidden h-screen flex-col lg:flex"
                style={{
                    width: collapsed ? 60 : 220,
                    background: "#FCFBF8",
                    borderRight: "1px solid #E8E4D9",
                    flexShrink: 0,
                }}
            >
                {/* Logo + collapse toggle */}
                <div
                    className="flex items-center justify-between px-3 py-[14px]"
                    style={{ borderBottom: "1px solid #E8E4D9" }}
                >
                    {!collapsed ? (
                        <Link
                            href="/admin"
                            className="flex items-center gap-2.5 overflow-visible"
                        >
                            <div
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
                                style={{
                                    background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                                    boxShadow: "0 4px 12px rgba(15,118,110,0.25)",
                                }}
                            >
                                <RiMapPin2Fill size={14} className="text-white" />
                            </div>
                            <span
                                className="fade-label text-[14px] font-extrabold tracking-tight"
                                style={{ color: "#111827" }}
                            >
                                LaporAja
                            </span>
                        </Link>
                    ) : (
                        <div className="h-8 w-8" />
                    )}

                    <button
                        onClick={() => setCollapsed((v) => !v)}
                        className="toggle-btn flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        style={{ lineHeight: 0 }}
                    >
                        {collapsed ? (
                            <RiArrowRightSLine size={16} />
                        ) : (
                            <RiArrowLeftSLine size={16} />
                        )}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
                    {!collapsed && (
                        <p
                            className="mb-2 px-2.5 text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: "#9CA3AF" }}
                        >
                            Menu
                        </p>
                    )}
                    {visibleMenus.map(({ href, label, Icon }) => {
                        const active = isActive(href)
                        const hovered = hoveredHref === href

                        // Tentukan warna berdasarkan state
                        const bgColor = hovered
                            ? ac.hoverBg
                            : active
                                ? ac.activeBg
                                : "transparent"
                        const textColor = hovered
                            ? ac.hoverText
                            : active
                                ? ac.activeText
                                : "#6B7280"

                        return (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center rounded-xl"
                                style={{
                                    minHeight: 44,
                                    gap: collapsed ? 0 : 10,
                                    padding: collapsed ? "12px 0" : "9px 10px",
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    background: bgColor,
                                    color: textColor,
                                    transition: "background 0.18s ease, color 0.18s ease",
                                }}
                                title={collapsed ? label : undefined}
                                onMouseEnter={() => setHoveredHref(href)}
                                onMouseLeave={() => setHoveredHref(null)}
                            >
                                <Icon
                                    size={collapsed ? 18 : 16}
                                    className="flex-shrink-0"
                                    style={{ color: textColor }}
                                />
                                {!collapsed && (
                                    <span className="fade-label text-[13px] font-semibold">
                                        {label}
                                    </span>
                                )}
                                {active && !collapsed && (
                                    <span
                                        className="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                        style={{ background: hovered ? ac.hoverText : ac.dot }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom — user + logout */}
                <div
                    className="px-2 pb-3 pt-2"
                    style={{ borderTop: "1px solid #E8E4D9" }}
                >
                    {/* Role badge */}
                    {!collapsed && (
                        <div
                            className="mb-2 flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                            style={{ background: "#F8F6F0" }}
                        >
                            <RiShieldFill size={11} style={{ color: ac.label }} />
                            <span
                                className="text-[10px] font-bold uppercase tracking-wider"
                                style={{ color: ac.label }}
                            >
                                {USER_ROLE_LABELS[role]}
                            </span>
                        </div>
                    )}

                    {/* User row */}
                    <div
                        className="flex items-center rounded-xl"
                        style={{
                            gap: collapsed ? 0 : 8,
                            padding: collapsed ? "8px 0" : "6px 8px",
                            justifyContent: collapsed ? "center" : "flex-start",
                        }}
                    >
                        <div
                            className="flex flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{
                                width: collapsed ? 28 : 26,
                                height: collapsed ? 28 : 26,
                                background: ac.avatar,
                            }}
                            title={collapsed ? name : undefined}
                        >
                            {initials}
                        </div>
                        {!collapsed && (
                            <div className="min-w-0 flex-1">
                                <p
                                    className="truncate text-[12px] font-semibold"
                                    style={{ color: "#111827" }}
                                >
                                    {name}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Logout */}
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="mt-1 flex w-full items-center rounded-xl text-[12px] font-semibold"
                        style={{
                            gap: collapsed ? 0 : 8,
                            padding: collapsed ? "8px 0" : "7px 8px",
                            justifyContent: collapsed ? "center" : "flex-start",
                            color: logoutHovered ? "#991B1B" : "#9CA3AF",
                            background: logoutHovered ? "#FEE2E2" : "transparent",
                            transition: "background 0.18s ease, color 0.18s ease",
                        }}
                        title={collapsed ? "Keluar" : undefined}
                        onMouseEnter={() => setLogoutHovered(true)}
                        onMouseLeave={() => setLogoutHovered(false)}
                    >
                        <RiLogoutBoxRLine
                            size={collapsed ? 16 : 14}
                            style={{ color: logoutHovered ? "#991B1B" : "#9CA3AF" }}
                        />
                        {!collapsed && <span>Keluar</span>}
                    </button>
                </div>
            </aside>
        </>
    )
}