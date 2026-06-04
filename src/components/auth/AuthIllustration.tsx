import { Trophy } from "lucide-react";

type AuthIllustrationProps = {
    variant?: "login" | "register";
};

export default function AuthIllustration({
    variant = "login",
}: AuthIllustrationProps) {
    const isLogin = variant === "login";

    return (
        <div className="relative hidden flex-col items-center justify-center overflow-hidden lg:flex lg:w-1/2">
            {/* Soft glows */}
            <div
                className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(20,184,166,0.30) 0%, transparent 70%)",
                    filter: "blur(20px)",
                }}
            />
            <div
                className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(245,158,11,0.20) 0%, transparent 70%)",
                    filter: "blur(20px)",
                }}
            />

            <div className="relative z-10 flex flex-col items-center px-12">
                {isLogin ? <LoginIllustrationSVG /> : <RegisterIllustrationSVG />}

                {/* Caption */}
                <div className="mt-8 text-center">
                    <h2
                        className="text-[26px] font-extrabold leading-tight tracking-tight"
                        style={{ color: "#111827" }}
                    >
                        {isLogin
                            ? "Pantau Laporanmu"
                            : "Jadikan Kotamu Lebih Baik"}
                    </h2>
                    <p
                        className="mx-auto mt-3 max-w-xs text-sm leading-relaxed"
                        style={{ color: "#6B7280" }}
                    >
                        {isLogin
                            ? "Cek status terkini, ikuti progres, dan lihat dampak nyata laporanmu di peta kota."
                            : "Bergabung dengan ribuan warga aktif. Setiap laporan membuat kota semakin layak huni."}
                    </p>
                </div>

                {/* Stats row */}
                <div className="mt-7 flex gap-7">
                    {(isLogin
                        ? [
                              ["2.8K+", "Laporan"],
                              ["94%", "Selesai"],
                              ["38", "Kota"],
                          ]
                        : [
                              ["5K+", "Warga"],
                              ["+25", "Poin/laporan"],
                              ["Top", "Leaderboard"],
                          ]
                    ).map(([val, lbl]) => (
                        <div key={lbl} className="text-center">
                            <div
                                className="text-xl font-extrabold"
                                style={{
                                    color:
                                        lbl === "Poin/laporan"
                                            ? "#F59E0B"
                                            : "#0F766E",
                                }}
                            >
                                {val}
                            </div>
                            <div className="text-xs" style={{ color: "#9CA3AF" }}>
                                {lbl}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom live badge */}
            <div
                className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl px-4 py-2.5"
                style={{
                    background: "rgba(252,251,248,0.85)",
                    border: "1px solid #E8E4D9",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 4px 14px rgba(15,118,110,0.10)",
                }}
            >
                <span
                    className="h-2 w-2 animate-pulse rounded-full"
                    style={{ background: "#14B8A6" }}
                />
                <span
                    className="text-xs font-semibold"
                    style={{ color: "#0F766E" }}
                >
                    {isLogin
                        ? "Smart Geo Complaint System"
                        : "Gratis · Transparan · Berdampak"}
                </span>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   LOGIN illustration — city with map pins
───────────────────────────────────────────────────── */
function LoginIllustrationSVG() {
    return (
        <svg
            viewBox="0 0 420 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-sm"
            style={{ filter: "drop-shadow(0 20px 40px rgba(15,118,110,0.18))" }}
        >
            {/* Background circle */}
            <circle cx="210" cy="170" r="155" fill="#CCFBF1" fillOpacity="0.55" />
            <circle cx="210" cy="170" r="110" fill="#5EEAD4" fillOpacity="0.25" />

            {/* Ground */}
            <rect x="40" y="268" width="340" height="8" rx="4" fill="#14B8A6" fillOpacity="0.30" />

            {/* Building L */}
            <rect x="58" y="148" width="52" height="120" rx="4" fill="#0F766E" fillOpacity="0.85" />
            <rect x="58" y="148" width="52" height="6" rx="2" fill="#0F766E" />
            {[0, 1, 2, 3, 4].map((r) =>
                [0, 1, 2].map((c) => (
                    <rect
                        key={`b1-${r}-${c}`}
                        x={65 + c * 14}
                        y={162 + r * 20}
                        width={9}
                        height={12}
                        rx={2}
                        fill={
                            r === 1 && c === 1
                                ? "#F59E0B"
                                : "rgba(255,255,255,0.45)"
                        }
                    />
                ))
            )}

            {/* Building Center (tallest) */}
            <rect x="174" y="110" width="64" height="158" rx="4" fill="#115E59" />
            <rect x="174" y="110" width="64" height="8" rx="2" fill="#0F766E" />
            <rect x="203" y="94" width="4" height="18" rx="2" fill="#5EEAD4" />
            <circle cx="205" cy="92" r="4" fill="#F59E0B" />
            {[0, 1, 2, 3, 4, 5, 6].map((r) =>
                [0, 1, 2].map((c) => (
                    <rect
                        key={`b3-${r}-${c}`}
                        x={181 + c * 18}
                        y={126 + r * 20}
                        width={11}
                        height={13}
                        rx={2}
                        fill={
                            r === 2 && c === 1
                                ? "#FCD34D"
                                : r === 4 && c === 0
                                    ? "#F59E0B"
                                    : "rgba(255,255,255,0.50)"
                        }
                    />
                ))
            )}

            {/* Building R */}
            <rect x="308" y="152" width="54" height="116" rx="4" fill="#0F766E" fillOpacity="0.85" />
            <rect x="308" y="152" width="54" height="6" rx="2" fill="#0F766E" />
            {[0, 1, 2, 3, 4].map((r) =>
                [0, 1, 2].map((c) => (
                    <rect
                        key={`b5-${r}-${c}`}
                        x={315 + c * 14}
                        y={166 + r * 20}
                        width={9}
                        height={12}
                        rx={2}
                        fill={
                            r === 3 && c === 2
                                ? "#F59E0B"
                                : "rgba(255,255,255,0.45)"
                        }
                    />
                ))
            )}

            {/* Road */}
            <rect x="40" y="260" width="340" height="16" fill="#115E59" fillOpacity="0.65" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <rect
                    key={`rd-${i}`}
                    x={70 + i * 48}
                    y="266"
                    width="24"
                    height="4"
                    rx="2"
                    fill="#FCD34D"
                />
            ))}

            {/* Main map pin */}
            <g transform="translate(196, 50)">
                <circle cx="14" cy="14" r="22" fill="#FCD34D" fillOpacity="0.35" />
                <path
                    d="M14 2C8.477 2 4 6.477 4 12c0 7 10 18 10 18s10-11 10-18c0-5.523-4.477-10-10-10z"
                    fill="#F59E0B"
                    stroke="#FCFBF8"
                    strokeWidth="1.5"
                />
                <circle cx="14" cy="12" r="4" fill="#FCFBF8" />
            </g>

            {/* Dashboard card */}
            <g transform="translate(30, 80)">
                <rect
                    width="110"
                    height="56"
                    rx="12"
                    fill="#FCFBF8"
                    stroke="#E8E4D9"
                    strokeWidth="1"
                />
                <rect x="10" y="12" width="90" height="7" rx="3.5" fill="#111827" />
                <rect x="10" y="26" width="55" height="6" rx="3" fill="#0F766E" fillOpacity="0.60" />
                <rect x="10" y="38" width="70" height="5" rx="2.5" fill="#E8E4D9" />
                <circle cx="96" cy="18" r="8" fill="#CCFBF1" />
                <path
                    d="M92 18l3 3 5-5"
                    stroke="#0F766E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>

            {/* Status card */}
            <g transform="translate(280, 72)">
                <rect
                    width="104"
                    height="52"
                    rx="12"
                    fill="#FCFBF8"
                    stroke="#E8E4D9"
                    strokeWidth="1"
                />
                <rect x="10" y="10" width="50" height="6" rx="3" fill="#111827" />
                <rect x="10" y="23" width="40" height="5" rx="2.5" fill="#F59E0B" />
                <rect x="10" y="35" width="65" height="5" rx="2.5" fill="#E8E4D9" />
            </g>

            {/* Small pins */}
            <path
                d="M100 228C97 228 94 231 94 234.5C94 238.5 100 244 100 244S106 238.5 106 234.5C106 231 103 228 100 228Z"
                fill="#F59E0B"
            />
            <circle cx="100" cy="234" r="2" fill="#FCFBF8" />
            <path
                d="M320 218C317 218 314 221 314 224.5C314 228.5 320 234 320 234S326 228.5 326 224.5C326 221 323 218 320 218Z"
                fill="#EA580C"
            />
            <circle cx="320" cy="224" r="2" fill="#FCFBF8" />

            {/* Connection lines */}
            <line
                x1="100"
                y1="228"
                x2="174"
                y2="180"
                stroke="#0F766E"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
            />
            <line
                x1="320"
                y1="218"
                x2="250"
                y2="190"
                stroke="#0F766E"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
            />
            <line
                x1="205"
                y1="72"
                x2="205"
                y2="110"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.6"
            />

            {/* Stars */}
            {[
                [80, 60],
                [340, 100],
                [60, 200],
                [360, 220],
                [150, 50],
                [290, 50],
            ].map(([cx, cy], i) => (
                <circle
                    key={`s-${i}`}
                    cx={cx}
                    cy={cy}
                    r="1.5"
                    fill="#14B8A6"
                    fillOpacity="0.55"
                />
            ))}
        </svg>
    );
}

