import { MessageSquare } from "lucide-react"
import type { Comment } from "@/lib/comment.api"

type Props = {
    comments: Comment[]
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function ReportComments({ comments }: Props) {
    return (
        <div
            className="rounded-2xl px-5 py-4"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            {/* Section header */}
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-md"
                        style={{ background: "#CCFBF1", color: "#0F766E" }}
                    >
                        <MessageSquare size={12} />
                    </div>
                    <p
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: "#6B7280" }}
                    >
                        Komentar
                    </p>
                </div>
                <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                    style={{ background: "#F1EDE2", color: "#5F5E5A" }}
                >
                    {comments.length}
                </span>
            </div>

            {comments.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-[13px]" style={{ color: "#9CA3AF" }}>
                        Belum ada komentar
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {comments.map((c, i) => (
                        <CommentItem key={`${c.id}-${i}`} comment={c} />
                    ))}
                </div>
            )}
        </div>
    )
}

function CommentItem({ comment: c }: { comment: Comment }) {
    return (
        <div className="flex gap-3">
            {/* Avatar */}
            <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{
                    background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                }}
            >
                {c.name.charAt(0).toUpperCase()}
            </div>

            {/* Bubble */}
            <div
                className="flex-1 rounded-xl px-3 py-2.5"
                style={{
                    background: "#F8F6F0",
                    border: "1px solid #E8E4D9",
                }}
            >
                <div className="mb-1 flex items-center justify-between gap-2">
                    <p
                        className="truncate text-[12px] font-bold"
                        style={{ color: "#111827" }}
                    >
                        {c.name}
                    </p>
                    <p
                        className="flex-shrink-0 text-[11px]"
                        style={{ color: "#9CA3AF" }}
                    >
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
    )
}