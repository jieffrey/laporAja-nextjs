type AuthCardProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
            {/* Gradient border wrapper */}
            <div
                className="w-full max-w-md"
                style={{
                    background:
                        "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #F59E0B 100%)",
                    borderRadius: "26px",
                    padding: "2px",
                    boxShadow: "0 24px 64px rgba(15,118,110,0.20)",
                }}
            >
                <div
                    className="rounded-3xl p-8"
                    style={{ background: "#FCFBF8" }}
                >
                    {/* Logo mark */}
                    <div className="mb-6 flex items-center gap-2.5">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-extrabold text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0F766E, #14B8A6)",
                                boxShadow: "0 4px 14px rgba(15,118,110,0.30)",
                            }}
                        >
                            L
                        </div>
                        <span
                            className="text-base font-extrabold tracking-tight"
                            style={{ color: "#111827" }}
                        >
                            LaporAja
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mb-7">
                        <h1
                            className="text-[26px] font-extrabold leading-tight tracking-tight"
                            style={{ color: "#111827" }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-2 text-sm leading-relaxed"
                            style={{ color: "#6B7280" }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}