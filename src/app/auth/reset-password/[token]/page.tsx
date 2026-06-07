"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, AlertCircle, CheckCircle2, Lock } from "lucide-react"
import AuthInput from "@/components/auth/AuthInput"
import AuthSubmitButton from "@/components/auth/AuthSubmitButton"
import { resetPassword } from "@/lib/user.api"

export default function ResetPasswordPage() {
    const params = useParams()
    const router = useRouter()
    const token = params.token as string

    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const validate = () => {
        const errors: Record<string, string> = {}
        if (password.length < 6) errors.password = "Minimal 6 karakter"
        if (password !== confirm) errors.confirm = "Password tidak cocok"
        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        setError("")

        try {
            await resetPassword(token, password)
            setSuccess(true)
        } catch (err: any) {
            setError(err?.response?.data?.message ?? "Gagal mereset password")
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12"
            style={{
                background: "linear-gradient(160deg, #CCFBF1 0%, #F8F6F0 50%, #FEF3C7 100%)",
            }}
        >
            <div className="w-full max-w-md"
                style={{
                    background: "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #F59E0B 100%)",
                    borderRadius: "26px",
                    padding: "2px",
                    boxShadow: "0 24px 64px rgba(15,118,110,0.20)",
                }}
            >
                <div className="rounded-3xl p-8" style={{ background: "#FCFBF8" }}>
                    <div className="mb-6 flex items-center gap-2.5">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-extrabold text-white"
                            style={{
                                background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                                boxShadow: "0 4px 14px rgba(15,118,110,0.30)",
                            }}
                        >
                            L
                        </div>
                        <span className="text-base font-extrabold tracking-tight" style={{ color: "#111827" }}>
                            LaporAja
                        </span>
                    </div>

                    {!success ? (
                        <>
                            <div className="mb-7">
                                <h1 className="text-[22px] font-extrabold leading-tight tracking-tight" style={{ color: "#111827" }}>
                                    Reset Password
                                </h1>
                                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                                    Buat password baru untuk akun kamu
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <AuthInput
                                    label="Password Baru"
                                    isPassword
                                    placeholder="Minimal 6 karakter"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    error={fieldErrors.password}
                                />

                                <AuthInput
                                    label="Konfirmasi Password"
                                    isPassword
                                    placeholder="Ulangi password baru"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    error={fieldErrors.confirm}
                                />

                                {error && (
                                    <div className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
                                        style={{ background: "#FEE2E2", border: "1px solid #FECACA" }}
                                    >
                                        <AlertCircle size={16} style={{ color: "#991B1B" }} />
                                        <p className="text-[13px] font-medium" style={{ color: "#991B1B" }}>{error}</p>
                                    </div>
                                )}

                                <AuthSubmitButton loading={loading} label="Reset Password" loadingLabel="Mereset..." />
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4 space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                                style={{ background: "#D1FAE5" }}
                            >
                                <CheckCircle2 size={28} style={{ color: "#065F46" }} />
                            </div>
                            <h2 className="text-[18px] font-extrabold" style={{ color: "#111827" }}>Password Berhasil Diubah</h2>
                            <p className="text-[13px]" style={{ color: "#6B7280" }}>
                                Kamu bisa login dengan password baru sekarang
                            </p>
                            <Link
                                href="/auth/login"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
                                style={{
                                    background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                                    boxShadow: "0 4px 14px rgba(15,118,110,0.25)",
                                }}
                            >
                                <Lock size={14} /> Login Sekarang
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
