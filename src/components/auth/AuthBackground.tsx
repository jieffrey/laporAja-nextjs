export default function AuthBackground({ children }: { children: React.ReactNode }) {
    return (
        <main
            className="relative flex min-h-screen overflow-hidden"
            style={{
                backgroundColor: "#1D4ED8",
                backgroundImage: `
                    radial-gradient(circle at 25% 25%, #1E40AF 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, #1E3A8A 0%, transparent 50%),
                    radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 100% 100%, 28px 28px",
            }}
        >
            {/* PatternCraft grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(147,197,253,0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(147,197,253,0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: "56px 56px",
                }}
            />

            {/* Glow blobs */}
            <div className="pointer-events-none absolute top-[10%] left-[20%] h-96 w-96 rounded-full bg-blue-400/20 blur-[80px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[5%] h-64 w-64 rounded-full bg-emerald-300/10 blur-[60px]" />
            <div className="pointer-events-none absolute top-[50%] left-[40%] h-48 w-48 rounded-full bg-indigo-400/15 blur-[50px]" />

            {/* Content */}
            <div className="relative z-10 flex w-full">
                {children}
            </div>
        </main>
    );
}