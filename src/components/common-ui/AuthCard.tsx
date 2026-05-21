type AuthCardProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
            {/* Glass card */}
            <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_24px_64px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                {/* Logo mark */}
                <div className="mb-6 flex items-center gap-3">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl font-extrabold text-blue-700"
                        style={{ background: "white", fontSize: 16 }}
                    >
                        L
                    </div>
                    <span className="text-base font-extrabold tracking-tight text-white">
                        LaporAja
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-7">
                    <h1 className="text-2xl font-extrabold tracking-tight text-white">
                        {title}
                    </h1>
                    <p className="mt-1.5 text-sm text-white/60">{subtitle}</p>
                </div>

                {children}
            </div>
        </div>
    );
}