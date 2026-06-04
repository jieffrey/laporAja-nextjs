export default function AuthBackground({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className="relative flex min-h-screen overflow-hidden"
            style={{
                background:
                    "linear-gradient(160deg, #CCFBF1 0%, #F8F6F0 50%, #FEF3C7 100%)",
            }}
        >
            {/* Subtle dot grid */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage: `radial-gradient(circle, #0F766E22 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                    opacity: 0.55,
                }}
            />

            {/* Decorative orbs */}
            <div
                className="pointer-events-none absolute"
                style={{
                    top: "-120px",
                    left: "-120px",
                    width: "520px",
                    height: "520px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(20,184,166,0.30) 0%, rgba(15,118,110,0.08) 50%, transparent 70%)",
                }}
            />
            <div
                className="pointer-events-none absolute"
                style={{
                    bottom: "-100px",
                    right: "-100px",
                    width: "440px",
                    height: "440px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(234,88,12,0.08) 50%, transparent 70%)",
                }}
            />
            <div
                className="pointer-events-none absolute"
                style={{
                    top: "40%",
                    left: "45%",
                    width: "260px",
                    height: "260px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(94,234,212,0.15) 0%, transparent 70%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex w-full">{children}</div>
        </main>
    );
}