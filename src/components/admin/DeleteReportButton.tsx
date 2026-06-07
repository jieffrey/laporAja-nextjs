"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { deleteReport } from "@/lib/report.api"
import ConfirmDialog from "@/components/common-ui/ConfirmDialog"

type Props = {
    reportId: number
    redirectTo?: string
    variant?: "card" | "full"
    onDeleted?: () => void
}

export default function DeleteReportButton({
    reportId,
    redirectTo,
    variant = "full",
    onDeleted,
}: Props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = useCallback(async () => {
        setLoading(true)
        try {
            await deleteReport(reportId)
            setOpen(false)
            onDeleted?.()
            if (redirectTo) {
                router.push(redirectTo)
            } else {
                router.refresh()
            }
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }, [reportId, redirectTo, onDeleted, router])

    if (variant === "card") {
        return (
            <>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpen(true)
                    }}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all"
                    style={{ color: "#EF4444" }}
                >
                    <Trash2 size={12} />
                    Hapus
                </button>
                <ConfirmDialog
                    open={open}
                    title="Hapus Laporan"
                    message="Apakah kamu yakin ingin menghapus laporan ini? Tindakan ini tidak bisa dibatalkan."
                    confirmLabel="Ya, Hapus"
                    onConfirm={handleDelete}
                    onCancel={() => setOpen(false)}
                    loading={loading}
                />
            </>
        )
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold transition-all active:scale-[0.98]"
                style={{
                    background: "#FEE2E2",
                    color: "#991B1B",
                    border: "1px solid #FECACA",
                }}
            >
                <Trash2 size={14} />
                Hapus Laporan
            </button>
            <ConfirmDialog
                open={open}
                title="Hapus Laporan"
                message="Apakah kamu yakin ingin menghapus laporan ini? Tindakan ini tidak bisa dibatalkan."
                confirmLabel="Ya, Hapus"
                onConfirm={handleDelete}
                onCancel={() => setOpen(false)}
                loading={loading}
            />
        </>
    )
}
