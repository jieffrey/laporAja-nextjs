"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { UserX } from "lucide-react"
import type { User, UserRole } from "@/lib/user.api"
import { updateUserRole, deleteUser } from "@/lib/user.api"
import EmptyState from "@/components/common-ui/Emptystate"
import UsersSearch from "./users-sections/UserSearch"
import UsersTable from "./users-sections/UsersTable"

type Props = {
    users: User[]
    currentUserId: string
}

const filterUsers = (users: User[], search: string) => {
    const q = search.toLowerCase()
    return users.filter(
        (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
    )
}

export default function AdminUsersList({ users, currentUserId }: Props) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [loadingId, setLoadingId] = useState<number | null>(null)
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)

    const filtered = useMemo(() => filterUsers(users, search), [users, search])

    const handleRoleChange = async (id: number, role: UserRole) => {
        setLoadingId(id)
        try {
            await updateUserRole(id, role)
            router.refresh()
        } catch (e) {
            console.error(e)
        } finally {
            setLoadingId(null)
        }
    }

    const handleDelete = async (id: number) => {
        setLoadingId(id)
        try {
            await deleteUser(id)
            setConfirmDeleteId(null)
            router.refresh()
        } catch (e) {
            console.error(e)
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="space-y-4">
            <UsersSearch
                value={search}
                onChange={setSearch}
                filteredCount={filtered.length}
                totalCount={users.length}
            />

            <div
                className="overflow-hidden rounded-2xl"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                {filtered.length === 0 ? (
                    <EmptyState
                        icon={<UserX size={28} />}
                        title="Tidak ada pengguna"
                        description="Coba ubah kata kunci pencarian"
                    />
                ) : (
                    <UsersTable
                        users={filtered}
                        currentUserId={currentUserId}
                        loadingId={loadingId}
                        confirmDeleteId={confirmDeleteId}
                        onRoleChange={handleRoleChange}
                        onAskDelete={setConfirmDeleteId}
                        onCancelDelete={() => setConfirmDeleteId(null)}
                        onConfirmDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    )
}