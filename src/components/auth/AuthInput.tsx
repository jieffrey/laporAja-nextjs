"use client";

import { ReactNode, useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

type AuthInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className"
> & {
    label: string;
    isPassword?: boolean;
    hint?: ReactNode;
    error?: string;
    success?: string;
};

export default function AuthInput({
    label,
    isPassword,
    hint,
    error,
    success,
    type,
    ...rest
}: AuthInputProps) {
    const [show, setShow] = useState(false);

    const inputType = isPassword ? (show ? "text" : "password") : type ?? "text";

    // border color priority: error > success > neutral
    const borderColor = error
        ? "#FECACA"
        : success
            ? "#A7F3D0"
            : "#E8E4D9";
    const focusColor = error
        ? "#EF4444"
        : success
            ? "#10B981"
            : "#14B8A6";

    return (
        <>
            <style jsx>{`
                .auth-input-wrap {
                    position: relative;
                }
                .auth-input {
                    width: 100%;
                    border-radius: 12px;
                    border: 1.5px solid ${borderColor};
                    background: #FCFBF8;
                    padding: 12px 14px;
                    padding-right: ${isPassword ? "44px" : "14px"};
                    font-size: 14px;
                    color: #111827;
                    transition: all 0.18s ease;
                    outline: none;
                }
                .auth-input::placeholder {
                    color: #9CA3AF;
                }
                .auth-input:focus {
                    border-color: ${focusColor};
                    background: #fff;
                    box-shadow: 0 0 0 3px ${focusColor}22;
                }
                .auth-input:disabled {
                    background: #F1EDE2;
                    cursor: not-allowed;
                }
                .toggle-btn {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #9CA3AF;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    transition: color 0.15s ease;
                }
                .toggle-btn:hover {
                    color: #0F766E;
                }
            `}</style>

            <div>
                {/* Label row */}
                <div className="mb-1.5 flex items-center justify-between">
                    <label
                        className="text-[13px] font-semibold"
                        style={{ color: "#374151" }}
                    >
                        {label}
                    </label>
                    {hint}
                </div>

                {/* Input */}
                <div className="auth-input-wrap">
                    <input
                        type={inputType}
                        className="auth-input"
                        {...rest}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="toggle-btn"
                            tabIndex={-1}
                            aria-label={show ? "Sembunyikan password" : "Lihat password"}
                        >
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    )}
                </div>

                {/* Helper text */}
                {error && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                        <AlertCircle size={12} style={{ color: "#991B1B" }} />
                        <p className="text-[12px] font-medium" style={{ color: "#991B1B" }}>
                            {error}
                        </p>
                    </div>
                )}
                {success && !error && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={12} style={{ color: "#065F46" }} />
                        <p className="text-[12px] font-medium" style={{ color: "#065F46" }}>
                            {success}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}