"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import AuthInput from "@/components/auth/AuthInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";
import { AuthDivider } from "@/components/auth/AuthMisc";

export default function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
        });

        if (!result?.ok) {
            setError("Email atau password salah");
            setLoading(false);
            return;
        }

        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        const role = session?.user?.role;

        if (role === "admin" || role === "superadmin") {
            router.push("/admin");
        } else {
            router.push("/user");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
            />

            <AuthInput
                label="Password"
                isPassword
                placeholder="Masukkan password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
                hint={
                    <Link
                        href="/auth/forgot-password"
                        className="text-[12px] font-medium transition-colors"
                        style={{ color: "#0F766E" }}
                    >
                        Lupa password?
                    </Link>
                }
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
                    label="Masuk"
                    loadingLabel="Memproses..."
                />
            </div>

            <AuthDivider />

            <p className="text-center text-sm" style={{ color: "#6B7280" }}>
                Belum punya akun?{" "}
                <Link
                    href="/auth/register"
                    className="font-bold transition-colors"
                    style={{ color: "#0F766E" }}
                >
                    Daftar sekarang
                </Link>
            </p>
        </form>
    );
}