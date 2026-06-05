import { Search } from "lucide-react"

type Props = {
    value: string
    onChange: (v: string) => void
    filteredCount: number
    totalCount: number
}

export default function UsersSearch({
    value,
    onChange,
    filteredCount,
    totalCount,
}: Props) {
    const isFiltered = filteredCount !== totalCount

    return (
        <div
            className="rounded-2xl px-4 py-3"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            <div className="relative max-w-sm">
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9CA3AF" }}
                />
                <input
                    type="text"
                    placeholder="Cari nama atau email..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-xl py-2 pl-9 pr-3 text-[13px] outline-none transition-all focus:bg-white"
                    style={{
                        background: "#F8F6F0",
                        border: "1px solid #E8E4D9",
                        color: "#374151",
                    }}
                />
            </div>

            {isFiltered && (
                <p className="mt-2 text-[12px]" style={{ color: "#9CA3AF" }}>
                    Menampilkan{" "}
                    <span className="font-bold" style={{ color: "#0F766E" }}>
                        {filteredCount}
                    </span>{" "}
                    dari {totalCount} pengguna
                </p>
            )}
        </div>
    )
}