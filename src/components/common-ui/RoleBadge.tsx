import { USER_ROLE_LABELS } from "@/lib/constant"
import type { UserRole } from "@/lib/user.api"

type RoleBadgeProps = {
    role: UserRole
}

// Brand-aligned role styles — overrides constant if any
const ROLE_STYLE: Record<UserRole, { bg: string; color: string; dot: string }> = {
    user:       { bg: "#CCFBF1", color: "#0F766E", dot: "#14B8A6" },
    admin:      { bg: "#5EEAD4", color: "#115E59", dot: "#0F766E" },
    superadmin: { bg: "#FEF3C7", color: "#92400E", dot: "#EA580C" },
}

export default function RoleBadge({ role }: RoleBadgeProps) {
    const style = ROLE_STYLE[role]

    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap"
            style={{
                background: style.bg,
                color: style.color,
            }}
        >
            <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: style.dot }}
            />
            {USER_ROLE_LABELS[role]}
        </span>
    )
}

// Export styles too — useful for select dropdown / other consumers
export { ROLE_STYLE }