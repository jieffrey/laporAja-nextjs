"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/user.api";
import { USER_ROLES, USER_ROLE_LABELS } from "@/lib/constant";
import { updateUserRole, deleteUser } from "@/lib/user.api";
import type { UserRole } from "@/lib/constant";
import EmptyState from "@/components/common-ui/Emptystate";

type Props = { users: User[]; currentUserId: string };

const ROLE_STYLES: Record<string, string> = {
  user:       "bg-slate-100 text-slate-600",
  admin:      "bg-blue-100 text-blue-700",
  superadmin: "bg-violet-100 text-violet-700",
};

export default function AdminUsersList({ users, currentUserId }: Props) {
  const router  = useRouter();
  const [search, setSearch]   = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = async (id: number, role: UserRole) => {
    setLoadingId(id);
    try {
      await updateUserRole(id, role);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setLoadingId(id);
    try {
      await deleteUser(id);
      setConfirmDelete(null);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="relative max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[14px]">🔍</span>
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
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
                  <th className="px-4 py-3">Bergabung</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(u => {
                  const isSelf    = String(u.id) === currentUserId;
                  const isLoading = loadingId === u.id;

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
                            value={u.role}
                            disabled={isLoading}
                            onChange={e => handleRoleChange(u.id, e.target.value as UserRole)}
                            className={`rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[12px] font-semibold outline-none focus:border-blue-300 cursor-pointer transition-all
                              ${ROLE_STYLES[u.role]} border-transparent`}
                          >
                            {USER_ROLES.map(r => (
                              <option key={r} value={r}>{USER_ROLE_LABELS[r]}</option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                        {new Date(u.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3.5">
                        {!isSelf && (
                          <>
                            {confirmDelete === u.id ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleDelete(u.id)}
                                  disabled={isLoading}
                                  className="rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-700 transition-colors"
                                >
                                  {isLoading ? "..." : "Ya, hapus"}
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(null)}
                                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                                >
                                  Batal
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(u.id)}
                                className="rounded-lg border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-500 hover:bg-red-100 transition-colors"
                              >
                                Hapus
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}