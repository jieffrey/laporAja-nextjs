"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getUsers, updateUserRole, deleteUser } from "@/lib/user.api"
import type { User, UserRole } from "@/lib/user.api"
import { USER_ROLES, USER_ROLE_LABELS } from "@/lib/constant"
import EmptyState from "@/components/common-ui/Emptystate"

const ROLE_STYLES: Record<string, string> = {
  user:       "bg-slate-100 text-slate-600",
  admin:      "bg-blue-100 text-blue-700",
  superadmin: "bg-violet-100 text-violet-700",
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [users,      setUsers]      = useState<User[]>([])
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState("")
  const [loadingId,  setLoadingId]  = useState<number | null>(null)
  const [confirmDel, setConfirmDel] = useState<number | null>(null)

useEffect(() => {
    if (status === "loading") return
    if (status === "unauthenticated") { router.push("/auth/login"); return }
    if (session?.user?.role !== "superadmin") { router.push("/admin"); return }

    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (e) {
        console.warn(e)
      }

      setLoading(false)
    }

    void fetchUsers()
  }, [status, session, router])

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleRoleChange = async (id: number, role: UserRole) => {
    setLoadingId(id)
    try {
      await updateUserRole(id, role)
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
    } catch (e) {
      console.warn(e)
    }

    setLoadingId(null)
  }

  const handleDelete = async (id: number) => {
    setLoadingId(id)
    try {
      await deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
      setConfirmDel(null)
    } catch (e) {
      console.warn(e)
    }

    setLoadingId(null)
  }

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
    </div>
  )

  return (
    <div className="space-y-5 w-full">
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">Kelola Pengguna</h1>
        <p className="mt-0.5 text-[13px] text-slate-500">{users.length} pengguna terdaftar</p>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="relative max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[14px]">🔍</span>
          <input
            type="text" placeholder="Cari nama atau email..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-[13px] text-slate-700 outline-none focus:border-blue-300 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon="👤" title="Tidak ada pengguna" description="Coba ubah kata kunci pencarian" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  <th className="px-5 py-3">Pengguna</th>
                  <th className="px-4 py-3">Poin</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 hidden md:table-cell">Bergabung</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(u => {
                  const isSelf    = String(u.id) === session?.user?.id
                  const isLoading = loadingId === u.id
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-[12px] font-bold text-white">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {u.name}
                              {isSelf && <span className="ml-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">Kamu</span>}
                            </p>
                            <p className="text-[11px] text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-amber-600">{u.points}</span>
                        <span className="text-slate-400 text-[11px] ml-1">pts</span>
                      </td>
                      <td className="px-4 py-3.5">
                        {isSelf ? (
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${ROLE_STYLES[u.role]}`}>
                            {USER_ROLE_LABELS[u.role]}
                          </span>
                        ) : (
                          <select
                            value={u.role} disabled={isLoading}
                            onChange={e => handleRoleChange(u.id, e.target.value as UserRole)}
                            className={`rounded-xl border-transparent px-2.5 py-1 text-[12px] font-semibold outline-none cursor-pointer ${ROLE_STYLES[u.role]}`}
                          >
                            {USER_ROLES.map(r => <option key={r} value={r}>{USER_ROLE_LABELS[r]}</option>)}
                          </select>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap hidden md:table-cell">
                        {new Date(u.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3.5">
                        {!isSelf && (
                          confirmDel === u.id ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleDelete(u.id)} disabled={isLoading}
                                className="rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-700 transition-colors">
                                {isLoading ? "..." : "Hapus"}
                              </button>
                              <button onClick={() => setConfirmDel(null)}
                                className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-200 transition-colors">
                                Batal
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmDel(u.id)}
                              className="rounded-lg border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-500 hover:bg-red-100 transition-colors">
                              Hapus
                            </button>
                          )
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}