/* ─────────────────────────────────────────────────────
   REGISTER illustration — community + trophy + badges
───────────────────────────────────────────────────── */
function RegisterIllustrationSVG() {
    return (
        <svg
            viewBox="0 0 420 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-sm"
            style={{ filter: "drop-shadow(0 20px 40px rgba(15,118,110,0.18))" }}
        >
            {/* Background circles */}
            <circle cx="210" cy="170" r="150" fill="#CCFBF1" fillOpacity="0.55" />
            <circle cx="210" cy="170" r="100" fill="#5EEAD4" fillOpacity="0.30" />

            {/* Center trophy area */}
            <circle cx="210" cy="145" r="52" fill="#FEF3C7" />
            <circle cx="210" cy="145" r="38" fill="#FCD34D" fillOpacity="0.85" />
            {/* Trophy */}
            <path
                d="M198 128h24v18c0 6.627-5.373 12-12 12s-12-5.373-12-12v-18z"
                fill="#EA580C"
            />
            <rect x="205" y="158" width="10" height="8" fill="#EA580C" />
            <rect x="200" y="166" width="20" height="4" rx="2" fill="#9A3412" />
            <path
                d="M198 131h-6c0 6 4 10 6 10"
                stroke="#EA580C"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M222 131h6c0 6-4 10-6 10"
                stroke="#EA580C"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />

            {/* Avatars around */}
            {[
                { cx: 210, cy: 56, color: "#0F766E", label: "A" },
                { cx: 300, cy: 100, color: "#14B8A6", label: "B" },
                { cx: 330, cy: 195, color: "#F59E0B", label: "C" },
                { cx: 265, cy: 275, color: "#EA580C", label: "D" },
                { cx: 155, cy: 275, color: "#0F766E", label: "E" },
                { cx: 90, cy: 195, color: "#14B8A6", label: "F" },
                { cx: 120, cy: 100, color: "#F59E0B", label: "G" },
            ].map((p, i) => (
                <g key={`person-${i}`}>
                    <line
                        x1={p.cx}
                        y1={p.cy}
                        x2="210"
                        y2="145"
                        stroke="#0F766E"
                        strokeOpacity="0.25"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                    />
                    <circle
                        cx={p.cx}
                        cy={p.cy}
                        r="20"
                        fill="#FCFBF8"
                        stroke={p.color}
                        strokeWidth="2"
                    />
                    <circle cx={p.cx} cy={p.cy - 5} r="6" fill={p.color} />
                    <path
                        d={`M${p.cx - 9} ${p.cy + 12} Q${p.cx} ${p.cy + 4} ${p.cx + 9} ${p.cy + 12}`}
                        fill={p.color}
                    />
                </g>
            ))}

            {/* Leaderboard card */}
            <g transform="translate(28, 130)">
                <rect
                    width="108"
                    height="88"
                    rx="14"
                    fill="#FCFBF8"
                    stroke="#E8E4D9"
                    strokeWidth="1"
                />
                <rect x="10" y="10" width="88" height="6" rx="3" fill="#111827" />
                {[0, 1, 2].map((i) => (
                    <g key={`lb-${i}`}>
                        <circle
                            cx="22"
                            cy={30 + i * 20}
                            r="7"
                            fill={
                                ["#F59E0B", "#9CA3AF", "#D97706"][i]
                            }
                        />
                        <rect
                            x="34"
                            y={25 + i * 20}
                            width="55"
                            height="5"
                            rx="2.5"
                            fill="#374151"
                        />
                        <rect
                            x="34"
                            y={33 + i * 20}
                            width="35"
                            height="4"
                            rx="2"
                            fill="#E8E4D9"
                        />
                    </g>
                ))}
            </g>

            {/* Points card */}
            <g transform="translate(284, 130)">
                <rect
                    width="108"
                    height="88"
                    rx="14"
                    fill="#FCFBF8"
                    stroke="#E8E4D9"
                    strokeWidth="1"
                />
                <rect x="10" y="10" width="70" height="6" rx="3" fill="#111827" />
                <text
                    x="54"
                    y="52"
                    textAnchor="middle"
                    fontSize="26"
                    fontWeight="800"
                    fill="#F59E0B"
                    fontFamily="system-ui"
                >
                    +25
                </text>
                <rect x="20" y="62" width="68" height="5" rx="2.5" fill="#0F766E" fillOpacity="0.55" />
                <rect x="28" y="72" width="52" height="4" rx="2" fill="#E8E4D9" />
            </g>

            {/* Floating badge */}
            <g transform="translate(162, 235)">
                <rect
                    width="96"
                    height="32"
                    rx="16"
                    fill="#CCFBF1"
                    stroke="#14B8A6"
                    strokeWidth="1.5"
                />
                <circle cx="20" cy="16" r="8" fill="#0F766E" />
                <path
                    d="M16 16 L19 19 L24 13"
                    stroke="#FCFBF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <rect x="34" y="10" width="50" height="5" rx="2.5" fill="#0F766E" />
                <rect x="34" y="19" width="35" height="4" rx="2" fill="#0F766E" fillOpacity="0.50" />
            </g>

            {/* Sparkles */}
            {[
                [50, 50],
                [370, 60],
                [40, 280],
                [380, 270],
                [210, 20],
                [100, 300],
                [320, 300],
            ].map(([cx, cy], i) => (
                <circle
                    key={`star-${i}`}
                    cx={cx}
                    cy={cy}
                    r="1.5"
                    fill="#F59E0B"
                    fillOpacity="0.65"
                />
            ))}
        </svg>
    );
}