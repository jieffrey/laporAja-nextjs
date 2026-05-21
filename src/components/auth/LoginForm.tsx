"use client";

import { useState } from "react";
import Link from "next/link";
import AuthInput from "@/components/common-ui/AuthInput";
import AuthSubmitButton from "@/components/common-ui/AuthSubmitButton";
import { AuthDivider } from "@/components/common-ui/AuthMisc";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // TODO: signIn("credentials", { ...form, redirect: false })
      // if (!result?.ok) setError("Email atau password salah")
      // else router.push("/user")
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthInput
        label="Email"
        type="email"
        placeholder="nama@email.com"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />

      <AuthInput
        label="Password"
        isPassword
        placeholder="Masukkan password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
        hint={
          <Link href="/auth/forgot-password" className="text-[12px] text-blue-200 hover:text-white transition-colors">
            Lupa password?
          </Link>
        }
      />

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-[13px] text-red-300">
          {error}
        </div>
      )}

      <div className="pt-1">
        <AuthSubmitButton loading={loading} label="Masuk" loadingLabel="Masuk..." />
      </div>

      <AuthDivider />

      <p className="text-center text-sm text-white/60">
        Belum punya akun?{" "}
        <Link href="/auth/register" className="font-semibold text-white hover:text-blue-200 transition-colors">
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}