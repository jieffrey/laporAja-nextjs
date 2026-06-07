"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { createComment } from "@/lib/comment.api"

type Props = {
    reportId: number
    onCommentAdded: () => void
}

export default function CommentForm({ reportId, onCommentAdded }: Props) {
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        const trimmed = text.trim()
        if (!trimmed || loading) return

        setLoading(true)
        try {
            await createComment({ report_id: reportId, comment: trimmed })
            setText("")
            onCommentAdded()
        } catch (e) {
            console.error(e)
        }

        setLoading(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div
            className="flex items-end gap-2 rounded-xl px-3 py-2.5"
            style={{
                background: "#F8F6F0",
                border: "1px solid #E8E4D9",
            }}
        >
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tulis komentar..."
                rows={1}
                className="flex-1 resize-none bg-transparent text-[13px] leading-relaxed outline-none"
                style={{ color: "#374151", maxHeight: 120 }}
                onInput={(e) => {
                    const el = e.currentTarget
                    el.style.height = "auto"
                    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
                }}
            />
            <button
                onClick={handleSubmit}
                disabled={!text.trim() || loading}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all disabled:opacity-40"
                style={{
                    background:
                        text.trim()
                            ? "linear-gradient(135deg, #0F766E, #14B8A6)"
                            : "#E8E4D9",
                    color: text.trim() ? "#fff" : "#9CA3AF",
                    boxShadow: text.trim()
                        ? "0 2px 8px rgba(15,118,110,0.25)"
                        : "none",
                }}
            >
                {loading ? (
                    <Loader2 size={14} className="animate-spin" />
                ) : (
                    <Send size={14} />
                )}
            </button>
        </div>
    )
}