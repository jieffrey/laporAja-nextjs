import { Camera } from "lucide-react"

type Props = {
    images?: string[] | string | null
    imageBefore?: string | null
    imageAfter?: string | null
}

// PostgreSQL TEXT[] bisa return "{url1,url2}" string — parse safely
function parseImages(raw: unknown): string[] {
    if (!raw) return []
    if (Array.isArray(raw)) return raw.filter(Boolean)
    if (typeof raw === "string") {
        // Handle PostgreSQL array format: {url1,url2}
        const cleaned = raw.replace(/^\{|\}$/g, "")
        if (!cleaned) return []
        return cleaned.split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean)
    }
    return []
}

export default function ReportImages({ images, imageBefore, imageAfter }: Props) {
    const parsed = parseImages(images)

    // Fallback to legacy single field
    const allImages = parsed.length > 0 ? parsed : imageBefore ? [imageBefore] : []

    const hasAfter = !!imageAfter

    if (allImages.length === 0 && !hasAfter) return null

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
            <div className="mb-3 flex items-center gap-2">
                <div
                    className="flex h-6 w-6 items-center justify-center rounded-md"
                    style={{ background: "#CCFBF1", color: "#0F766E" }}
                >
                    <Camera size={12} />
                </div>
                <p
                    className="text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: "#6B7280" }}
                >
                    Foto Bukti ({allImages.length + (hasAfter ? 1 : 0)})
                </p>
            </div>

            {/* Photos from reporter */}
            {allImages.length > 0 && (
                <div className="mb-3">
                    <p
                        className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: "#EA580C" }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#EA580C" }} />
                        Foto Pelapor
                    </p>
                    <div
                        className="grid gap-2"
                        style={{
                            gridTemplateColumns: `repeat(${Math.min(allImages.length, 3)}, minmax(0, 1fr))`,
                        }}
                    >
                        {allImages.map((src, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={i}
                                src={src}
                                alt={`Foto ${i + 1}`}
                                className="aspect-video w-full rounded-xl object-cover transition-transform duration-300 hover:scale-[1.02]"
                                style={{ border: "1px solid #E8E4D9", cursor: "pointer" }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* After photo from admin */}
            {hasAfter && (
                <div>
                    <p
                        className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: "#0F766E" }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#0F766E" }} />
                        Foto Sesudah (Admin)
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageAfter!}
                        alt="Sesudah"
                        className="aspect-video w-full rounded-xl object-cover sm:max-w-[50%]"
                        style={{ border: "1px solid #E8E4D9" }}
                    />
                </div>
            )}
        </div>
    )
}