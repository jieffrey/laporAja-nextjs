"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  RiMenuLine, RiCloseLine, RiNotification3Line,
  RiMapPin2Fill, RiLogoutBoxRLine, RiStarFill,
} from "react-icons/ri"
import { userMenus, getPageTitle } from "@/hooks/AdminMenus"

export default function UserAppbar() {
  const { data: session }           = useSession()
  const pathname                    = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const name     = session?.user?.name   ?? "Pengguna"
  const points   = session?.user?.points ?? 0
  const title    = getPageTitle(pathname)
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()

  const isActive = (href: string) => {
    if (pathname === href) return true
    if (href === "/user")  return false
    if (href === "/user/laporan") {
      return pathname === "/user/laporan" || (
        pathname.startsWith("/user/laporan/") &&
        !pathname.startsWith("/user/laporan/buat")
      )
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] lg:px-6">

        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 lg:hidden"
          >
            {drawerOpen ? <RiCloseLine size={17} /> : <RiMenuLine size={17} />}
          </button>
          <div>
            <p className="text-[14px] font-bold leading-tight text-slate-900">{title}</p>
            <p className="hidden text-[10px] leading-none text-slate-400 sm:block">Panel Warga</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Points badge — desktop */}
          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 sm:flex">
            <RiStarFill size={12} className="text-emerald-500" />
            <span className="text-[12px] font-bold text-emerald-700">{points} poin</span>
          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600">
            <RiNotification3Line size={17} />
          </button>

          <Link
            href="/user/profile"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white transition-colors hover:bg-blue-700"
          >
            {initials}
          </Link>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setDrawerOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

          <div
            className="absolute left-0 top-0 flex h-full w-[240px] flex-col bg-[#1A3DBF]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-blue-700/40 px-4 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
                  <RiMapPin2Fill size={13} className="text-white" />
                </div>
                <p className="text-[14px] font-extrabold text-white">LaporAja</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="text-blue-200 hover:text-white">
                <RiCloseLine size={18} />
              </button>
            </div>

            {/* User */}
            <div className="border-b border-blue-700/40 px-4 py-3">
              <div className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/25 text-[11px] font-bold text-white">
                  {initials}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white">{name}</p>
                  <p className="text-[10px] text-blue-200/60">Panel Warga</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <RiStarFill size={11} className="text-emerald-400" />
                  <span className="text-[11px] font-bold text-emerald-300">{points}</span>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
              {userMenus.map(({ href, label, Icon }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                      active
                        ? "bg-white/15 text-white"
                        : "text-blue-100/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={15} className="shrink-0" />
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="border-t border-blue-700/40 p-3">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] font-medium text-blue-200/60 transition-all hover:bg-red-500/15 hover:text-red-300"
              >
                <RiLogoutBoxRLine size={14} />
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}