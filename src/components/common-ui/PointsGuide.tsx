import { ClipboardList, Loader, Flame, Trophy } from "lucide-react"
import { POINTS_CONFIG } from "@/lib/constant"

export default function PointsGuide({ compact }: { compact?: boolean }) {
    const rules = [
        { icon: <ClipboardList size={18} />, label: "Buat laporan", pts: `+${POINTS_CONFIG.CREATE_REPORT}`, color: "#0F766E" },
        { icon: <Loader size={18} />, label: "Laporan diproses", pts: `+${POINTS_CONFIG.IN_PROGRESS}`, color: "#F59E0B" },
        { icon: <Flame size={18} />, label: "Laporan selesai", pts: `+${POINTS_CONFIG.RESOLVED}`, color: "#EA580C" },
    ]

    if (compact) {
        return (
            <div className="flex flex-wrap gap-2">
                {rules.map((r) => (
                    <div key={r.label} className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "#F8F6F0", border: "1px solid #E8E4D9" }}>
                        <span style={{ color: r.color }}>{r.icon}</span>
                        <span className="text-[12px] font-bold" style={{ color: r.color }}>{r.pts}</span>
                        <span className="text-[11px]" style={{ color: "#6B7280" }}>{r.label}</span>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {rules.map((p) => (
                <div key={p.label} className="flex items-center gap-3 rounded-2xl p-4" style={{ background: "#FCFBF8", border: "1px solid #E8E4D9", boxShadow: "0 1px 3px rgba(15,118,110,0.04)" }}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "#FCFBF8", color: p.color, border: `1px solid ${p.color}30` }}>
                        {p.icon}
                    </div>
                    <div>
                        <p className="text-[13px]" style={{ color: "#6B7280" }}>{p.label}</p>
                        <p className="text-[15px] font-extrabold" style={{ color: p.color }}>{p.pts} poin</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
