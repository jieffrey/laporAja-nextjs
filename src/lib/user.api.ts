import api from "./api"

// == TYPES ==

export type UserRole = "user" | "admin" | "superadmin"

export interface User {
    id: number
    name: string
    email: string
    role: UserRole
    points: number
    created_at: string
    updated_at: string
}

// == FETCHING FUNCTIONS ==

// --------------------------------------------------------
// GET ALL USERS
// Dipanggil di: halaman manajemen user (/admin/users)
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { getUsers } from "@/lib/user.api"
//
//   const users = await getUsers()
// --------------------------------------------------------
export async function getUsers(): Promise<User[]> {
    const response = await api.get("/user")
    return response.data.data
}

// --------------------------------------------------------
// GET USER BY ID
// Dipanggil di: halaman detail user (/admin/users/[id])
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { getUserById } from "@/lib/user.api"
//
//   const user = await getUserById(1)
// --------------------------------------------------------
export async function getUserById(id: number): Promise<User> {
    const response = await api.get(`/user/${id}`)
    return response.data.data
}

// --------------------------------------------------------
// UPDATE USER ROLE
// Dipanggil di: dropdown role di tabel user (/admin/users)
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { updateUserRole } from "@/lib/user.api"
//
//   await updateUserRole(1, "admin")
//   await updateUserRole(2, "user")
// --------------------------------------------------------
export async function updateUserRole(id: number, role: UserRole): Promise<User> {
    const response = await api.patch(`/user/${id}`, { role })
    return response.data.data
}

// --------------------------------------------------------
// DELETE USER
// Dipanggil di: tombol hapus user di tabel (/admin/users)
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { deleteUser } from "@/lib/user.api"
//
//   await deleteUser(1)
// --------------------------------------------------------
export async function deleteUser(id: number): Promise<void> {
    await api.delete(`/user/${id}`)
}