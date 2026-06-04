import Link from "next/link";

export default function AuthLogo() {
    return (
        <Link
            href="/"
            className="group mb-8 flex items-center justify-center gap-2.5"
        >
            <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-extrabold text-white transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3"
                style={{
                    background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                    boxShadow: "0 6px 16px rgba(15,118,110,0.30)",
                }}
            >
                L
            </div>
            <span
                className="text-xl font-extrabold tracking-tight"
                style={{ color: "#111827" }}
            >
                LaporAja
            </span>
        </Link>
    );
}