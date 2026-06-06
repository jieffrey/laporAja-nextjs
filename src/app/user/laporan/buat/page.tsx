import { PlusCircle } from "lucide-react"
import ReportForm from "@/components/report/ReportForm"

export default function BuatLaporanPage() {
    return (
        <div className="space-y-5">
            {/* Header */}
            <section
                className="rounded-2xl px-5 py-4"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            background:
                                "linear-gradient(135deg, #0F766E, #14B8A6)",
                            color: "#fff",
                            boxShadow: "0 4px 12px rgba(15,118,110,0.25)",
                        }}
                    >
                        <PlusCircle size={20} />
                    </div>
                    <div>
                        <h1
                            className="text-[20px] font-extrabold tracking-tight"
                            style={{ color: "#111827" }}
                        >
                            Buat Laporan Baru
                        </h1>
                        <p
                            className="mt-0.5 text-[13px]"
                            style={{ color: "#6B7280" }}
                        >
                            Isi detail masalah, unggah foto, dan tandai lokasi
                            di peta.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section
                className="rounded-2xl px-5 py-6"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                <ReportForm />
            </section>
        </div>
    )
}