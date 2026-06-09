"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
    RiMapPin2Fill,
    RiLogoutBoxRLine,
    RiStarFill,
    RiArrowLeftSLine,
    RiArrowRightSLine,
} from "react-icons/ri"
import { userMenus } from "@/hooks/AdminMenus"
import { useRealtimePoints } from "@/hooks/useRealtimePoints"

type Props = {
    name: string
}

export default function UserSidebar({ name }: Props) {
    const points = useRealtimePoints()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    const initials = name
        .split(" ")
        .map((n) => n[0])
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
                .sidebar {
                    transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .nav-link {
                    color: #6b7280;
                    transition: background 0.18s ease, color 0.18s ease;
                }
                .nav-link:hover {
                    background: #14b8a6;
                    color: #ffffff;
                }
                .nav-link:hover .nav-icon {
                    color: #ffffff;
                }
                .nav-link:hover .nav-dot {
                    background: #ffffff;
                }
                .nav-link.active {
                    background: #ccfbf1;
                    color: #0f766e;
                }
                .nav-link.active .nav-icon {
                    color: #0f766e;
                }
                .nav-link.active:hover {
                    background: #14b8a6;
                    color: #ffffff;
                }
                .logout-btn {
                    color: #9ca3af;
                    transition: background 0.18s ease, color 0.18s ease;
                }
                .logout-btn:hover {
                    background: #fee2e2;
                    color: #991b1b;
                }
                .logout-btn:hover .logout-icon {
                    color: #991b1b;
                }
                .toggle-btn {
                    color: #9ca3af;
                    background: #f8f6f0;
                    border: 1px solid #e8e4d9;
                    transition: all 0.18s ease;
                }
                .toggle-btn:hover {
                    background: #ccfbf1;
                    color: #0f766e;
                    border-color: #5eead4;
                }
            `}</style>

            <aside
                className="sidebar sticky top-0 hidden h-screen flex-col lg:flex"
                style={{
                    width: collapsed ? 68 : 220,
                    background: "#FCFBF8",
                    borderRight: "1px solid #E8E4D9",
                    flexShrink: 0,
                }}
            >
                {/* Logo + toggle */}
                <div
                    className="flex items-center justify-between px-3 py-[14px]"
                    style={{ borderBottom: "1px solid #E8E4D9" }}
                >
                    <Link
                        href="/user"
                        className="flex items-center gap-2.5 overflow-hidden"
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
                        {!collapsed && (
                            <div>
                                <p
                                    className="text-[14px] font-extrabold leading-none tracking-tight"
                                    style={{ color: "#111827" }}
                                >
                                    LaporAja
                                </p>
                                <p
                                    className="mt-0.5 text-[10px] leading-none"
                                    style={{ color: "#9CA3AF" }}
                                >
                                    Panel Warga
                                </p>
                            </div>
                        )}
                    </Link>

                    <button
                        onClick={() => setCollapsed((v) => !v)}
                        className="toggle-btn flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? (
                            <RiArrowRightSLine size={14} />
                        ) : (
                            <RiArrowLeftSLine size={14} />
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
                    {userMenus.map(({ href, label, Icon }) => {
                        const active = isActive(href)
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`nav-link flex items-center rounded-xl${active ? " active" : ""}`}
                                style={{
                                    gap: collapsed ? 0 : 10,
                                    padding: collapsed ? "10px 0" : "9px 10px",
                                    justifyContent: collapsed ? "center" : "flex-start",
                                }}
                                title={collapsed ? label : undefined}
                            >
                                <Icon
                                    size={collapsed ? 18 : 16}
                                    className="nav-icon flex-shrink-0"
                                    style={{ color: active ? "#0F766E" : "#6B7280" }}
                                />
                                {!collapsed && (
                                    <span className="text-[13px] font-semibold">
                                        {label}
                                    </span>
                                )}
                                {active && !collapsed && (
                                    <span
                                        className="nav-dot ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                        style={{ background: "#14B8A6" }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom — points + user + logout */}
                <div
                    className="px-2 pb-3 pt-2"
                    style={{ borderTop: "1px solid #E8E4D9" }}
                >
                    {/* Points chip */}
                    {points !== undefined && (
                        <div
                            className="mb-2 flex items-center rounded-lg px-3 py-1.5"
                            style={{
                                gap: collapsed ? 0 : 6,
                                justifyContent: collapsed ? "center" : "flex-start",
                                background: "#FEF3C7",
                                border: "1px solid #FCD34D",
                            }}
                        >
                            <RiStarFill size={12} style={{ color: "#F59E0B" }} />
                            {!collapsed && (
                                <span
                                    className="text-[11px] font-bold"
                                    style={{ color: "#92400E" }}
                                >
                                    {points.toLocaleString("id-ID")} poin
                                </span>
                            )}
                        </div>
                    )}

                    {/* User */}
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
                                background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                            }}
                            title={collapsed ? name : undefined}
                        >
                            {initials}
                        </div>
                        {!collapsed && (
                            <p
                                className="min-w-0 flex-1 truncate text-[12px] font-semibold"
                                style={{ color: "#111827" }}
                            >
                                {name}
                            </p>
                        )}
                    </div>

                    {/* Logout */}
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="logout-btn mt-1 flex w-full items-center rounded-xl text-[12px] font-semibold"
                        style={{
                            gap: collapsed ? 0 : 8,
                            padding: collapsed ? "8px 0" : "7px 8px",
                            justifyContent: collapsed ? "center" : "flex-start",
                        }}
                        title={collapsed ? "Keluar" : undefined}
                    >
                        <RiLogoutBoxRLine
                            size={collapsed ? 16 : 14}
                            className="logout-icon"
                            style={{ color: "inherit" }}
                        />
                        {!collapsed && <span>Keluar</span>}
                    </button>
                </div>
            </aside>
        </>
    )
}