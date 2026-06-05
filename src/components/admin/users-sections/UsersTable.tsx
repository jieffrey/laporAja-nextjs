import { Trash2, Loader2 } from "lucide-react"
import type { User, UserRole } from "@/lib/user.api"
import { USER_ROLES, USER_ROLE_LABELS } from "@/lib/constant"
import RoleBadge, { ROLE_STYLE } from "@/components/common-ui/RoleBadge"

type Props = {
    users: User[]
    currentUserId: string
    loadingId: number | null
    confirmDeleteId: number | null
    onRoleChange: (id: number, role: UserRole) => void
    onAskDelete: (id: number) => void
    onCancelDelete: () => void
    onConfirmDelete: (id: number) => void
}

const HEADERS = ["Pengguna", "Poin", "Role", "Bergabung", "Aksi"]

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function UsersTable({
    users,
    currentUserId,
    loadingId,
    confirmDeleteId,
    onRoleChange,
    onAskDelete,
    onCancelDelete,
    onConfirmDelete,
}: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
                <thead>
                    <tr
                        className="text-left text-[11px] font-bold uppercase tracking-wider"
                        style={{
                            background: "#F1EDE2",
                            color: "#6B7280",
                            borderBottom: "1px solid #E8E4D9",
                        }}
                    >
                        {HEADERS.map((h, i) => (
                            <th
                                key={i}
                                className={i === 0 ? "px-5 py-3" : "px-4 py-3"}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, idx) => (
                        <UserRow
                            key={u.id}
                            user={u}
                            isSelf={String(u.id) === currentUserId}
                            isLoading={loadingId === u.id}
                            isConfirmingDelete={confirmDeleteId === u.id}
                            isLast={idx === users.length - 1}
                            isAlt={idx % 2 !== 0}
                            onRoleChange={onRoleChange}
                            onAskDelete={onAskDelete}
                            onCancelDelete={onCancelDelete}
                            onConfirmDelete={onConfirmDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

/* ── Row ── */

type RowProps = {
    user: User
    isSelf: boolean
    isLoading: boolean
    isConfirmingDelete: boolean
    isLast: boolean
    isAlt: boolean
    onRoleChange: (id: number, role: UserRole) => void
    onAskDelete: (id: number) => void
    onCancelDelete: () => void
    onConfirmDelete: (id: number) => void
}

function UserRow({
    user: u,
    isSelf,
    isLoading,
    isConfirmingDelete,
    isLast,
    isAlt,
    onRoleChange,
    onAskDelete,
    onCancelDelete,
    onConfirmDelete,
}: RowProps) {
    const roleStyle = ROLE_STYLE[u.role]

    return (
        <tr
            className="transition-colors"
            style={{
                borderBottom: !isLast ? "1px solid #F1EDE2" : undefined,
                background: isAlt ? "#F8F6F0" : "#FCFBF8",
            }}
        >
            {/* User col */}
            <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                        style={{
                            background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                        }}
                    >
                        {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p
                            className="flex items-center gap-1.5 font-bold"
                            style={{ color: "#111827" }}
                        >
                            {u.name}
                            {isSelf && (
                                <span
                                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                                    style={{
                                        background: "#FEF3C7",
                                        color: "#92400E",
                                    }}
                                >
                                    Kamu
                                </span>
                            )}
                        </p>
                        <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                            {u.email}
                        </p>
                    </div>
                </div>
            </td>

            {/* Points col */}
            <td className="px-4 py-3.5">
                <span
                    className="text-[14px] font-extrabold"
                    style={{ color: "#F59E0B" }}
                >
                    {u.points.toLocaleString("id-ID")}
                </span>
                <span className="ml-1 text-[11px]" style={{ color: "#9CA3AF" }}>
                    pts
                </span>
            </td>

            {/* Role col */}
            <td className="px-4 py-3.5">
                {isSelf ? (
                    <RoleBadge role={u.role} />
                ) : (
                    <select
                        value={u.role}
                        disabled={isLoading}
                        onChange={(e) =>
                            onRoleChange(u.id, e.target.value as UserRole)
                        }
                        className="cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-bold outline-none transition-all"
                        style={{
                            background: roleStyle.bg,
                            color: roleStyle.color,
                            border: `1px solid ${roleStyle.bg}`,
                        }}
                    >
                        {USER_ROLES.map((r) => (
                            <option key={r} value={r}>
                                {USER_ROLE_LABELS[r]}
                            </option>
                        ))}
                    </select>
                )}
            </td>

            {/* Joined col */}
            <td
                className="whitespace-nowrap px-4 py-3.5 text-[12px]"
                style={{ color: "#9CA3AF" }}
            >
                {formatDate(u.created_at)}
            </td>

            {/* Action col */}
            <td className="px-4 py-3.5">
                {!isSelf && (
                    <DeleteAction
                        userId={u.id}
                        isLoading={isLoading}
                        isConfirming={isConfirmingDelete}
                        onAsk={onAskDelete}
                        onCancel={onCancelDelete}
                        onConfirm={onConfirmDelete}
                    />
                )}
            </td>
        </tr>
    )
}

/* ── Delete action button ── */

function DeleteAction({
    userId,
    isLoading,
    isConfirming,
    onAsk,
    onCancel,
    onConfirm,
}: {
    userId: number
    isLoading: boolean
    isConfirming: boolean
    onAsk: (id: number) => void
    onCancel: () => void
    onConfirm: (id: number) => void
}) {
    if (isConfirming) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onConfirm(userId)}
                    disabled={isLoading}
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-white transition-all hover:opacity-90"
                    style={{
                        background: "linear-gradient(135deg, #B91C1C, #991B1B)",
                        boxShadow: "0 2px 8px rgba(185,28,28,0.25)",
                    }}
                >
                    {isLoading ? (
                        <Loader2 size={11} className="animate-spin" />
                    ) : (
                        <>Ya, hapus</>
                    )}
                </button>
                <button
                    onClick={onCancel}
                    className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-colors"
                    style={{
                        background: "#F1EDE2",
                        color: "#6B7280",
                    }}
                >
                    Batal
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={() => onAsk(userId)}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-all"
            style={{
                background: "#FEE2E2",
                color: "#991B1B",
                border: "1px solid #FECACA",
            }}
        >
            <Trash2 size={11} /> Hapus
        </button>
    )
}