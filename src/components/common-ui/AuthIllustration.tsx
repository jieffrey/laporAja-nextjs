type AuthIllustrationProps = {
    variant?: "login" | "register";
};

export default function AuthIllustration({ variant = "login" }: AuthIllustrationProps) {
    const isLogin = variant === "login";

    return (
        <div className="relative hidden flex-col items-center justify-center overflow-hidden lg:flex lg:w-1/2">
            {/* Inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-blue-900/30 to-transparent" />

            <div className="relative z-10 flex flex-col items-center px-12">
                {/* SVG illustration — swapped per variant */}
                {isLogin ? <LoginIllustrationSVG /> : <RegisterIllustrationSVG />}

                {/* Caption */}
                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-white">
                        {isLogin ? "Pantau Laporanmu" : "Jadikan Kotamu Lebih Baik"}
                    </h2>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                        {isLogin
                            ? "Cek status terkini, ikuti progres, dan lihat dampak nyata laporanmu di peta kota."
                            : "Bergabung dengan ribuan warga aktif. Setiap laporan membuat kota semakin layak huni."}
                    </p>
                </div>

                {/* Stats row */}
                <div className="mt-8 flex gap-8">
                    {(isLogin
                        ? [["2.8K+", "Laporan"], ["94%", "Selesai"], ["38", "Kota"]]
                        : [["5K+", "Warga"], ["+25", "Poin/laporan"], ["🏆", "Leaderboard"]]
                    ).map(([val, lbl]) => (
                        <div key={lbl} className="text-center">
                            <div className="text-xl font-extrabold text-white">{val}</div>
                            <div className="text-xs text-white/50">{lbl}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom live badge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md">
                <span
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    style={{ animation: "pulse 2s ease-in-out infinite" }}
                />
                <span className="text-xs font-semibold text-white/80">
                    {isLogin ? "Smart Geo Complaint System" : "Gratis · Transparan · Berdampak"}
                </span>
            </div>
        </div>
    );
}


function LoginIllustrationSVG() {
    return (
        <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm drop-shadow-2xl">
            {/* Background circle */}
            <circle cx="210" cy="170" r="155" fill="rgba(255,255,255,0.04)" />

            {/* Ground */}
            <rect x="40" y="268" width="340" height="8" rx="4" fill="rgba(255,255,255,0.10)" />

            {/* Buildings */}
            <rect x="58" y="148" width="52" height="120" rx="4" fill="rgba(255,255,255,0.12)" />
            <rect x="58" y="148" width="52" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
            {[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c => (
                <rect key={`b1-${r}-${c}`} x={65 + c * 14} y={162 + r * 20} width={9} height={12} rx={2}
                    fill={r === 1 && c === 1 ? "#FCD34D" : "rgba(255,255,255,0.18)"} />
            )))}

            <rect x="174" y="110" width="64" height="158" rx="4" fill="rgba(255,255,255,0.15)" />
            <rect x="174" y="110" width="64" height="8" rx="2" fill="rgba(255,255,255,0.25)" />
            <rect x="203" y="94" width="4" height="18" rx="2" fill="rgba(255,255,255,0.3)" />
            <circle cx="205" cy="92" r="4" fill="#34D399" />
            {[0, 1, 2, 3, 4, 5, 6].map(r => [0, 1, 2].map(c => (
                <rect key={`b3-${r}-${c}`} x={181 + c * 18} y={126 + r * 20} width={11} height={13} rx={2}
                    fill={r === 2 && c === 1 ? "#93C5FD" : r === 4 && c === 0 ? "#FCD34D" : "rgba(255,255,255,0.18)"} />
            )))}

            <rect x="308" y="152" width="54" height="116" rx="4" fill="rgba(255,255,255,0.12)" />
            <rect x="308" y="152" width="54" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
            {[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c => (
                <rect key={`b5-${r}-${c}`} x={315 + c * 14} y={166 + r * 20} width={9} height={12} rx={2}
                    fill={r === 3 && c === 2 ? "#FCD34D" : "rgba(255,255,255,0.18)"} />
            )))}

            {/* Road */}
            <rect x="40" y="260" width="340" height="16" fill="rgba(0,0,0,0.15)" />
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <rect key={`rd-${i}`} x={70 + i * 48} y="266" width="24" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            ))}

            {/* Main map pin */}
            <g transform="translate(196, 50)">
                <circle cx="14" cy="14" r="22" fill="rgba(255,255,255,0.08)" />
                <path d="M14 2C8.477 2 4 6.477 4 12c0 7 10 18 10 18s10-11 10-18c0-5.523-4.477-10-10-10z"
                    fill="#3B82F6" stroke="white" strokeWidth="1.5" />
                <circle cx="14" cy="12" r="4" fill="white" />
            </g>

            {/* Dashboard card */}
            <g transform="translate(30, 80)">
                <rect width="110" height="56" rx="12" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <rect x="10" y="12" width="90" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
                <rect x="10" y="26" width="55" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
                <rect x="10" y="38" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.10)" />
                <circle cx="96" cy="18" r="8" fill="rgba(16,185,129,0.3)" />
                <path d="M92 18l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Status card */}
            <g transform="translate(280, 72)">
                <rect width="104" height="52" rx="12" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <rect x="10" y="10" width="50" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
                <rect x="10" y="23" width="40" height="5" rx="2.5" fill="rgba(245,158,11,0.5)" />
                <rect x="10" y="35" width="65" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
            </g>

            {/* Small pins */}
            <path d="M100 228C97 228 94 231 94 234.5C94 238.5 100 244 100 244S106 238.5 106 234.5C106 231 103 228 100 228Z" fill="#F59E0B" opacity="0.8" />
            <circle cx="100" cy="234" r="2" fill="white" opacity="0.9" />
            <path d="M320 218C317 218 314 221 314 224.5C314 228.5 320 234 320 234S326 228.5 326 224.5C326 221 323 218 320 218Z" fill="#EF4444" opacity="0.8" />
            <circle cx="320" cy="224" r="2" fill="white" opacity="0.9" />

            {/* Connection lines */}
            <line x1="100" y1="228" x2="174" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="320" y1="218" x2="250" y2="190" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="205" y1="72" x2="205" y2="110" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Stars */}
            {[[80, 60], [340, 100], [60, 200], [360, 220], [150, 50], [290, 50]].map(([cx, cy], i) => (
                <circle key={`s-${i}`} cx={cx} cy={cy} r="1.5" fill="rgba(255,255,255,0.4)" />
            ))}
        </svg>
    );
}

