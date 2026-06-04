import { FileText } from "lucide-react"

type Props = {
    description: string
}

export default function ReportDescription({ description }: Props) {
    return (
        <div
            className="rounded-2xl px-5 py-4"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            <div className="mb-3 flex items-center gap-2">
                <div
                    className="flex h-6 w-6 items-center justify-center rounded-md"
                    style={{ background: "#CCFBF1", color: "#0F766E" }}
                >
                    <FileText size={12} />
                </div>
                <p
                    className="text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: "#6B7280" }}
                >
                    Deskripsi
                </p>
            </div>

            <p
                className="whitespace-pre-line text-[14px] leading-relaxed"
                style={{ color: "#374151" }}
            >
                {description}
            </p>
        </div>
    )
}