"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
    RiMenuLine,
    RiCloseLine,
    RiNotification3Line,
    RiMapPin2Fill,
    RiLogoutBoxRLine,
    RiShieldFill,
} from "react-icons/ri"
import { USER_ROLE_LABELS } from "@/lib/constant"
import { adminMenus, getPageTitle } from "@/hooks/AdminMenus"
import type { UserRole } from "@/lib/constant"
import NotificationPanel from "@/components/common-ui/NotificationPanel"

const ACCENT: Record<string, { avatar: string; label: string }> = {
    user:       { avatar: "linear-gradient(135deg, #14B8A6, #5EEAD4)", label: "#0F766E" },
    admin:      { avatar: "linear-gradient(135deg, #0F766E, #14B8A6)", label: "#0F766E" },
    superadmin: { avatar: "linear-gradient(135deg, #F59E0B, #EA580C)", label: "#EA580C" },
}

export default function AdminAppbar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const name = session?.user?.name ?? "Admin"
    const role = (session?.user?.role ?? "admin") as UserRole
    const title = getPageTitle(pathname)
    const initials = name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    const ac = ACCENT[role] ?? ACCENT.admin

    const isActive = (href: string) => {
        if (pathname === href) return true
        if (href === "/admin") return false
        return pathname.startsWith(href)
    }

    const visibleMenus = adminMenus.filter((m) => !m.roles || m.roles.includes(role))

    return (
        <>
            <style jsx>{`
                .icon-btn {
                    color: #6B7280;
                    transition: all 0.18s ease;
                }
                .icon-btn:hover {
                    background: #CCFBF1;
                    color: #0F766E;
                }
                .drawer-nav-item {
                    color: rgba(255, 255, 255, 0.65);
                    transition: all 0.18s ease;
                }
                .drawer-nav-item:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: #fff;
                }
                .drawer-nav-active {
                    background: rgba(255, 255, 255, 0.15);
                    color: #fff;
                }
            `}</style>

            {/* ── Top bar ── */}
            <header
                className="sticky top-0 z-20 flex h-14 items-center justify-between px-4 lg:px-6"
                style={{
                    background: "#FCFBF8",
                    borderBottom: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                {/* Left */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setDrawerOpen((v) => !v)}
                        className="icon-btn flex h-9 w-9 items-center justify-center rounded-xl lg:hidden"
                        style={{ border: "1px solid #E8E4D9" }}
                    >
                        {drawerOpen ? <RiCloseLine size={17} /> : <RiMenuLine size={17} />}
                    </button>

                    <div>
                        <p
                            className="text-[14px] font-bold leading-tight"
                            style={{ color: "#111827" }}
                        >
                            {title}
                        </p>
                        <p
                            className="hidden text-[10px] leading-none sm:block"
                            style={{ color: "#9CA3AF" }}
                        >
                            {USER_ROLE_LABELS[role]} Panel
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                    <NotificationPanel/>

                    <span
                        className="hidden text-[13px] sm:block"
                        style={{ color: "#6B7280" }}
                    >
                        Hai,{" "}
                        <span style={{ color: "#111827", fontWeight: 600 }}>
                            {name.split(" ")[0]}
                        </span>
                    </span>

                    <Link
                        href="/admin/profile"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white transition-transform hover:scale-105"
                        style={{ background: ac.avatar }}
                    >
                        {initials}
                    </Link>
                </div>
            </header>

            {/* ── Mobile drawer ── */}
            {drawerOpen && (
                <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setDrawerOpen(false)}>
                    <div
                        className="absolute inset-0 backdrop-blur-sm"
                        style={{ background: "rgba(15,118,110,0.30)" }}
                    />

                    <div
                        className="absolute left-0 top-0 flex h-full w-[240px] flex-col"
                        style={{
                            background: "linear-gradient(180deg, #115E59 0%, #0F766E 100%)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-4 py-4"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                                    style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)" }}
                                >
                                    <RiMapPin2Fill size={13} className="text-white" />
                                </div>
                                <p className="text-[14px] font-extrabold text-white">LaporAja</p>
                            </div>
                            <button
                                onClick={() => setDrawerOpen(false)}
                                style={{ color: "rgba(255,255,255,0.65)" }}
                            >
                                <RiCloseLine size={18} />
                            </button>
                        </div>

                        {/* User */}
                        <div
                            className="px-4 py-3"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
                        >
                            <div
                                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                                style={{ background: "rgba(255,255,255,0.08)" }}
                            >
                                <div
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                                    style={{ background: ac.avatar }}
                                >
                                    {initials}
                                </div>
                                <div>
                                    <p
                                        className="text-[12px] font-semibold"
                                        style={{ color: "rgba(255,255,255,0.90)" }}
                                    >
                                        {name}
                                    </p>
                                    <p
                                        className="text-[10px]"
                                        style={{ color: "rgba(255,255,255,0.55)" }}
                                    >
                                        {USER_ROLE_LABELS[role]}
                                    </p>
                                </div>
                                <RiShieldFill
                                    size={12}
                                    style={{ color: "rgba(255,255,255,0.40)", marginLeft: "auto" }}
                                />
                            </div>
                        </div>

                        {/* Nav */}
                        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
                            {visibleMenus.map(({ href, label, Icon }) => {
                                const active = isActive(href)
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setDrawerOpen(false)}
                                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium ${
                                            active ? "drawer-nav-active" : "drawer-nav-item"
                                        }`}
                                    >
                                        <Icon size={15} className="shrink-0" />
                                        {label}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Logout */}
                        <div
                            className="p-3"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
                        >
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] font-medium transition-all"
                                style={{ color: "rgba(255,255,255,0.55)" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(254,226,226,0.12)"
                                    e.currentTarget.style.color = "#FECACA"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent"
                                    e.currentTarget.style.color = "rgba(255,255,255,0.55)"
                                }}
                            >
                                <RiLogoutBoxRLine size={14} />
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}