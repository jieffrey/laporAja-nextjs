import { Shield, User } from "lucide-react"
import type { Comment } from "@/lib/comment.api"

type Props = {
    comment: Comment
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

export default function CommentItem({ comment: c }: Props) {
    const isOfficial = c.role === "admin" || c.role === "superadmin"

    if (isOfficial) return <OfficialComment comment={c} />
    return <UserComment comment={c} />
}

/* ── User comment — simple chat bubble ── */
function UserComment({ comment: c }: { comment: Comment }) {
    return (
        <div className="flex gap-3">
            {/* Avatar */}
            <div
                className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{
                    background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                }}
            >
                {c.name.charAt(0).toUpperCase()}
            </div>

            {/* Bubble */}
            <div className="min-w-0 flex-1">
                <div
                    className="rounded-2xl rounded-tl-md px-3.5 py-2.5"
                    style={{
                        background: "#F8F6F0",
                        border: "1px solid #E8E4D9",
                    }}
                >
                    <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                            <p
                                className="text-[12px] font-bold"
                                style={{ color: "#111827" }}
                            >
                                {c.name}
                            </p>
                            <span
                                className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                                style={{
                                    background: "#CCFBF1",
                                    color: "#0F766E",
                                }}
                            >
                                <User size={8} />
                                Warga
                            </span>
                        </div>
                        <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
                            {formatDate(c.created_at)}
                        </p>
                    </div>
                    <p
                        className="whitespace-pre-line text-[13px] leading-relaxed"
                        style={{ color: "#374151" }}
                    >
                        {c.comment}
                    </p>
                </div>
            </div>
        </div>
    )
}

/* ── Admin/Superadmin comment — official "Tindak Lanjut" style ── */
function OfficialComment({ comment: c }: { comment: Comment }) {
    const isSuperAdmin = c.role === "superadmin"

    return (
        <div className="flex gap-3">
            {/* Avatar */}
            <div
                className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{
                    background: isSuperAdmin
                        ? "linear-gradient(135deg, #F59E0B, #EA580C)"
                        : "linear-gradient(135deg, #115E59, #0F766E)",
                }}
            >
                <Shield size={14} />
            </div>

            {/* Official card */}
            <div className="min-w-0 flex-1">
                <div
                    className="overflow-hidden rounded-2xl rounded-tl-md"
                    style={{
                        border: isSuperAdmin
                            ? "1px solid #FCD34D"
                            : "1px solid #5EEAD4",
                    }}
                >
                    {/* Header strip */}
                    <div
                        className="flex items-center justify-between px-3.5 py-2"
                        style={{
                            background: isSuperAdmin
                                ? "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(234,88,12,0.08))"
                                : "linear-gradient(135deg, rgba(20,184,166,0.12), rgba(15,118,110,0.08))",
                        }}
                    >
                        <div className="flex items-center gap-1.5">
                            <p
                                className="text-[12px] font-bold"
                                style={{ color: "#111827" }}
                            >
                                {c.name}
                            </p>
                            <span
                                className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                                style={
                                    isSuperAdmin
                                        ? {
                                              background: "#FEF3C7",
                                              color: "#92400E",
                                          }
                                        : {
                                              background: "#CCFBF1",
                                              color: "#115E59",
                                          }
                                }
                            >
                                <Shield size={8} />
                                {isSuperAdmin ? "Super Admin" : "Admin"}
                            </span>
                        </div>
                        <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
                            {formatDate(c.created_at)}
                        </p>
                    </div>

                    {/* Body */}
                    <div
                        className="px-3.5 py-2.5"
                        style={{ background: "#FCFBF8" }}
                    >
                        <p
                            className="mb-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{
                                color: isSuperAdmin ? "#EA580C" : "#0F766E",
                            }}
                        >
                            Tindak Lanjut
                        </p>
                        <p
                            className="whitespace-pre-line text-[13px] leading-relaxed"
                            style={{ color: "#374151" }}
                        >
                            {c.comment}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}