"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/common-ui/AuthInput";
import AuthSubmitButton from "@/components/common-ui/AuthSubmitButton";
import { AuthDivider, AuthFooterNote } from "@/components/common-ui/AuthMisc";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { registerUser, saveToken } from "@/lib/api-auth";

export default function RegisterForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const passwordMatch = form.confirm !== "" && form.password === form.confirm;
    const passwordMismatch = form.confirm !== "" && form.password !== form.confirm;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordMismatch) return;
        setLoading(true);
        setError("");

        try {
            const res = await registerUser({
                name: form.name,
                email: form.email,
                password: form.password,
            });
            saveToken(res.token);
            router.push("/user");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Terjadi kesalahan, coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
                label="Nama Lengkap"
                type="text"
                placeholder="Nama kamu"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                autoComplete="name"
            />

            <AuthInput
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
            />

            <div>
                <AuthInput
                    label="Password"
                    isPassword
                    placeholder="Min. 8 karakter"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={8}
                    autoComplete="new-password"
                />
                <PasswordStrength password={form.password} />
            </div>

            <AuthInput
                label="Konfirmasi Password"
                isPassword
                placeholder="Ulangi password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
                autoComplete="new-password"
                error={passwordMismatch ? "Password tidak cocok" : undefined}
                success={passwordMatch ? "Password cocok" : undefined}
            />

            {error && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-2.5">
                    <span className="text-base">⚠️</span>
                    <p className="text-[13px] text-red-300">{error}</p>
                </div>
            )}

            <div className="pt-1">
                <AuthSubmitButton
                    loading={loading}
                    label="Buat Akun"
                    loadingLabel="Mendaftar..."
                    disabled={passwordMismatch}
                />
            </div>

            <AuthFooterNote />

            <AuthDivider />

            <p className="text-center text-sm text-white/60">
                Sudah punya akun?{" "}
                <Link
                    href="/auth/login"
                    className="font-semibold text-white hover:text-blue-200 transition-colors"
                >
                    Masuk di sini
                </Link>
            </p>
        </form>
    );
}