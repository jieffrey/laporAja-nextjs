import { Camera } from "lucide-react"

type Props = {
    imageBefore?: string | null
    imageAfter?: string | null
}

export default function ReportImages({ imageBefore, imageAfter }: Props) {
    // Don't render if no images at all
    if (!imageBefore && !imageAfter) return null

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
                    Foto Bukti
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {imageBefore && (
                    <ImageCard label="Sebelum" src={imageBefore} accent="#EA580C" />
                )}
                {imageAfter && (
                    <ImageCard label="Sesudah" src={imageAfter} accent="#0F766E" />
                )}
            </div>
        </div>
    )
}

function ImageCard({
    label,
    src,
    accent,
}: {
    label: string
    src: string
    accent: string
}) {
    return (
        <div>
            <div className="mb-1.5 flex items-center gap-1.5">
                <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: accent }}
                />
                <p
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: accent }}
                >
                    {label}
                </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={label}
                className="aspect-video w-full rounded-xl object-cover transition-transform duration-300 hover:scale-[1.02]"
                style={{ border: "1px solid #E8E4D9" }}
            />
        </div>
    )
}