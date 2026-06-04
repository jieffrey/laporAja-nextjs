"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { USER_ROLE_LABELS } from "@/lib/constant"
import type { UserRole } from "@/lib/constant"

type SidebarProps = {
  role: UserRole
  name: string
  points?: number
}

const userMenu = [
  { href: "/user",              label: "Dashboard",    icon: "▦", desc: "Ringkasan aktivitas" },
  { href: "/user/laporan",      label: "Laporan Saya", icon: "◫", desc: "Semua laporan kamu"  },
  { href: "/user/laporan/buat", label: "Buat Laporan", icon: "⊕", desc: "Laporkan masalah"    },
  { href: "/user/profile",      label: "Profil",       icon: "◉", desc: "Akun & poin kamu"    },
]

const adminMenu = [
  { href: "/admin",         label: "Dashboard",      icon: "▦", desc: "Statistik laporan"  },
  { href: "/admin/laporan", label: "Kelola Laporan", icon: "◫", desc: "Review & update"    },
]

const superAdminExtra = [
  { href: "/admin/users", label: "Pengguna", icon: "◈", desc: "Manage user & role" },
]

const ROLE_GRADIENT: Record<string, string> = {
  user:       "from-blue-600 to-blue-700",
  admin:      "from-slate-700 to-slate-800",
  superadmin: "from-violet-600 to-violet-700",
}

export default function Sidebar({ role, name, points }: SidebarProps) {
  const pathname = usePathname()
  const isUser   = role === "user"
  const items    = isUser
    ? userMenu
    : [...adminMenu, ...(role === "superadmin" ? superAdminExtra : [])]

const isActive = (href: string) => {
  if (pathname === href) return true
  if (href === "/user" || href === "/admin") return false
  // parent route aktif hanya kalau child yang aktif bukan punya menu sendiri
  if (href === "/user/laporan") {
    return pathname.startsWith("/user/laporan/") &&
           !pathname.startsWith("/user/laporan/buat")
  }
  if (href === "/admin/laporan") {
    return pathname.startsWith("/admin/laporan/")
  }
  return false
}

  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <aside className="hidden lg:flex h-screen w-64 flex-shrink-0 flex-col sticky top-0 bg-white border-r border-slate-100 shadow-[1px_0_20px_rgba(0,0,0,0.04)]">

      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${ROLE_GRADIENT[role]} px-5 pt-5 pb-6`}>
        <Link href="/" className="flex items-center gap-2.5 mb-6 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 border border-white/25 text-white font-extrabold text-sm group-hover:bg-white/30 transition-all">
            L
          </div>
          <div>
            <p className="text-white font-extrabold text-[14px] tracking-tight leading-none">LaporAja</p>
            <p className="text-white/60 text-[10px] mt-0.5 font-medium">Smart Geo Complaint</p>
          </div>
        </Link>

        {/* User card */}
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-3.5 py-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 text-white font-bold text-[13px] border border-white/20">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-semibold text-[13px] truncate leading-tight">{name}</p>
            <p className="text-white/60 text-[11px] mt-0.5">{USER_ROLE_LABELS[role]}</p>
          </div>
          {isUser && points !== undefined && (
            <div className="flex-shrink-0 text-right">
              <p className="text-white font-bold text-[14px] leading-tight">{points}</p>
              <p className="text-white/50 text-[10px]">poin</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
          {isUser ? "Menu Utama" : "Manajemen"}
        </p>
        <div className="space-y-0.5">
          {items.map((item) => {
            const active = isActive(item.href)
            return (
              <Link key={item.href} href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                  active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[15px] transition-all ${
                  active
                    ? "bg-white/15 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13.5px] font-semibold leading-tight ${active ? "text-white" : "text-slate-700"}`}>
                    {item.label}
                  </p>
                  <p className={`text-[11px] mt-0.5 leading-none truncate ${active ? "text-white/50" : "text-slate-400"}`}>
                    {item.desc}
                  </p>
                </div>
                {active && <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/70" />}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="mx-4 h-px bg-slate-100" />

      {/* Logout */}
      <div className="px-3 py-4">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 group-hover:bg-red-100 group-hover:text-red-500 transition-all text-[15px]">
            ⏻
          </div>
          <div>
            <p className="text-[13.5px] font-semibold leading-tight">Keluar</p>
            <p className="text-[11px] text-slate-400 group-hover:text-red-400 transition-colors">Sign out akun</p>
          </div>
        </button>
      </div>

    </aside>
  )
}