"use client"

import { useState, useEffect, useCallback } from "react"
import { MessageSquare } from "lucide-react"
import { getCommentsByReport } from "@/lib/comment.api"
import type { Comment } from "@/lib/comment.api"
import CommentItem from "@/components/comment/CommentItem"
import CommentForm from "@/components/comment/CommentForm"

type Props = {
    reportId: number
    initialComments?: Comment[]
}

export default function CommentSection({
    reportId,
    initialComments,
}: Props) {
    const [comments, setComments] = useState<Comment[]>(
        initialComments ?? []
    )
    const [loading, setLoading] = useState(!initialComments)

    const fetchComments = useCallback(async () => {
        try {
            const data = await getCommentsByReport(reportId)
            setComments(data)
        } catch (e) {
            console.error(e)
        }

        setLoading(false)
    }, [reportId])

    useEffect(() => {
        if (!initialComments) fetchComments()
    }, [initialComments, fetchComments])

    return (
        <div
            className="overflow-hidden rounded-2xl"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: "1px solid #F1EDE2" }}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-md"
                        style={{ background: "#CCFBF1", color: "#0F766E" }}
                    >
                        <MessageSquare size={12} />
                    </div>
                    <p
                        className="text-[14px] font-bold"
                        style={{ color: "#111827" }}
                    >
                        Komentar & Tindak Lanjut
                    </p>
                </div>
                <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                    style={{ background: "#F1EDE2", color: "#5F5E5A" }}
                >
                    {comments.length}
                </span>
            </div>

            {/* Comments list */}
            <div className="px-5 py-4">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div
                            className="h-5 w-5 animate-spin rounded-full"
                            style={{
                                border: "2px solid #CCFBF1",
                                borderTopColor: "#0F766E",
                            }}
                        />
                    </div>
                ) : comments.length === 0 ? (
                    <p
                        className="py-6 text-center text-[13px]"
                        style={{ color: "#9CA3AF" }}
                    >
                        Belum ada komentar — jadilah yang pertama
                    </p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((c) => (
                            <CommentItem key={c.id} comment={c} />
                        ))}
                    </div>
                )}
            </div>

            {/* Comment input */}
            <div
                className="px-5 pb-4"
                style={{ borderTop: "1px solid #F1EDE2", paddingTop: 16 }}
            >
                <CommentForm
                    reportId={reportId}
                    onCommentAdded={fetchComments}
                />
            </div>
        </div>
    )
}