/* ─────────────────────────────────────────────────────
   REGISTER illustration — community + points + badges
───────────────────────────────────────────────────── */
function RegisterIllustrationSVG() {
    return (
        <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm drop-shadow-2xl">
            {/* Background circles */}
            <circle cx="210" cy="170" r="150" fill="rgba(255,255,255,0.03)" />
            <circle cx="210" cy="170" r="100" fill="rgba(255,255,255,0.03)" />

            {/* Center trophy / star */}
            <circle cx="210" cy="145" r="52" fill="rgba(255,255,255,0.08)" />
            <circle cx="210" cy="145" r="38" fill="rgba(255,255,255,0.10)" />
            {/* Trophy icon */}
            <path d="M198 128h24v18c0 6.627-5.373 12-12 12s-12-5.373-12-12v-18z" fill="rgba(253,224,71,0.7)" />
            <rect x="205" y="158" width="10" height="8" fill="rgba(253,224,71,0.5)" />
            <rect x="200" y="166" width="20" height="4" rx="2" fill="rgba(253,224,71,0.6)" />
            <path d="M198 131h-6c0 6 4 10 6 10" stroke="rgba(253,224,71,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M222 131h6c0 6-4 10-6 10" stroke="rgba(253,224,71,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Person avatars in a circle */}
            {[
                { cx: 210, cy: 56, color: "#3B82F6", label: "A" },
                { cx: 300, cy: 100, color: "#10B981", label: "B" },
                { cx: 330, cy: 195, color: "#8B5CF6", label: "C" },
                { cx: 265, cy: 275, color: "#F59E0B", label: "D" },
                { cx: 155, cy: 275, color: "#EF4444", label: "E" },
                { cx: 90, cy: 195, color: "#EC4899", label: "F" },
                { cx: 120, cy: 100, color: "#0EA5E9", label: "G" },
            ].map((p, i) => (
                <g key={`person-${i}`}>
                    {/* Connection line to center */}
                    <line x1={p.cx} y1={p.cy} x2="210" y2="145"
                        stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                    {/* Avatar circle */}
                    <circle cx={p.cx} cy={p.cy} r="20" fill={p.color} fillOpacity="0.25" stroke={p.color} strokeWidth="1.5" strokeOpacity="0.5" />
                    <circle cx={p.cx} cy={p.cy - 5} r="6" fill={p.color} fillOpacity="0.7" />
                    <path d={`M${p.cx - 9} ${p.cy + 12} Q${p.cx} ${p.cy + 4} ${p.cx + 9} ${p.cy + 12}`}
                        fill={p.color} fillOpacity="0.5" />
                </g>
            ))}

            {/* Leaderboard card */}
            <g transform="translate(28, 130)">
                <rect width="108" height="88" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <rect x="10" y="10" width="88" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
                {[0, 1, 2].map(i => (
                    <g key={`lb-${i}`}>
                        <circle cx="22" cy={30 + i * 20} r="7" fill={["rgba(253,224,71,0.5)", "rgba(203,213,225,0.4)", "rgba(180,120,60,0.4)"][i]} />
                        <rect x="34" y={25 + i * 20} width="55" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
                        <rect x="34" y={33 + i * 20} width="35" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
                    </g>
                ))}
            </g>

            {/* Points card */}
            <g transform="translate(284, 130)">
                <rect width="108" height="88" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <rect x="10" y="10" width="70" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
                {/* Big points number */}
                <text x="54" y="52" textAnchor="middle" fontSize="26" fontWeight="800" fill="rgba(253,224,71,0.9)" fontFamily="system-ui">+25</text>
                <rect x="20" y="62" width="68" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
                <rect x="28" y="72" width="52" height="4" rx="2" fill="rgba(255,255,255,0.10)" />
            </g>

            {/* Floating badges */}
            <g transform="translate(162, 235)">
                <rect width="96" height="32" rx="16" fill="rgba(16,185,129,0.25)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
                <circle cx="20" cy="16" r="8" fill="rgba(16,185,129,0.4)" />
                <text x="19" y="20" textAnchor="middle" fontSize="9" fill="#34D399">★</text>
                <rect x="34" y="10" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
                <rect x="34" y="19" width="35" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
            </g>

            {/* Stars / particles */}
            {[[50, 50], [370, 60], [40, 280], [380, 270], [210, 20], [100, 300], [320, 300]].map(([cx, cy], i) => (
                <circle key={`star-${i}`} cx={cx} cy={cy} r="1.5" fill="rgba(255,255,255,0.4)" />
            ))}
        </svg>
    );
}