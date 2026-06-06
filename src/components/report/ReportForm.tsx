"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Upload } from "lucide-react"
import {
    createReportSchema,
    type CreateReportInput,
} from "@/service/zod/report.schema"
import { REPORT_CATEGORIES } from "@/lib/constant"
import { createReport } from "@/lib/report.api"
import Button from "@/components/common-ui/Button"

const LocationPicker = dynamic(() => import("./LocationPicker"), {
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
})

const inputStyle: React.CSSProperties = {
    background: "#FCFBF8",
    border: "1.5px solid #E8E4D9",
    color: "#111827",
}

const focusClass =
    "outline-none transition-all focus:bg-white focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20"

export default function ReportForm() {
    const router = useRouter()
    const [submitError, setSubmitError] = useState("")

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

    const onSubmit = async (data: CreateReportInput) => {
        setSubmitError("")
        try {
            await createReport({
                title: data.title,
                description: data.description,
                category: data.category,
                priority: data.priority,
                latitude: data.latitude || undefined,
                longitude: data.longitude || undefined,
                image_before: data.image_before ?? null,
            })
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

            {/* Image upload */}
            <div>
                <label
                    htmlFor="image_before"
                    className="mb-1.5 block text-[13px] font-bold"
                    style={{ color: "#374151" }}
                >
                    Foto kondisi (opsional)
                </label>
                <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                        background: "#F8F6F0",
                        border: "1px dashed #E8E4D9",
                    }}
                >
                    <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{ background: "#CCFBF1", color: "#0F766E" }}
                    >
                        <Upload size={16} />
                    </div>
                    <input
                        id="image_before"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="block w-full text-[13px] file:mr-3 file:rounded-full file:border-0 file:px-4 file:py-1.5 file:text-[12px] file:font-bold"
                        style={{
                            color: "#6B7280",
                        }}
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            setValue("image_before", file ?? null, {
                                shouldValidate: true,
                            })
                        }}
                    />
                </div>
                {errors.image_before && (
                    <FieldError message={errors.image_before.message} />
                )}
            </div>

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
                    style={{
                        background: "#FEE2E2",
                        border: "1px solid #FECACA",
                    }}
                >
                    <AlertCircle size={16} style={{ color: "#991B1B" }} />
                    <p
                        className="text-[13px] font-medium"
                        style={{ color: "#991B1B" }}
                    >
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

/* ── Field error helper ── */
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