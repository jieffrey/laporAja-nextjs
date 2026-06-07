"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertCircle, CheckCircle2, Mail } from "lucide-react"
import AuthInput from "@/components/auth/AuthInput"
import AuthSubmitButton from "@/components/auth/AuthSubmitButton"
import { forgotPassword } from "@/lib/user.api"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState<{ message: string; token?: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess(null)

        try {
            const res = await forgotPassword(email)
            setSuccess({ message: res.message ?? "Link reset password telah dikirim", token: res.token })
        } catch (err: any) {
            setError(err?.response?.data?.message ?? "Gagal mengirim email reset")
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
                                    Lupa Password
                                </h1>
                                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                                    Masukkan email terdaftar, kami akan kirim link reset password
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <AuthInput
                                    label="Email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />

                                {error && (
                                    <div className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
                                        style={{ background: "#FEE2E2", border: "1px solid #FECACA" }}
                                    >
                                        <AlertCircle size={16} style={{ color: "#991B1B" }} />
                                        <p className="text-[13px] font-medium" style={{ color: "#991B1B" }}>{error}</p>
                                    </div>
                                )}

                                <AuthSubmitButton loading={loading} label="Kirim Link Reset" loadingLabel="Mengirim..." />

                                <Link
                                    href="/auth/login"
                                    className="flex items-center justify-center gap-1.5 text-[13px] font-medium transition-colors"
                                    style={{ color: "#0F766E" }}
                                >
                                    <ArrowLeft size={14} />
                                    Kembali ke login
                                </Link>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4 space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                                style={{ background: "#D1FAE5" }}
                            >
                                <CheckCircle2 size={28} style={{ color: "#065F46" }} />
                            </div>
                            <h2 className="text-[18px] font-extrabold" style={{ color: "#111827" }}>Cek Email Kamu</h2>
                            <p className="text-[13px]" style={{ color: "#6B7280" }}>
                                {success.message}
                            </p>
                            {success.token && (
                                <div className="rounded-xl p-4 text-left text-[12px] break-all"
                                    style={{ background: "#F8F6F0", border: "1px solid #E8E4D9" }}
                                >
                                    <p className="font-semibold mb-1" style={{ color: "#374151" }}>Token reset:</p>
                                    <p style={{ color: "#0F766E", fontFamily: "monospace" }}>{success.token}</p>
                                    <Link
                                        href={`/auth/reset-password/${success.token}`}
                                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold text-white"
                                        style={{
                                            background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                                            boxShadow: "0 4px 14px rgba(15,118,110,0.25)",
                                        }}
                                    >
                                        <Mail size={14} /> Reset Password Sekarang
                                    </Link>
                                </div>
                            )}
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                                style={{ color: "#0F766E" }}
                            >
                                <ArrowLeft size={14} />
                                Kembali ke login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
