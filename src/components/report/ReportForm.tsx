"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Sparkles, Loader2, CheckCircle2 } from "lucide-react"
import {
    createReportSchema,
    type CreateReportInput,
} from "@/service/zod/report.schema"
import { REPORT_CATEGORIES } from "@/lib/constant"
import { createReport } from "@/lib/report.api"
import Button from "@/components/common-ui/Button"
import ImageUploader from "@/components/common-ui/ImageUploader"

const LocationPicker = dynamic(
    () => import("@/components/report/LocationPicker"),
    {
        ssr: false,
        loading: () => (
            <div
                className="flex h-56 items-center justify-center rounded-2xl text-[13px]"
                style={{
                    background: "#F8F6F0",
                    border: "1px solid #E8E4D9",
                    color: "#9CA3AF",
                }}
            >
                Memuat peta...
            </div>
        ),
    }
)

const inputStyle: React.CSSProperties = {
    background: "#FCFBF8",
    border: "1.5px solid #E8E4D9",
    color: "#111827",
}

const focusClass =
    "outline-none transition-all focus:bg-white focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20"

type AISuggestion = {
    category: string
    priority: "Low" | "Medium" | "High"
    confidence: number
} | null

export default function ReportForm() {
    const router = useRouter()
    const [submitError, setSubmitError] = useState("")
    const [images, setImages] = useState<File[]>([])
    const [imageError, setImageError] = useState("")

    // AI suggestion state
    const [aiLoading, setAiLoading] = useState(false)
    const [aiSuggestion, setAiSuggestion] = useState<AISuggestion>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<CreateReportInput>({
        resolver: zodResolver(createReportSchema),
        defaultValues: {
            priority: "Medium",
            latitude: "",
            longitude: "",
        },
    })

    const latitude = watch("latitude")
    const longitude = watch("longitude")
    const title = watch("title")
    const description = watch("description")

    // Auto-categorize: debounce 800ms setelah title/description berubah
    useEffect(() => {
        const titleLen = title?.length ?? 0
        const descLen = description?.length ?? 0
        const canSuggest = titleLen > 5 || descLen > 10

        if (!canSuggest) return

        // Clear debounce sebelumnya
        if (debounceRef.current) clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(async () => {
            setAiLoading(true)
            try {
                const res = await fetch("/api/ai/categorize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, description }),
                })
                const json = await res.json()

                if (json.success && json.data) {
                    const suggestion = json.data as AISuggestion
                    setAiSuggestion(suggestion)
                    // Langsung apply ke form
                    setValue("category", suggestion!.category, { shouldValidate: true })
                    setValue("priority", suggestion!.priority, { shouldValidate: true })
                }
            } catch (e) {
                console.error("AI suggestion failed:", e)
            } finally {
                setAiLoading(false)
            }
        }, 800)

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [title, description, setValue])

    const onSubmit = async (data: CreateReportInput) => {
        if (images.length === 0) {
            setImageError("Minimal 1 foto diperlukan")
            return
        }
        setImageError("")
        setSubmitError("")

        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("description", data.description)
            formData.append("category", data.category)
            formData.append("priority", data.priority)
            if (data.latitude) formData.append("latitude", data.latitude)
            if (data.longitude) formData.append("longitude", data.longitude)

            images.forEach((file) => {
                formData.append("images", file)
            })

            await createReport(formData)
            router.push("/user/laporan")
            router.refresh()
        } catch (err) {
            setSubmitError(
                err instanceof Error ? err.message : "Gagal mengirim laporan"
            )
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="mb-1.5 block text-[13px] font-bold"
                    style={{ color: "#374151" }}
                >
                    Judul laporan
                </label>
                <input
                    id="title"
                    type="text"
                    className={`w-full rounded-xl px-4 py-2.5 text-[14px] ${focusClass}`}
                    style={inputStyle}
                    placeholder="Contoh: Jalan berlubang di depan RT 05"
                    {...register("title")}
                />
                {errors.title && (
                    <FieldError message={errors.title.message} />
                )}
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="description"
                    className="mb-1.5 block text-[13px] font-bold"
                    style={{ color: "#374151" }}
                >
                    Deskripsi
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className={`w-full rounded-xl px-4 py-2.5 text-[14px] ${focusClass}`}
                    style={inputStyle}
                    placeholder="Jelaskan masalah secara detail..."
                    {...register("description")}
                />
                {errors.description && (
                    <FieldError message={errors.description.message} />
                )}
            </div>

            {/* ── AI Suggestion ── */}
            <div
                className="rounded-xl p-4"
                style={{
                    background: aiSuggestion
                        ? "linear-gradient(135deg, rgba(20,184,166,0.08), rgba(245,158,11,0.06))"
                        : "#F8F6F0",
                    border: aiSuggestion
                        ? "1px solid #5EEAD4"
                        : "1px solid #E8E4D9",
                    transition: "all 0.3s ease",
                }}
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div
                            className="flex h-7 w-7 items-center justify-center rounded-lg"
                            style={{
                                background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                                color: "#fff",
                            }}
                        >
                            <Sparkles size={13} />
                        </div>
                        <div>
                            <p className="text-[13px] font-bold" style={{ color: "#111827" }}>
                                AI Auto-Kategorisasi
                            </p>
                            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                                {aiLoading
                                    ? "Menganalisis judul & deskripsi..."
                                    : aiSuggestion
                                        ? "Kategori & prioritas otomatis diterapkan"
                                        : "Isi judul atau deskripsi untuk memulai"}
                            </p>
                        </div>
                    </div>

                    {/* Loading spinner atau checkmark */}
                    {aiLoading && (
                        <Loader2
                            size={16}
                            className="animate-spin flex-shrink-0"
                            style={{ color: "#14B8A6" }}
                        />
                    )}
                    {!aiLoading && aiSuggestion && (
                        <CheckCircle2
                            size={16}
                            className="flex-shrink-0"
                            style={{ color: "#0F766E" }}
                        />
                    )}
                </div>

                {/* AI Result badges */}
                {aiSuggestion && !aiLoading && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                            className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                            style={{ background: "#CCFBF1", color: "#0F766E" }}
                        >
                            {aiSuggestion.category}
                        </span>
                        <span
                            className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                            style={{
                                background:
                                    aiSuggestion.priority === "High"
                                        ? "#FEE2E2"
                                        : aiSuggestion.priority === "Medium"
                                            ? "#FEF3C7"
                                            : "#CCFBF1",
                                color:
                                    aiSuggestion.priority === "High"
                                        ? "#991B1B"
                                        : aiSuggestion.priority === "Medium"
                                            ? "#92400E"
                                            : "#0F766E",
                            }}
                        >
                            {aiSuggestion.priority}
                        </span>
                        <span className="text-[10px]" style={{ color: "#9CA3AF" }}>
                            {Math.round(aiSuggestion.confidence * 100)}% confidence
                        </span>
                    </div>
                )}
            </div>

            {/* Category + Priority */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="category"
                        className="mb-1.5 block text-[13px] font-bold"
                        style={{ color: "#374151" }}
                    >
                        Kategori
                    </label>
                    <select
                        id="category"
                        className={`w-full rounded-xl px-4 py-2.5 text-[14px] ${focusClass}`}
                        style={inputStyle}
                        defaultValue=""
                        {...register("category")}
                    >
                        <option value="" disabled>
                            Pilih kategori
                        </option>
                        {REPORT_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <FieldError message={errors.category.message} />
                    )}
                </div>

                <div>
                    <label
                        htmlFor="priority"
                        className="mb-1.5 block text-[13px] font-bold"
                        style={{ color: "#374151" }}
                    >
                        Prioritas
                    </label>
                    <select
                        id="priority"
                        className={`w-full rounded-xl px-4 py-2.5 text-[14px] ${focusClass}`}
                        style={inputStyle}
                        {...register("priority")}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>

            {/* Multi image uploader */}
            <ImageUploader
                files={images}
                onChange={(files) => {
                    setImages(files)
                    if (files.length > 0) setImageError("")
                }}
                max={5}
                error={imageError}
            />

            {/* Location */}
            <LocationPicker
                latitude={latitude}
                longitude={longitude}
                onChange={(lat, lng) => {
                    setValue("latitude", lat, { shouldValidate: true })
                    setValue("longitude", lng, { shouldValidate: true })
                }}
            />

            {/* Submit error */}
            {submitError && (
                <div
                    className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                    style={{ background: "#FEE2E2", border: "1px solid #FECACA" }}
                >
                    <AlertCircle size={16} style={{ color: "#991B1B" }} />
                    <p className="text-[13px] font-medium" style={{ color: "#991B1B" }}>
                        {submitError}
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className={isSubmitting ? "pointer-events-none opacity-70" : ""}
                >
                    {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
                </Button>
                <button
                    type="button"
                    onClick={() => router.push("/user/laporan")}
                    className="rounded-full px-6 py-2.5 text-[15px] font-bold transition-colors"
                    style={{
                        background: "#F8F6F0",
                        border: "1.5px solid #E8E4D9",
                        color: "#6B7280",
                    }}
                >
                    Batal
                </button>
            </div>
        </form>
    )
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null
    return (
        <div className="mt-1.5 flex items-center gap-1">
            <AlertCircle size={11} style={{ color: "#991B1B" }} />
            <p className="text-[12px] font-medium" style={{ color: "#991B1B" }}>
                {message}
            </p>
        </div>
    )
}