"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { RiMapPin2Fill, RiLogoutBoxRLine, RiStarFill } from "react-icons/ri"
import { userMenus } from "@/hooks/AdminMenus"

type Props = {
  name:    string
  points?: number
}

export default function UserSidebar({ name, points }: Props) {
  const pathname = usePathname()
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

  const isActive = (href: string) => {
    if (pathname === href) return true
    if (href === "/user")  return false
    // /user/laporan harus exact match supaya /user/laporan/buat tidak ikut active
    if (href === "/user/laporan") {
      return pathname === "/user/laporan" || (
        pathname.startsWith("/user/laporan/") &&
        !pathname.startsWith("/user/laporan/buat")
      )
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden lg:flex h-screen w-[220px] shrink-0 flex-col sticky top-0 bg-[#1A3DBF] border-r border-blue-700/40">

      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-blue-700/40 px-5 py-[18px]">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
          <RiMapPin2Fill size={15} className="text-white" />
        </div>
        <div>
          <p className="text-[14px] font-extrabold tracking-tight text-white leading-none">LaporAja</p>
          <p className="mt-0.5 text-[10px] leading-none text-blue-200/60">Panel Warga</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="mb-2.5 px-2.5 text-[10px] font-bold uppercase tracking-widest text-blue-300/50">
          Menu
        </p>
        {userMenus.map(({ href, label, Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[13px] font-medium transition-all ${
                active
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-blue-100/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
            </Link>
          )
        })}
      </nav>

      {/* Points + user + logout */}
      <div className="border-t border-blue-700/40 p-3">
        {/* Points chip — 10% accent green */}
        {points !== undefined && (
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/20 px-3 py-2">
            <RiStarFill size={13} className="text-emerald-400" />
            <span className="text-[12px] font-bold text-emerald-300">{points} poin</span>
          </div>
        )}

        {/* User row */}
        <div className="flex items-center gap-2.5 rounded-xl px-2.5 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold text-white">
            {initials}
          </div>
          <p className="min-w-0 flex-1 truncate text-[12px] font-semibold text-blue-100">{name}</p>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12px] font-medium text-blue-200/60 transition-all hover:bg-red-500/15 hover:text-red-300"
        >
          <RiLogoutBoxRLine size={14} />
          Keluar
        </button>
      </div>
    </aside>
  )
}