import api from "./api"

// ── Types ──

export type NotificationType =
    | "new_report"
    | "status_update"
    | "comment"
    | "points_earned"

export interface Notification {
    id: number
    user_id: number
    type: NotificationType
    title: string
    message: string
    read: boolean
    report_id: number | null
    triggered_by: number | null
    triggered_by_name: string | null
    created_at: string
}

// ── Type metadata (icon/color mapping used by UI) ──

export const NOTIFICATION_META: Record<
    NotificationType,
    { iconBg: string; iconColor: string }
> = {
    new_report:    { iconBg: "#CCFBF1", iconColor: "#0F766E" },
    status_update: { iconBg: "#FEF3C7", iconColor: "#92400E" },
    comment:       { iconBg: "#DBEAFE", iconColor: "#1E40AF" },
    points_earned: { iconBg: "#FEF3C7", iconColor: "#EA580C" },
}

// ── API calls ──

export async function getNotifications(): Promise<Notification[]> {
    const res = await api.get("/notifications")
    return res.data.data
}

export async function getUnreadCount(): Promise<number> {
    const res = await api.get("/notifications/unread-count")
    return res.data.data.count
}

export async function markAsRead(id: number): Promise<void> {
    await api.patch(`/notifications/${id}/read`)
}

export async function markAllAsRead(): Promise<void> {
    await api.patch("/notifications/read-all")
}