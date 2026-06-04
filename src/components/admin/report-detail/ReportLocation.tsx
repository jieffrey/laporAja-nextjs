import { MapPin, ExternalLink } from "lucide-react"

type Props = {
    latitude?: number | string | null
    longitude?: number | string | null
}

export default function ReportLocation({ latitude, longitude }: Props) {
    if (!latitude || !longitude) return null

    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`

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
                    <MapPin size={12} />
                </div>
                <p
                    className="text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: "#6B7280" }}
                >
                    Lokasi
                </p>
            </div>

            {/* Coords card */}
            <div
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: "#F8F6F0", border: "1px solid #E8E4D9" }}
            >
                <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                        background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                        boxShadow: "0 4px 12px rgba(15,118,110,0.20)",
                    }}
                >
                    <MapPin size={18} style={{ color: "#fff" }} />
                </div>

                <div className="min-w-0 flex-1">
                    <p
                        className="truncate text-[13px] font-bold"
                        style={{ color: "#111827" }}
                    >
                        {latitude}, {longitude}
                    </p>
                    <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                        Koordinat GPS
                    </p>
                </div>

                {/* Open in Maps */}
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all hover:-translate-y-0.5"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                        color: "#0F766E",
                    }}
                >
                    Buka <ExternalLink size={11} />
                </a>
            </div>

            {/* TODO: tambah LeafletMap dynamic import */}
        </div>
    )
}