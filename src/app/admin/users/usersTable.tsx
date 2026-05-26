"use client";

import { useState, useTransition } from "react";
import { USER_ROLE_LABELS, USER_ROLES } from "@/lib/constant";
import type { User, UserRole } from "@/lib/user.api";
import { deleteUser, updateUserRole } from "@/lib/user.api";
import EmptyState from "@/components/common-ui/Emptystate";

type AdminUsersTableProps = {
  users: User[];
};

export default function AdminUsersTable({ users }: AdminUsersTableProps) {
  const [rows, setRows] = useState<User[]>(users);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  if (rows.length === 0) {
    return (
      <EmptyState
        title="Tidak ada pengguna"
        description="Tidak ada data pengguna yang bisa ditampilkan."
      />
    );
  }

  const handleRoleChange = (id: number, role: UserRole) => {
    setError("");
    startTransition(async () => {
      try {
        const updated = await updateUserRole(id, role);
        setRows((prev) => prev.map((u) => (u.id === id ? updated : u)));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Gagal update role");
      }
    });
  };

  const handleDelete = (id: number) => {
    const ok = confirm("Yakin hapus user ini?");
    if (!ok) return;

    setError("");
    startTransition(async () => {
      try {
        await deleteUser(id);
        setRows((prev) => prev.filter((u) => u.id !== id));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Gagal hapus user");
      }
    });
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[1fr_1fr_160px_120px] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-[12px] font-semibold text-slate-600 md:grid">
          <span>Nama</span>
          <span>Email</span>
          <span>Role</span>
          <span className="text-right">Aksi</span>
        </div>

        <div className="divide-y divide-slate-100">
          {rows.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-1 gap-2 px-6 py-4 md:grid-cols-[1fr_1fr_160px_120px] md:items-center md:gap-4"
            >
              <div className="text-[14px] font-semibold text-slate-900">
                {u.name}
              </div>
              <div className="text-[13px] text-slate-500">{u.email}</div>

              <div>
                <select
                  className="h-9 w-full rounded-full border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none disabled:opacity-60"
                  value={u.role}
                  disabled={pending}
                  onChange={(e) =>
                    handleRoleChange(u.id, e.target.value as UserRole)
                  }
                >
                  {USER_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {USER_ROLE_LABELS[r]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-start md:justify-end">
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => handleDelete(u.id)}
                  className="rounded-full border border-red-200 bg-white px-4 py-2 text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[12px] text-slate-400">
        Catatan: perubahan role butuh token superadmin (diambil dari session).
      </p>
    </div>
  );
}

