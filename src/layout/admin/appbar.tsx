"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  RiMenuLine, RiCloseLine, RiNotification3Line,
  RiMapPin2Fill, RiLogoutBoxRLine, RiShieldFill,
} from "react-icons/ri"
import { USER_ROLE_LABELS } from "@/lib/constant"
import { adminMenus, getPageTitle } from "@/hooks/AdminMenus"
import type { UserRole } from "@/lib/constant"

const ACCENT: Record<string, { active: string; avatar: string }> = {
  user:       { active: "bg-teal-50 text-teal-700",    avatar: "bg-teal-500"   },
  admin:      { active: "bg-blue-50 text-blue-700",    avatar: "bg-blue-600"   },
  superadmin: { active: "bg-violet-50 text-violet-700", avatar: "bg-violet-600" },
}

export default function AdminAppbar() {
  const { data: session }    = useSession()
  const pathname             = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const name     = session?.user?.name  ?? "Admin"
  const role     = (session?.user?.role ?? "admin") as UserRole
  const title    = getPageTitle(pathname)
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
  const ac       = ACCENT[role] ?? ACCENT.admin

  const isActive = (href: string) => {
    if (pathname === href) return true
    if (href === "/admin")  return false
    return pathname.startsWith(href)
  }

  const visibleMenus = adminMenus.filter(m =>
    !m.roles || m.roles.includes(role)
  )

  return (
    <>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] lg:px-6">

        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 lg:hidden"
          >
            {drawerOpen ? <RiCloseLine size={17} /> : <RiMenuLine size={17} />}
          </button>

          {/* Breadcrumb */}
          <div>
            <p className="text-[14px] font-bold leading-tight text-slate-900">{title}</p>
            <p className="hidden text-[10px] leading-none text-slate-400 sm:block">
              {USER_ROLE_LABELS[role]} Panel
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600">
            <RiNotification3Line size={17} />
          </button>
          <span className="hidden text-[13px] text-slate-400 sm:block">
            Hai, <span className="font-semibold text-slate-700">{name.split(" ")[0]}</span>
          </span>
          <Link
            href="/admin/profile"
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white ${ac.avatar}`}
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
            className="absolute left-0 top-0 flex h-full w-[240px] flex-col bg-[#0F172A]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
                  <RiMapPin2Fill size={13} className="text-white" />
                </div>
                <p className="text-[14px] font-extrabold text-white">LaporAja</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="text-slate-500 hover:text-slate-300">
                <RiCloseLine size={18} />
              </button>
            </div>

            {/* User */}
            <div className="border-b border-slate-800 px-4 py-3">
              <div className="flex items-center gap-2.5 rounded-xl bg-slate-800/60 px-3 py-2.5">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${ac.avatar} text-[11px] font-bold text-white`}>
                  {initials}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-200">{name}</p>
                  <p className="text-[10px] text-slate-500">{USER_ROLE_LABELS[role]}</p>
                </div>
                <RiShieldFill size={12} className="ml-auto text-slate-600" />
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
              {visibleMenus.map(({ href, label, Icon }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                      active
                        ? `${ac.active}`
                        : "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <Icon size={15} className="shrink-0" />
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-800 p-3">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 transition-all hover:bg-red-500/10 hover:text-red-400"
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