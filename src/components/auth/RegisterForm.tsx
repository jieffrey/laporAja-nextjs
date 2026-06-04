"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import AuthInput from "@/components/auth/AuthInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";
import { AuthDivider, AuthFooterNote } from "@/components/auth/AuthMisc";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { register } from "@/lib/api-auth";

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
    const passwordMismatch =
        form.confirm !== "" && form.password !== form.confirm;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordMismatch) return;
        setLoading(true);
        setError("");

        try {
            const res = await register({
                name: form.name,
                email: form.email,
                password: form.password,
            });
            if (typeof window !== "undefined" && res?.token != null) {
                localStorage.setItem("token", String(res.token));
            }
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
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
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
                <div
                    className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
                    style={{
                        background: "#FEE2E2",
                        border: "1px solid #FECACA",
                    }}
                >
                    <AlertCircle size={16} style={{ color: "#991B1B" }} />
                    <p className="text-[13px] font-medium" style={{ color: "#991B1B" }}>
                        {error}
                    </p>
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

            <p className="text-center text-sm" style={{ color: "#6B7280" }}>
                Sudah punya akun?{" "}
                <Link
                    href="/auth/login"
                    className="font-bold transition-colors"
                    style={{ color: "#0F766E" }}
                >
                    Masuk di sini
                </Link>
            </p>
        </form>
    );
}