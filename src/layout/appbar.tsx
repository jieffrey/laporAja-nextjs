"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { USER_ROLE_LABELS } from "@/lib/constant"

const userMenu = [
  { href: "/user",              label: "Dashboard",    icon: "▦" },
  { href: "/user/laporan",      label: "Laporan Saya", icon: "◫" },
  { href: "/user/laporan/buat", label: "Buat Laporan", icon: "⊕" },
  { href: "/user/profile",      label: "Profil",       icon: "◉" },
]

const adminMenu = [
  { href: "/admin",             label: "Dashboard",      icon: "▦" },
  { href: "/admin/laporan",     label: "Kelola Laporan", icon: "◫" },
  { href: "/admin/users",       label: "Pengguna",       icon: "◈" },
]

function pageTitle(pathname: string): string {
  if (pathname === "/user")                      return "Dashboard"
  if (pathname.startsWith("/user/laporan/buat")) return "Buat Laporan"
  if (pathname.startsWith("/user/laporan"))      return "Laporan Saya"
  if (pathname.startsWith("/user/profile"))      return "Profil"
  if (pathname === "/admin")                     return "Dashboard"
  if (pathname.startsWith("/admin/users"))       return "Kelola Pengguna"
  if (pathname.startsWith("/admin/laporan"))     return "Kelola Laporan"
  return "Dashboard"
}

export default function Appbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const name   = session?.user?.name ?? "Pengguna"
  const role   = session?.user?.role ?? "user"
  const isUser = role === "user"
  const title  = pageTitle(pathname)
  const menu   = isUser ? userMenu : adminMenu
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()

  const isActive = (href: string) =>
    href === "/user" || href === "/admin" ? pathname === href : pathname.startsWith(href)

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">

          {/* Left — hamburger + breadcrumb */}
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setOpen(v => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors lg:hidden"
            >
              <span className={`h-0.5 w-4 rounded-full bg-slate-600 transition-all duration-200 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-0.5 w-4 rounded-full bg-slate-600 transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`h-0.5 w-4 rounded-full bg-slate-600 transition-all duration-200 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[13px]">
                {menu.find(m => isActive(m.href))?.icon ?? "▦"}
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 leading-tight">{title}</p>
                <p className="text-[10px] text-slate-400 leading-none hidden sm:block">
                  {isUser ? "Panel Warga" : USER_ROLE_LABELS[role]}
                </p>
              </div>
            </div>
          </div>

          {/* Right — greeting + avatar */}
          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-slate-400 sm:block">
              Hai, <span className="font-semibold text-slate-700">{name.split(" ")[0]}</span>
            </span>
            <button
              onClick={() => setOpen(v => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[12px] font-bold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition-colors lg:hidden"
            >
              {initials}
            </button>
            <Link href={isUser ? "/user/profile" : "/admin"}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[12px] font-bold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition-colors">
              {initials}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white font-extrabold text-sm">L</div>
                <p className="text-[14px] font-extrabold text-white">LaporAja</p>
              </div>
              <button onClick={() => setOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white text-sm hover:bg-white/25 transition-colors">
                ✕
              </button>
            </div>

            {/* User card */}
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">{initials}</div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">{name}</p>
                  <p className="text-[11px] text-slate-400">{USER_ROLE_LABELS[role]}</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-3 space-y-0.5">
              {menu.map(item => {
                const active = isActive(item.href)
                return (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all ${
                      active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-[14px] transition-all ${
                      active ? "bg-white/15" : "bg-slate-100"
                    }`}>{item.icon}</span>
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-slate-100">
              <button onClick={() => signOut({ callbackUrl: "/" })}
                className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[14px] group-hover:bg-red-100 group-hover:text-red-500 transition-all">⏻</span>
                <p className="text-[13.5px] font-semibold">Keluar</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}