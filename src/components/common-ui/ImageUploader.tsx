"use client"

import { useRef, useState, useCallback } from "react"
import { Camera, X, Plus, AlertCircle } from "lucide-react"

type Props = {
    files: File[]
    onChange: (files: File[]) => void
    max?: number
    error?: string
}

export default function ImageUploader({
    files,
    onChange,
    max = 5,
    error,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = useState(false)

    const addFiles = useCallback(
        (newFiles: FileList | File[]) => {
            const accepted = Array.from(newFiles).filter((f) =>
                ["image/jpeg", "image/png", "image/webp"].includes(f.type)
            )
            const combined = [...files, ...accepted].slice(0, max)
            onChange(combined)
        },
        [files, max, onChange]
    )

    const removeFile = useCallback(
        (index: number) => {
            onChange(files.filter((_, i) => i !== index))
        },
        [files, onChange]
    )

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            setDragActive(false)
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
        },
        [addFiles]
    )

    const canAddMore = files.length < max

    return (
        <div className="space-y-2">
            {/* Label */}
            <div className="flex items-center gap-2">
                <div
                    className="flex h-6 w-6 items-center justify-center rounded-md"
                    style={{ background: "#CCFBF1", color: "#0F766E" }}
                >
                    <Camera size={12} />
                </div>
                <p
                    className="text-[13px] font-bold"
                    style={{ color: "#374151" }}
                >
                    Foto Bukti
                </p>
                <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
                    ({files.length}/{max})
                </span>
            </div>

            {/* Preview grid + drop zone */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {/* Existing previews */}
                {files.map((file, i) => (
                    <PreviewCard
                        key={`${file.name}-${i}`}
                        file={file}
                        onRemove={() => removeFile(i)}
                    />
                ))}

                {/* Add more button / drop zone */}
                {canAddMore && (
                    <div
                        className="relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl transition-all"
                        style={{
                            background: dragActive ? "#CCFBF1" : "#F8F6F0",
                            border: dragActive
                                ? "2px dashed #14B8A6"
                                : "2px dashed #E8E4D9",
                        }}
                        onClick={() => inputRef.current?.click()}
                        onDragOver={(e) => {
                            e.preventDefault()
                            setDragActive(true)
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                    >
                        <Plus
                            size={20}
                            style={{
                                color: dragActive ? "#0F766E" : "#9CA3AF",
                            }}
                        />
                        <p
                            className="mt-1 text-[10px] font-medium"
                            style={{
                                color: dragActive ? "#0F766E" : "#9CA3AF",
                            }}
                        >
                            {files.length === 0 ? "Tambah foto" : "Tambah lagi"}
                        </p>
                    </div>
                )}
            </div>

            {/* Hidden input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => {
                    if (e.target.files?.length) addFiles(e.target.files)
                    e.target.value = ""
                }}
            />

            {/* Error */}
            {error && (
                <div className="flex items-center gap-1 text-[12px]">
                    <AlertCircle size={11} style={{ color: "#991B1B" }} />
                    <p className="font-medium" style={{ color: "#991B1B" }}>
                        {error}
                    </p>
                </div>
            )}

            {/* Hint */}
            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                JPG, PNG, atau WebP. Maksimal {max} foto.
            </p>
        </div>
    )
}

/* ── Preview card ── */
function PreviewCard({
    file,
    onRemove,
}: {
    file: File
    onRemove: () => void
}) {
    const [src] = useState(() => URL.createObjectURL(file))

    return (
        <div
            className="group relative aspect-square overflow-hidden rounded-xl"
            style={{ border: "1px solid #E8E4D9" }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={file.name}
                className="h-full w-full object-cover"
            />

            {/* Overlay on hover */}
            <div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "rgba(17,24,39,0.45)" }}
            >
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove()
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110"
                    style={{
                        background: "rgba(255,255,255,0.95)",
                        color: "#991B1B",
                    }}
                >
                    <X size={14} />
                </button>
            </div>

            {/* File size label */}
            <div
                className="absolute bottom-1.5 left-1.5 rounded-md px-1.5 py-0.5 text-[9px] font-medium"
                style={{
                    background: "rgba(252,251,248,0.90)",
                    color: "#6B7280",
                }}
            >
                {(file.size / 1024 / 1024).toFixed(1)}MB
            </div>
        </div>
    )
}