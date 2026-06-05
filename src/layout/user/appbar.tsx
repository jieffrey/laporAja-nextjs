"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
    RiMenuLine,
    RiCloseLine,
    RiMapPin2Fill,
    RiLogoutBoxRLine,
    RiStarFill,
} from "react-icons/ri"
import { userMenus, getPageTitle } from "@/hooks/AdminMenus"
import NotificationPanel from "@/components/common-ui/NotificationPanel"

export default function UserAppbar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const name = session?.user?.name ?? "Pengguna"
    const points = session?.user?.points ?? 0
    const title = getPageTitle(pathname)
    const initials = name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    const isActive = (href: string) => {
        if (pathname === href) return true
        if (href === "/user") return false
        if (href === "/user/laporan") {
            return (
                pathname === "/user/laporan" ||
                (pathname.startsWith("/user/laporan/") &&
                    !pathname.startsWith("/user/laporan/buat"))
            )
        }
        return pathname.startsWith(href)
    }

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
                .drawer-item {
                    color: rgba(255, 255, 255, 0.65);
                    transition: all 0.18s ease;
                }
                .drawer-item:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: #fff;
                }
                .drawer-active {
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
                        {drawerOpen ? (
                            <RiCloseLine size={17} />
                        ) : (
                            <RiMenuLine size={17} />
                        )}
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
                            Panel Warga
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                    {/* Points badge */}
                    <div
                        className="hidden items-center gap-1.5 rounded-full px-3 py-1 sm:flex"
                        style={{
                            background: "#FEF3C7",
                            border: "1px solid #FCD34D",
                        }}
                    >
                        <RiStarFill size={12} style={{ color: "#F59E0B" }} />
                        <span
                            className="text-[12px] font-bold"
                            style={{ color: "#92400E" }}
                        >
                            {points.toLocaleString("id-ID")} poin
                        </span>
                    </div>

                    <NotificationPanel />

                    <Link
                        href="/user/profile"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white transition-transform hover:scale-105"
                        style={{
                            background:
                                "linear-gradient(135deg, #0F766E, #14B8A6)",
                        }}
                    >
                        {initials}
                    </Link>
                </div>
            </header>

            {/* ── Mobile drawer ── */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 z-30 lg:hidden"
                    onClick={() => setDrawerOpen(false)}
                >
                    <div
                        className="absolute inset-0 backdrop-blur-sm"
                        style={{ background: "rgba(15,118,110,0.15)" }}
                    />

                    <div
                        className="absolute left-0 top-0 flex h-full w-[240px] flex-col"
                        style={{
                            background:
                                "linear-gradient(180deg, #115E59 0%, #0F766E 100%)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-4 py-4"
                            style={{
                                borderBottom:
                                    "1px solid rgba(255,255,255,0.10)",
                            }}
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #F59E0B, #EA580C)",
                                    }}
                                >
                                    <RiMapPin2Fill
                                        size={13}
                                        className="text-white"
                                    />
                                </div>
                                <p className="text-[14px] font-extrabold text-white">
                                    LaporAja
                                </p>
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
                            style={{
                                borderBottom:
                                    "1px solid rgba(255,255,255,0.10)",
                            }}
                        >
                            <div
                                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                                style={{
                                    background: "rgba(255,255,255,0.08)",
                                }}
                            >
                                <div
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                                    style={{
                                        background:
                                            "rgba(255,255,255,0.20)",
                                    }}
                                >
                                    {initials}
                                </div>
                                <div>
                                    <p
                                        className="text-[12px] font-semibold"
                                        style={{
                                            color: "rgba(255,255,255,0.90)",
                                        }}
                                    >
                                        {name}
                                    </p>
                                    <p
                                        className="text-[10px]"
                                        style={{
                                            color: "rgba(255,255,255,0.50)",
                                        }}
                                    >
                                        Panel Warga
                                    </p>
                                </div>
                                <div className="ml-auto flex items-center gap-1">
                                    <RiStarFill
                                        size={11}
                                        style={{ color: "#FCD34D" }}
                                    />
                                    <span
                                        className="text-[11px] font-bold"
                                        style={{ color: "#FCD34D" }}
                                    >
                                        {points}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Nav */}
                        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
                            {userMenus.map(({ href, label, Icon }) => {
                                const active = isActive(href)
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setDrawerOpen(false)}
                                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium ${
                                            active
                                                ? "drawer-active"
                                                : "drawer-item"
                                        }`}
                                    >
                                        <Icon
                                            size={15}
                                            className="shrink-0"
                                        />
                                        {label}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Logout */}
                        <div
                            className="p-3"
                            style={{
                                borderTop:
                                    "1px solid rgba(255,255,255,0.10)",
                            }}
                        >
                            <button
                                onClick={() =>
                                    signOut({ callbackUrl: "/" })
                                }
                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] font-medium transition-all"
                                style={{
                                    color: "rgba(255,255,255,0.55)",
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