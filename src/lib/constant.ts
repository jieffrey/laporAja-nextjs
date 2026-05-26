// ─── Report ───────────────────────────────────────────────────────────────────

export const REPORT_CATEGORIES = [
  "Infrastruktur",
  "Lingkungan",
  "Kebersihan",
  "Keamanan",
  "Taman Kota",
  "Fasilitas Umum",
  "Lainnya",
] as const

export const REPORT_STATUS = {
  Pending: {
    label: "Pending",
    tw:    "bg-slate-100 text-slate-600 border-slate-200",
    dot:   "#94A3B8",
  },
  "In Progress": {
    label: "In Progress",
    tw:    "bg-amber-100 text-amber-700 border-amber-200",
    dot:   "#F59E0B",
  },
  Resolved: {
    label: "Resolved",
    tw:    "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot:   "#10B981",
  },
  Rejected: {
    label: "Rejected",
    tw:    "bg-red-100 text-red-700 border-red-200",
    dot:   "#EF4444",
  },
} as const

export const REPORT_PRIORITY = {
  Low: {
    label: "Low",
    tw:    "bg-blue-100 text-blue-700 border-blue-200",
  },
  Medium: {
    label: "Medium",
    tw:    "bg-amber-100 text-amber-700 border-amber-200",
  },
  High: {
    label: "High",
    tw:    "bg-red-100 text-red-700 border-red-200",
  },
} as const

// ─── Points ───────────────────────────────────────────────────────────────────

export const POINTS_CONFIG = {
  CREATE_REPORT: 5,
  IN_PROGRESS:   10,
  RESOLVED:      25,
} as const

// ─── Users ────────────────────────────────────────────────────────────────────

export const USER_ROLES = ["user", "admin", "superadmin"] as const

export const USER_ROLE_LABELS: Record<string, string> = {
  user:       "User",
  admin:      "Admin",
  superadmin: "Super Admin",
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"

// ─── Types dari constants ─────────────────────────────────────────────────────

export type ReportCategory = typeof REPORT_CATEGORIES[number]
export type ReportStatus   = keyof typeof REPORT_STATUS
export type ReportPriority = keyof typeof REPORT_PRIORITY
export type UserRole       = typeof USER_ROLES[number]