import api from "./api"

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

export async function getUsers(): Promise<User[]> {
    const res = await api.get("/user")
    return res.data.data
}

export async function getUserById(id: number): Promise<User> {
    const res = await api.get(`/user/${id}`)
    return res.data.data
}

export async function updateUserRole(id: number, role: UserRole): Promise<User> {
    const res = await api.patch(`/user/${id}`, { role })
    return res.data.data
}

export async function deleteUser(id: number): Promise<void> {
    await api.delete(`/user/${id}`)
}