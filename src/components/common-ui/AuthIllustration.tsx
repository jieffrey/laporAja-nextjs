type AuthIllustrationProps = {
    variant?: "login" | "register";
};

export default function AuthIllustration({ variant = "login" }: AuthIllustrationProps) {
    const isLogin = variant === "login";

    return (
        <div className="relative hidden flex-col items-center justify-center overflow-hidden lg:flex lg:w-1/2">
            {/* Left panel subtle inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-900/30 to-transparent" />

            {/* Illustration */}
            <div className="relative z-10 flex flex-col items-center px-12">
                <SmartCitySVG />

                {/* Caption */}
                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-white">
                        {isLogin ? "Selamat Datang Kembali" : "Bergabung Bersama Kami"}
                    </h2>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                        {isLogin
                            ? "Pantau laporan kamu, lihat progress, dan bantu wujudkan kota yang lebih baik."
                            : "Jadilah bagian dari ribuan warga aktif yang berkontribusi untuk kota yang lebih baik."}
                    </p>
                </div>

                {/* Stats row */}
                <div className="mt-8 flex gap-8">
                    {[
                        ["2.8K+", "Laporan"],
                        ["94%", "Selesai"],
                        ["38", "Kota"],
                    ].map(([val, lbl]) => (
                        <div key={lbl} className="text-center">
                            <div className="text-xl font-extrabold text-white">{val}</div>
                            <div className="text-xs text-white/50">{lbl}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom floating badge */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md"
            >
                <span
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    style={{ animation: "pulse 2s ease-in-out infinite" }}
                />
                <span className="text-xs font-semibold text-white/80">
                    Smart Geo Complaint System
                </span>
            </div>
        </div>
    );
}

/* ─── Inline SVG Illustration ─── */
function SmartCitySVG() {
    return (
        <svg
            viewBox="0 0 420 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-sm drop-shadow-2xl"
        >
            {/* ── Sky / background circle ── */}
            <circle cx="210" cy="170" r="155" fill="rgba(255,255,255,0.05)" />
            <circle cx="210" cy="170" r="120" fill="rgba(255,255,255,0.04)" />

            {/* ── Ground ── */}
            <rect x="40" y="268" width="340" height="8" rx="4" fill="rgba(255,255,255,0.12)" />

            {/* ── Building 1 (tall, left) ── */}
            <rect x="58" y="148" width="52" height="120" rx="4" fill="rgba(255,255,255,0.12)" />
            <rect x="58" y="148" width="52" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
            {/* windows */}
            {[0,1,2,3,4].map(row => [0,1,2].map(col => (
                <rect
                    key={`b1-${row}-${col}`}
                    x={65 + col * 14}
                    y={162 + row * 20}
                    width={9}
                    height={12}
                    rx={2}
                    fill={row === 1 && col === 1 ? "#FCD34D" : "rgba(255,255,255,0.18)"}
                />
            )))}

            {/* ── Building 2 (short, left-mid) ── */}
            <rect x="122" y="188" width="40" height="80" rx="4" fill="rgba(255,255,255,0.10)" />
            <rect x="122" y="188" width="40" height="6" rx="2" fill="rgba(255,255,255,0.18)" />
            {[0,1,2].map(row => [0,1].map(col => (
                <rect
                    key={`b2-${row}-${col}`}
                    x={129 + col * 16}
                    y={202 + row * 20}
                    width={10}
                    height={12}
                    rx={2}
                    fill="rgba(255,255,255,0.2)"
                />
            )))}

            {/* ── Building 3 (tallest, center) ── */}
            <rect x="174" y="110" width="64" height="158" rx="4" fill="rgba(255,255,255,0.15)" />
            <rect x="174" y="110" width="64" height="8" rx="2" fill="rgba(255,255,255,0.25)" />
            {/* Antenna */}
            <rect x="203" y="94" width="4" height="18" rx="2" fill="rgba(255,255,255,0.3)" />
            <circle cx="205" cy="92" r="4" fill="#34D399" />
            {[0,1,2,3,4,5,6].map(row => [0,1,2].map(col => (
                <rect
                    key={`b3-${row}-${col}`}
                    x={181 + col * 18}
                    y={126 + row * 20}
                    width={11}
                    height={13}
                    rx={2}
                    fill={
                        (row === 2 && col === 1) ? "#93C5FD" :
                        (row === 4 && col === 0) ? "#FCD34D" :
                        "rgba(255,255,255,0.18)"
                    }
                />
            )))}

            {/* ── Building 4 (mid-right) ── */}
            <rect x="250" y="168" width="46" height="100" rx="4" fill="rgba(255,255,255,0.10)" />
            <rect x="250" y="168" width="46" height="6" rx="2" fill="rgba(255,255,255,0.18)" />
            {[0,1,2,3].map(row => [0,1].map(col => (
                <rect
                    key={`b4-${row}-${col}`}
                    x={258 + col * 18}
                    y={182 + row * 20}
                    width={11}
                    height={12}
                    rx={2}
                    fill="rgba(255,255,255,0.2)"
                />
            )))}

            {/* ── Building 5 (right) ── */}
            <rect x="308" y="152" width="54" height="116" rx="4" fill="rgba(255,255,255,0.12)" />
            <rect x="308" y="152" width="54" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
            {[0,1,2,3,4].map(row => [0,1,2].map(col => (
                <rect
                    key={`b5-${row}-${col}`}
                    x={315 + col * 14}
                    y={166 + row * 20}
                    width={9}
                    height={12}
                    rx={2}
                    fill={row === 3 && col === 2 ? "#FCD34D" : "rgba(255,255,255,0.18)"}
                />
            )))}

            {/* ── Road ── */}
            <rect x="40" y="260" width="340" height="16" rx="0" fill="rgba(0,0,0,0.15)" />
            {/* Road dashes */}
            {[0,1,2,3,4,5,6].map(i => (
                <rect key={`rd-${i}`} x={70 + i * 48} y="266" width="24" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            ))}

            {/* ── Map pin (main, center-top) ── */}
            <g transform="translate(196, 56)">
                <circle cx="14" cy="14" r="22" fill="rgba(255,255,255,0.1)" />
                {/* Pin body */}
                <path
                    d="M14 2C8.477 2 4 6.477 4 12c0 7 10 18 10 18s10-11 10-18c0-5.523-4.477-10-10-10z"
                    fill="#3B82F6"
                    stroke="white"
                    strokeWidth="1.5"
                />
                <circle cx="14" cy="12" r="4" fill="white" />
            </g>

            {/* ── Floating report cards ── */}
            {/* Card 1 */}
            <g transform="translate(42, 90)">
                <rect width="96" height="44" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <circle cx="18" cy="22" r="10" fill="rgba(239,68,68,0.3)" />
                <text x="18" y="27" textAnchor="middle" fontSize="11" fill="#FCA5A5">⚠</text>
                <rect x="34" y="13" width="50" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
                <rect x="34" y="25" width="36" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
            </g>

            {/* Card 2 */}
            <g transform="translate(284, 76)">
                <rect width="96" height="44" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <circle cx="18" cy="22" r="10" fill="rgba(16,185,129,0.3)" />
                <text x="18" y="27" textAnchor="middle" fontSize="11" fill="#6EE7B7">✓</text>
                <rect x="34" y="13" width="50" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
                <rect x="34" y="25" width="40" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
            </g>

            {/* ── Small map pins scattered ── */}
            <circle cx="100" cy="240" r="5" fill="#F59E0B" opacity="0.8" />
            <path d="M100 228 C97 228 94 231 94 234.5 C94 238.5 100 244 100 244 S106 238.5 106 234.5 C106 231 103 228 100 228Z" fill="#F59E0B" opacity="0.7" />
            <circle cx="100" cy="234" r="2" fill="white" opacity="0.9" />

            <circle cx="320" cy="230" r="5" fill="#EF4444" opacity="0.8" />
            <path d="M320 218 C317 218 314 221 314 224.5 C314 228.5 320 234 320 234 S326 228.5 326 224.5 C326 221 323 218 320 218Z" fill="#EF4444" opacity="0.7" />
            <circle cx="320" cy="224" r="2" fill="white" opacity="0.9" />

            {/* ── Dotted connection lines ── */}
            <line x1="100" y1="228" x2="174" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="320" y1="218" x2="250" y2="190" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="205" y1="78" x2="205" y2="110" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* ── Stars / particles ── */}
            {[
                [80, 60], [340, 100], [60, 200], [360, 220], [150, 50], [290, 50],
            ].map(([cx, cy], i) => (
                <circle key={`star-${i}`} cx={cx} cy={cy} r="1.5" fill="rgba(255,255,255,0.4)" />
            ))}
        </svg>
    );
}