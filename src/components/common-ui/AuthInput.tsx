"use client";

import { InputHTMLAttributes, useState } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
    error?: string
    success?: string
    hint?: React.ReactNode
    isPassword?: boolean
}

export default function AuthInput({
    label,
    error,
    success,
    hint,
    isPassword = false,
    className,
    ...props
}: AuthInputProps) {
    const [show, setShow] = useState(false);

    const borderColor = error
        ? "border-red-400/60 bg-red-400/10"
        : success
            ? "border-emerald-400/60 bg-emerald-400/5"
            : "border-white/20 bg-white/10 focus:border-white/50 focus:bg-white/15";

    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[13px] font-semibold text-white/80">{label}</label>
                {hint}
            </div>

            <div className="relative">
                <input
                    type={isPassword ? (show ? "text" : "password") : props.type}
                    {...props}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-white placeholder-white/35 backdrop-blur-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-white/20 ${borderColor} ${isPassword ? "pr-11" : ""} ${className ?? ""}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/70"
                    >
                        {show ? "🙈" : "👁️"}
                    </button>
                )}
            </div>

            {error && <p className="mt-1.5 text-[12px] text-red-300">{error}</p>}
            {success && <p className="mt-1.5 text-[12px] text-emerald-300">✓ {success}</p>}
        </div>
    );
}