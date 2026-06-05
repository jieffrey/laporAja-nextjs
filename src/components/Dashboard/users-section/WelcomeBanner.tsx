import { Sparkles, Trophy } from "lucide-react"

type Props = {
    name: string
    points: number
    totalReports: number
}

export default function UserWelcomeBanner({
    name,
    points,
    totalReports,
}: Props) {
    return (
        <div
            className="relative overflow-hidden rounded-2xl px-6 py-5 text-white"
            style={{
                background:
                    "linear-gradient(135deg, #115E59 0%, #0F766E 40%, #14B8A6 100%)",
                boxShadow: "0 12px 32px rgba(15,118,110,0.20)",
            }}
        >
            {/* Dot pattern */}
            <div
                className="pointer-events-none absolute right-0 top-0 h-full w-64"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.18) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                    opacity: 0.5,
                }}
            />

            <div className="relative flex items-start justify-between gap-4">
                <div>
                    <p
                        className="text-[13px] font-semibold"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                        Selamat datang kembali
                    </p>
                    <h1 className="mt-0.5 text-[24px] font-extrabold tracking-tight">
                        {name}
                    </h1>
                    <p
                        className="mt-1.5 flex items-center gap-1.5 text-[13px]"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                        {totalReports === 0 ? (
                            "Belum ada laporan. Yuk mulai kontribusi!"
                        ) : (
                            <>
                                Kamu sudah membuat {totalReports} laporan{" "}
                                <Sparkles size={14} />
                            </>
                        )}
                    </p>
                </div>

                {/* Points card */}
                <div
                    className="hidden flex-shrink-0 flex-col items-center justify-center rounded-2xl px-5 py-3 sm:flex"
                    style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <div className="flex items-center gap-1.5">
                        <Trophy size={18} style={{ color: "#FCD34D" }} />
                        <p className="text-[30px] font-extrabold leading-none">
                            {points.toLocaleString("id-ID")}
                        </p>
                    </div>
                    <p
                        className="mt-1 text-[11px] font-medium"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                        Poin Kamu
                    </p>
                </div>
            </div>
        </div>
    )
}