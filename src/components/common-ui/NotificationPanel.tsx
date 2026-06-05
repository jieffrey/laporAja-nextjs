"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import {
    Bell,
    ClipboardList,
    RefreshCw,
    MessageSquare,
    Trophy,
    CheckCheck,
    Inbox,
} from "lucide-react"
import type { Notification, NotificationType } from "@/lib/notification"
import {
    NOTIFICATION_META,
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
} from "@/lib/notification"

const TYPE_ICON: Record<NotificationType, React.ReactNode> = {
    new_report:    <ClipboardList size={14} />,
    status_update: <RefreshCw size={14} />,
    comment:       <MessageSquare size={14} />,
    points_earned: <Trophy size={14} />,
}

function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60_000)
    if (mins < 1) return "Baru saja"
    if (mins < 60) return `${mins} menit lalu`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} jam lalu`
    const days = Math.floor(hours / 24)
    return `${days} hari lalu`
}

export default function NotificationPanel() {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState<Notification[]>([])
    const [loaded, setLoaded] = useState(false)
    const [badgeCount, setBadgeCount] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const ref = useRef<HTMLDivElement>(null)

    // Fetch unread count on mount (for badge before opening)
    useEffect(() => {
        getUnreadCount()
            .then(setBadgeCount)
            .catch(() => {
                setBadgeCount(0)
            })
    }, [])

    // Fetch full list on first open
    useEffect(() => {
        if (open && !loaded) {
            getNotifications()
                .then((data) => {
                    setItems(data)
                    setBadgeCount(data.filter((n) => !n.read).length)
                    setError(null)
                })
                .catch(() => {
                    setItems([])
                    setBadgeCount(0)
                    setError("Tidak ada notifikasi")
                })
                .finally(() => setLoaded(true))
        }
    }, [open, loaded])

    // Close on click outside
    useEffect(() => {
        if (!open) return
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [open])

    const handleMarkRead = useCallback(async (id: number) => {
        try {
            await markAsRead(id)
        } catch (error) {
            console.warn("Failed to mark notification as read", error)
        }

        setItems((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        )
        setBadgeCount((c) => Math.max(0, c - 1))
    }, [])

    const handleMarkAllRead = useCallback(async () => {
        try {
            await markAllAsRead()
        } catch (error) {
            console.warn("Failed to mark all notifications as read", error)
        }

        setItems((prev) => prev.map((n) => ({ ...n, read: true })))
        setBadgeCount(0)
    }, [])

    return (
        <div ref={ref} className="relative">
            {/* ── Bell trigger ── */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-all"
                style={{ color: open ? "#0F766E" : "#6B7280" }}
                aria-label="Notifikasi"
            >
                <Bell size={18} />
                {badgeCount > 0 && (
                    <span
                        className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
                        style={{
                            background: "linear-gradient(135deg, #EA580C, #F59E0B)",
                            boxShadow: "0 2px 6px rgba(234,88,12,0.40)",
                        }}
                    >
                        {badgeCount > 9 ? "9+" : badgeCount}
                    </span>
                )}
            </button>

            {/* ── Dropdown panel ── */}
            {open && (
                <div
                    className="absolute right-0 top-12 z-50 w-[340px] overflow-hidden rounded-2xl"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                        boxShadow: "0 16px 48px rgba(15,118,110,0.16)",
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-4 py-3"
                        style={{ borderBottom: "1px solid #F1EDE2" }}
                    >
                        <div className="flex items-center gap-2">
                            <p
                                className="text-[14px] font-bold"
                                style={{ color: "#111827" }}
                            >
                                Notifikasi
                            </p>
                            {badgeCount > 0 && (
                                <span
                                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                                    style={{
                                        background: "#FEF3C7",
                                        color: "#92400E",
                                    }}
                                >
                                    {badgeCount} baru
                                </span>
                            )}
                        </div>
                        {badgeCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="flex items-center gap-1 text-[11px] font-semibold transition-colors"
                                style={{ color: "#0F766E" }}
                            >
                                <CheckCheck size={12} />
                                Tandai semua
                            </button>
                        )}
                    </div>

                    {/* Content */}
                    <div
                        className="max-h-[360px] overflow-y-auto"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {!loaded ? (
                            <div className="flex items-center justify-center py-10">
                                <div
                                    className="h-5 w-5 animate-spin rounded-full"
                                    style={{
                                        border: "2px solid #CCFBF1",
                                        borderTopColor: "#0F766E",
                                    }}
                                />
                            </div>
                        ) : error ? (
                            <div className="py-10 text-center">
                                <div
                                    className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl"
                                    style={{
                                        background: "#FDE68A",
                                        color: "#92400E",
                                    }}
                                >
                                    <Inbox size={22} />
                                </div>
                                <p
                                    className="text-[13px] font-semibold"
                                    style={{ color: "#374151" }}
                                >
                                    {error}
                                </p>
                            </div>
                        ) : items.length === 0 ? (
                            <div className="py-10 text-center">
                                <div
                                    className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl"
                                    style={{
                                        background: "#CCFBF1",
                                        color: "#0F766E",
                                    }}
                                >
                                    <Inbox size={22} />
                                </div>
                                <p
                                    className="text-[13px] font-semibold"
                                    style={{ color: "#374151" }}
                                >
                                    Belum ada notifikasi
                                </p>
                            </div>
                        ) : (
                            items.map((n, idx) => (
                                <NotificationItem
                                    key={n.id}
                                    notification={n}
                                    isLast={idx === items.length - 1}
                                    onRead={handleMarkRead}
                                    onClose={() => setOpen(false)}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

/* ── Notification row ── */

function NotificationItem({
    notification: n,
    isLast,
    onRead,
    onClose,
}: {
    notification: Notification
    isLast: boolean
    onRead: (id: number) => void
    onClose: () => void
}) {
    const meta = NOTIFICATION_META[n.type]

    const handleClick = () => {
        if (!n.read) onRead(n.id)
        onClose()
    }

    const content = (
        <>
            {/* Type icon */}
            <div
                className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: meta.iconBg, color: meta.iconColor }}
            >
                {TYPE_ICON[n.type]}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <p
                        className="text-[12px] font-bold"
                        style={{ color: n.read ? "#6B7280" : "#111827" }}
                    >
                        {n.title}
                    </p>
                    {!n.read && (
                        <span
                            className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ background: "#EA580C" }}
                        />
                    )}
                </div>
                <p
                    className="mt-0.5 text-[12px] leading-relaxed"
                    style={{ color: "#6B7280" }}
                >
                    {n.message}
                </p>
                <p className="mt-1 text-[10px]" style={{ color: "#9CA3AF" }}>
                    {timeAgo(n.created_at)}
                </p>
            </div>
        </>
    )

    const sharedStyle: React.CSSProperties = {
        borderBottom: !isLast ? "1px solid #F1EDE2" : undefined,
        background: n.read ? "transparent" : "rgba(204,251,241,0.25)",
        cursor: n.report_id ? "pointer" : "default",
    }

    if (n.report_id) {
        return (
            <Link
                href={`/admin/laporan/${n.report_id}`}
                onClick={handleClick}
                className="flex gap-3 px-4 py-3 transition-colors"
                style={sharedStyle}
            >
                {content}
            </Link>
        )
    }

    return (
        <div
            onClick={handleClick}
            className="flex gap-3 px-4 py-3 transition-colors"
            style={sharedStyle}
        >
            {content}
        </div>
    )
}