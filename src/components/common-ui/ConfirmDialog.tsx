"use client"

import { useEffect, useRef } from "react"
import { AlertTriangle, X } from "lucide-react"

type Props = {
    open: boolean
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    variant?: "danger" | "default"
    onConfirm: () => void
    onCancel: () => void
    loading?: boolean
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = "Hapus",
    cancelLabel = "Batal",
    variant = "danger",
    onConfirm,
    onCancel,
    loading = false,
}: Props) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel()
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [open, onCancel])

    if (!open) return null

    const isDanger = variant === "danger"

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onCancel}
        >
            <div
                className="absolute inset-0"
                style={{ background: "rgba(15,118,110,0.25)", backdropFilter: "blur(2px)" }}
            />
            <div
                ref={ref}
                className="relative w-full max-w-sm rounded-2xl p-6"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 16px 48px rgba(15,118,110,0.20)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onCancel}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                    style={{ color: "#9CA3AF" }}
                >
                    <X size={14} />
                </button>

                <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                        background: isDanger ? "#FEE2E2" : "#CCFBF1",
                        color: isDanger ? "#991B1B" : "#0F766E",
                    }}
                >
                    <AlertTriangle size={22} />
                </div>

                <h3
                    className="mb-1 text-center text-[16px] font-extrabold"
                    style={{ color: "#111827" }}
                >
                    {title}
                </h3>
                <p
                    className="mb-6 text-center text-[13px]"
                    style={{ color: "#6B7280" }}
                >
                    {message}
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 rounded-xl py-2.5 text-[13px] font-bold transition-all"
                        style={{
                            background: "#F1EDE2",
                            color: "#5F5E5A",
                        }}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 rounded-xl py-2.5 text-[13px] font-bold text-white transition-all active:scale-[0.98]"
                        style={{
                            background: isDanger
                                ? "linear-gradient(135deg, #DC2626, #EF4444)"
                                : "linear-gradient(135deg, #0F766E, #14B8A6)",
                            boxShadow: isDanger
                                ? "0 4px 14px rgba(220,38,38,0.25)"
                                : "0 4px 14px rgba(15,118,110,0.25)",
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Menghapus..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
