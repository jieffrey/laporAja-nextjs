import Link from "next/link";

export default function AuthLogo() {
    return (
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white font-extrabold text-lg text-blue-700 shadow-lg transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3">
                L
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">LaporAja</span>
        </Link>
    );
}