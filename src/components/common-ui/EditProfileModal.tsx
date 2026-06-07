"use client"

import { useState, useEffect, useRef } from "react"
import { X, Save, User, Camera } from "lucide-react"
import { useSession } from "next-auth/react"
import { updateUserProfile } from "@/lib/user.api"

type Props = {
    open: boolean
    onClose: () => void
}

export default function EditProfileModal({ open, onClose }: Props) {
    const { data: session, update } = useSession()
    const fileRef = useRef<HTMLInputElement>(null)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (open) {
            setName(session?.user?.name ?? "")
            setEmail(session?.user?.email ?? "")
            setPassword("")
            setConfirmPassword("")
            setAvatarFile(null)
            setAvatarPreview(null)
            setError(null)
            setSuccess(false)
            setFieldErrors({})
        }
    }, [open, session?.user?.name, session?.user?.email])

    if (!open) return null

    const validate = (): boolean => {
        const errors: Record<string, string> = {}

        if (password && password.length < 6) {
            errors.password = "Minimal 6 karakter"
        }
        if (password && password !== confirmPassword) {
            errors.confirmPassword = "Password tidak cocok"
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Format email tidak valid"
        }

        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSave = async () => {
        if (!validate()) return
        if (!session?.user?.id) return

        setLoading(true)
        setError(null)
        try {
            await updateUserProfile(Number(session.user.id), {
                name: name.trim() || undefined,
                email: email.trim() || undefined,
                password: password || undefined,
                avatar: avatarFile || undefined,
            })
            setSuccess(true)
            await update()
            setTimeout(() => onClose(), 1200)
        } catch (e: any) {
            setError(e?.response?.data?.message ?? "Gagal update profil")
        }
        setLoading(false)
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            const reader = new FileReader()
            reader.onloadend = () => setAvatarPreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="absolute inset-0"
                style={{ background: "rgba(15,118,110,0.25)", backdropFilter: "blur(2px)" }}
            />
            <div
                className="relative w-full max-w-sm rounded-2xl p-6"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 16px 48px rgba(15,118,110,0.20)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                    style={{ color: "#9CA3AF" }}
                >
                    <X size={14} />
                </button>

                <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: "#CCFBF1", color: "#0F766E" }}
                >
                    <User size={22} />
                </div>

                <h3
                    className="mb-1 text-center text-[16px] font-extrabold"
                    style={{ color: "#111827" }}
                >
                    Edit Profil
                </h3>
                <p
                    className="mb-6 text-center text-[13px]"
                    style={{ color: "#6B7280" }}
                >
                    Perbarui data diri kamu
                </p>

                {error && (
                    <div
                        className="mb-4 rounded-lg px-4 py-2 text-[12px] font-semibold"
                        style={{ background: "#FEE2E2", color: "#991B1B" }}
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        className="mb-4 rounded-lg px-4 py-2 text-[12px] font-semibold"
                        style={{ background: "#D1FAE5", color: "#065F46" }}
                    >
                        Profil berhasil diperbarui!
                    </div>
                )}

                {/* Avatar */}
                <div className="mb-5 flex flex-col items-center">
                    <div className="relative mb-2">
                        <div
                            className="flex h-20 w-20 items-center justify-center rounded-2xl text-[28px] font-black text-white overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, #115E59, #0F766E)",
                            }}
                        >
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="preview" className="h-full w-full object-cover" />
                            ) : (
                                (session?.user?.name ?? "U").charAt(0).toUpperCase()
                            )}
                        </div>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full transition-all hover:scale-110"
                            style={{ background: "#0F766E", color: "#fff" }}
                        >
                            <Camera size={12} />
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </div>
                    <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
                        Klik ikon kamera untuk ganti foto
                    </span>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label
                        className="mb-1.5 block text-[12px] font-semibold"
                        style={{ color: "#374151" }}
                    >
                        Nama
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl px-4 py-2.5 text-[13px] outline-none transition-all focus:bg-white"
                        style={{
                            background: "#F8F6F0",
                            border: "1px solid #E8E4D9",
                            color: "#374151",
                        }}
                        placeholder="Masukkan nama"
                        disabled={loading || success}
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label
                        className="mb-1.5 block text-[12px] font-semibold"
                        style={{ color: "#374151" }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl px-4 py-2.5 text-[13px] outline-none transition-all focus:bg-white"
                        style={{
                            background: "#F8F6F0",
                            border: fieldErrors.email ? "1px solid #EF4444" : "1px solid #E8E4D9",
                            color: "#374151",
                        }}
                        placeholder="Masukkan email"
                        disabled={loading || success}
                    />
                    {fieldErrors.email && (
                        <p className="mt-1 text-[11px] font-semibold" style={{ color: "#EF4444" }}>{fieldErrors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label
                        className="mb-1.5 block text-[12px] font-semibold"
                        style={{ color: "#374151" }}
                    >
                        Password Baru <span className="font-normal" style={{ color: "#9CA3AF" }}>(opsional)</span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl px-4 py-2.5 text-[13px] outline-none transition-all focus:bg-white"
                        style={{
                            background: "#F8F6F0",
                            border: fieldErrors.password ? "1px solid #EF4444" : "1px solid #E8E4D9",
                            color: "#374151",
                        }}
                        placeholder="Biarkan kosong jika tidak ingin ganti"
                        disabled={loading || success}
                    />
                    {fieldErrors.password && (
                        <p className="mt-1 text-[11px] font-semibold" style={{ color: "#EF4444" }}>{fieldErrors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="mb-5">
                    <label
                        className="mb-1.5 block text-[12px] font-semibold"
                        style={{ color: "#374151" }}
                    >
                        Konfirmasi Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl px-4 py-2.5 text-[13px] outline-none transition-all focus:bg-white"
                        style={{
                            background: "#F8F6F0",
                            border: fieldErrors.confirmPassword ? "1px solid #EF4444" : "1px solid #E8E4D9",
                            color: "#374151",
                        }}
                        placeholder="Ulangi password baru"
                        disabled={loading || success}
                    />
                    {fieldErrors.confirmPassword && (
                        <p className="mt-1 text-[11px] font-semibold" style={{ color: "#EF4444" }}>{fieldErrors.confirmPassword}</p>
                    )}
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading || success}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold transition-all active:scale-[0.98] disabled:active:scale-100"
                    style={{
                        background: success
                            ? "linear-gradient(135deg, #065F46, #10B981)"
                            : "linear-gradient(135deg, #0F766E, #14B8A6)",
                        color: "#fff",
                        boxShadow: "0 4px 14px rgba(15,118,110,0.25)",
                        opacity: loading || success ? 0.7 : 1,
                        cursor: loading || success ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? (
                        "Menyimpan..."
                    ) : success ? (
                        "Tersimpan!"
                    ) : (
                        <>
                            <Save size={14} /> Simpan
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
